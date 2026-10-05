<script setup lang="ts">
import type { Instant } from '#server/service/instant.service.ts'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { getInstantSchema } from '#server/schemas/instant.schema.ts'
import { Button } from '~/components/ui/button'
import { Field, FieldError, FieldLabel } from '~/components/ui/field'
import { Switch } from '~/components/ui/switch'
import { Textarea } from '~/components/ui/textarea'
import emitter from '~/composables/mitt.ts'
import { useAppStore } from '~/store/appStore.ts'
import { useUserStore } from '~/store/userStore.ts'

const userStore = useUserStore()
const appStore = useAppStore()
const { userProfile } = storeToRefs(userStore)
const { t } = useI18n()
const formSchema = toTypedSchema(getInstantSchema(t))
const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    content: '',
    authorId: userProfile.value?.id,
    confidential: false,
  },
})
const handleSubmitInstant = handleSubmit(async (values) => {
  const data = await useHttp().post<Instant>('/instant', values)
  emitter.emit('SaveInstant', data)
  appStore.closeModal()
})
</script>

<template>
  <Teleport to="#modal-title" defer>
    {{ t('modal.instantAdd.title') }}
  </Teleport>
  <Teleport to="#modal-description" defer>
    {{ t('modal.instantAdd.description') }}
  </Teleport>
  <FieldGroup>
    <VeeField v-slot="{ field, errors }" name="content">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <Textarea id="content" :placeholder="t('modal.instantAdd.content.placeholder')" :aria-invalid="!!errors.length" v-bind="field" class="resize-none h-40" />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ field, errors }" name="confidential">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <div class="flex items-center justify-between gap-4">
          <div class="flex gap-4">
            <FieldLabel for="confidential">
              {{ t('modal.instantAdd.tips') }}
            </FieldLabel>
            <Switch id="confidential" disabled :aria-invalid="!!errors.length" v-bind="field" />
          </div>
          <Button @click="handleSubmitInstant">
            {{ t('modal.instantAdd.submit') }}
          </Button>
        </div>
      </Field>
    </VeeField>
  </FieldGroup>
</template>
