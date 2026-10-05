<script setup lang="ts">
import type { Instant } from '#server/service/instant.service.ts'
import dayjs from 'dayjs'
import { toast } from 'vue-sonner'
import { useUserStore } from '~/store/userStore.ts'

const { instant } = defineProps<{
  instant: Instant
}>()
const emits = defineEmits(['reply', 'thumb'])
const { thumbInstant } = useUserStore()
const { t } = useI18n()
const { userInstantThumbList, signed } = storeToRefs(useUserStore())
function handleReply() {
  emits('reply', {
    nickname: instant?.author.nickname,
    replyId: instant?.id,
    refId: instant?.author.id,
  })
}
const loading = ref(false)
async function handleInstantThumb() {
  if (!signed.value) {
    toast.error('User has not login')
    return
  }
  if (!instant) {
    return
  }
  loading.value = true
  if (userInstantThumbList.value?.has(instant.id)) {
    userInstantThumbList.value?.delete(instant.id)
    emits('thumb', instant.id, instant.thumbs - 1)
  }
  else {
    userInstantThumbList.value?.add(instant.id)
    emits('thumb', instant.id, instant.thumbs + 1)
  }
  await thumbInstant(instant.id)
  loading.value = false
}
</script>

<template>
  <div class="flex gap-2 items-start">
    <div>
      <Avatar size="sm">
        <AvatarImage :src="instant?.author.avatar || ''" />
      </Avatar>
    </div>
    <div class="space-x-1 flex-1">
      <span class="text-muted-foreground">
        {{ instant?.author.nickname }}
      </span>
      <template v-if="instant?.refer">
        <span>{{ t("modal.instantDetail.reply") }}</span><span class="text-primary">@{{ instant.refer.nickname }}</span>
      </template>
      <span>: {{ instant?.content }}</span>
      <div class="flex justify-between mt-2 text-muted-foreground">
        <div class="flex items-center gap-4">
          <div>{{ dayjs(instant?.createTime).format("YYYY-MM-DD hh:mm") }}</div>
          <div class="cursor-pointer hover:text-accent-foreground" @click="handleReply">
            {{ t("modal.instantDetail.reply") }}
          </div>
        </div>
        <div class="flex items-center gap-2">
          <Button :disabled="loading" variant="ghost" size="icon" @click="handleInstantThumb">
            <Icon
              v-if="userInstantThumbList?.has(instant?.id || 0)"
              class="text-destructive cursor-pointer"
              name="icon-[solar--like-bold]"
            />
            <Icon
              v-else
              class="hover:text-accent-foreground cursor-pointer"
              name="icon-[solar--like-linear]"
            />
          </Button>
          <span>{{ instant?.thumbs }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
