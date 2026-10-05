<script setup lang="ts">
import type { Instant, InstantList } from '#server/service/instant.service.ts'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { getInstantSchema } from '#server/schemas/instant.schema.ts'
import InstantDetail from '~/components/instant/InstantDetail.vue'
import InstantDetailSkeleton from '~/components/instant/InstantDetailSkeleton.vue'
import SubInstantDetail from '~/components/instant/SubInstantDetail.vue'
import SubInstantDetailSkeleton from '~/components/instant/SubInstantDetailSkeleton.vue'
import { Button } from '~/components/ui/button'
import IconButton from '~/components/ui/button/IconButton.vue'
import { Field, FieldError, FieldGroup } from '~/components/ui/field'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination'
import { Textarea } from '~/components/ui/textarea'
import { useUserStore } from '~/store/userStore.ts'

const { id } = defineProps<{
  id: number
}>()
const refer = ref<string>()
const { signed, userProfile } = storeToRefs(useUserStore())
const showCancel = ref(false)
const pager = ref({
  page: 1,
  size: 5,
})
const { t } = useI18n()
const formSchema = toTypedSchema(getInstantSchema(t))
const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    content: '',
    authorId: userProfile.value?.id,
    confidential: false,
    referId: undefined,
    rootId: id,
    replyId: undefined,
  },
})
const userStore = useUserStore()
const { userInstantThumbList } = storeToRefs(userStore)
if (userStore.signed && !userInstantThumbList.value) {
  useAsyncData('instant-thumb', async () => await userStore.loadUserInstantThumbList())
}
const { data, pending: instantPending } = useAsyncData(`instant-${id}`, async () => {
  const data = await delayFn(async () => await useHttp().get<Instant>(`/instant/${id}`), 500)
  refer.value = data?.author.nickname
  return data
})
const { data: subInstantList, pending: subInstantPending } = useAsyncData(`subInstant-${id}`, async () => {
  return await delayFn(async () => await useHttp().get<InstantList>('/instant/', {
    page: pager.value.page,
    size: pager.value.size,
    rootId: id,
  }), 500)
}, { watch: [() => pager.value.page], deep: true })
const handleSubmitInstant = handleSubmit(async (values) => {
  const data = await useHttp().post<Instant>('/instant', values)
  if (data) {
    subInstantList.value?.records.unshift(data)
    resetForm()
  }
})
function handleReply({ nickname, refId, replyId }: { nickname: string, refId: number, replyId: number }) {
  setFieldValue('referId', refId)
  setFieldValue('replyId', replyId)
  refer.value = nickname
  showCancel.value = true
}
function cancelReply() {
  refer.value = data.value?.author.nickname
  showCancel.value = false
}
function handleThumb(thumbs: number) {
  if (data.value) {
    data.value.thumbs = thumbs
  }
}
function handleSubThumb(instantId: number, thumbs: number) {
  const target = subInstantList.value?.records.find(item => item.id === instantId)
  if (target) {
    target.thumbs = thumbs
  }
}
</script>

<template>
  <Teleport to="#modal-title" defer>
    {{ t('modal.instantDetail.title') }}
  </Teleport>
  <Teleport to="#modal-description" defer>
    {{ t('modal.instantDetail.description') }}
  </Teleport>
  <Teleport to="#modal-footer" defer>
    <FieldGroup>
      <VeeField v-slot="{ field, errors }" name="content">
        <Field v-auto-animate :data-invalid="!!errors.length">
          <Textarea id="content" :placeholder="t('modal.instantDetail.content.placeholder')" :aria-invalid="!!errors.length" v-bind="field" class="resize-none h-20" />
          <FieldError v-if="errors.length" :errors="errors" />
        </Field>
      </VeeField>
    </FieldGroup>
    <div class="flex justify-between items-center mt-4">
      <div v-if="!signed">
        {{ t('modal.instantDetail.tips') }}
      </div>
      <div v-else class="flex items-center gap-2 text-muted-foreground">
        <div>
          @{{ refer }}
        </div>
        <IconButton v-if="showCancel" icon="icon-[solar--close-circle-line-duotone]" :tips="t('modal.instantDetail.cancel')" @click="cancelReply" />
      </div>
      <Button :disabled="!signed" @click="handleSubmitInstant">
        {{ t('modal.instantDetail.submit') }}
      </Button>
    </div>
  </Teleport>
  <template v-if="instantPending">
    <InstantDetailSkeleton />
  </template>
  <template v-else>
    <InstantDetail :instant="data" @thumb="handleThumb" />
  </template>
  <template v-if="subInstantPending">
    <SubInstantDetailSkeleton v-for="i in 3" :key="i" class="py-2 border-t border-dashed" />
  </template>
  <template v-else>
    <SubInstantDetail
      v-for="item in subInstantList?.records"
      :key="item.id"
      :instant="item" class="p-4 -mx-4 border-t border-dashed"
      @reply="handleReply"
      @thumb="handleSubThumb"
    />
  </template>
  <div class="flex flex-col gap-6">
    <Pagination v-slot="{ page }" v-model:page="pager.page" :items-per-page="pager.size" :total="subInstantList?.total || 0" :default-page="1">
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious>
          {{ t('modal.instantDetail.pre') }}
        </PaginationPrevious>
        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === page"
          >
            {{ item.value }}
          </PaginationItem>
        </template>
        <PaginationEllipsis :index="5" />
        <PaginationNext>
          {{ t('modal.instantDetail.next') }}
        </PaginationNext>
      </PaginationContent>
    </Pagination>
  </div>
</template>
