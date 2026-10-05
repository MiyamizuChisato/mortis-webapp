<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { getClientSetPasswordSchema } from '#server/schemas/auth.schema.ts'
import { Field, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { useAppStore } from '~/store/appStore'

const props = defineProps<{
  id: number
}>()
const { t } = useI18n()
const appStore = useAppStore()
const { modalState } = storeToRefs(appStore)
const formSchema = toTypedSchema(getClientSetPasswordSchema(t))
const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    oldPassword: '',
    newPassword: '',
    surePassword: '',
  },
})

const handleSetPassword = handleSubmit(async (body) => {
  await useHttp().post<string>('/auth/set-password', { ...body, id: props.id })
  appStore.closeModal()
})
function toResetPassword() {
  (modalState.value.props as { type: string }).type = 'reset'
}
</script>

<template>
  <Teleport to="#modal-title" defer>
    {{ t('modal.setPassword.title') }}
  </Teleport>
  <Teleport to="#modal-description" defer>
    {{ t('modal.setPassword.description') }}
  </Teleport>
  <FieldGroup>
    <VeeField v-slot="{ field, errors }" name="oldPassword">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <FieldLabel for="oldPassword">
          {{ t('modal.setPassword.oldPassword.label') }}
        </FieldLabel>
        <Input
          id="oldPassword"
          type="password"
          :placeholder="t('modal.setPassword.oldPassword.placeholder')"
          v-bind="field"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ field, errors }" name="newPassword">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <FieldLabel for="password">
          {{ t('modal.setPassword.password.label') }}
        </FieldLabel>
        <Input
          id="password"
          type="password"
          :placeholder="t('modal.setPassword.password.placeholder')"
          v-bind="field"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ field, errors }" name="surePassword">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <FieldLabel for="surePassword">
          {{ t('modal.setPassword.pwd.label') }}
        </FieldLabel>
        <Input
          id="surePassword"
          type="password"
          :placeholder="t('modal.setPassword.pwd.placeholder')"
          v-bind="field"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <div class="flex gap-4">
      <Button class="flex-1" @click="handleSetPassword">
        {{ t('modal.setPassword.submit') }}
      </Button>
      <Button class="flex-1" variant="destructive" @click="toResetPassword">
        {{ t('modal.setPassword.forgot') }}
      </Button>
    </div>
  </FieldGroup>
</template>
