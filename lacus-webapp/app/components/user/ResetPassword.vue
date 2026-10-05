<script setup lang="ts">
import type { UserConfig } from '#server/repository/user.repo'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { getResetPasswordSchema } from '#server/schemas/auth.schema.ts'
import { Button } from '~/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { useAppStore } from '~/store/appStore'
import { useUserStore } from '~/store/userStore'

defineOptions({
  inheritAttrs: false,
})
const userStore = useUserStore()
const appStore = useAppStore()
const { modalState } = storeToRefs(appStore)
const { userProfile } = storeToRefs(userStore)
const { t } = useI18n()
const formSchema = toTypedSchema(getResetPasswordSchema(t))
const { values, handleSubmit, validateField, setFieldError, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    code: '',
    password: '',
    surePassword: '',
  },
})
function back() {
  if (userStore.signed) {
    (modalState.value.props as { type: string }).type = 'change'
  }
  else {
    (modalState.value.props as { type: string }).type = 'sign-in'
  }
}
const retrySeconds = ref(0)
async function sendCode() {
  const { valid } = await validateField('email')
  if (!valid) {
    return
  }
  const data = await useHttp().get<UserConfig[]>('/user', { email: values.email })
  if (data.length === 0) {
    setFieldError('email', t('zod.user.emailNotFound'))
    return
  }
  retrySeconds.value = 60
  const intervalId = setInterval(() => {
    retrySeconds.value -= 1
    if (retrySeconds.value <= 0) {
      clearInterval(intervalId)
    }
  }, 1000)
  // 发送验证码
  await useHttp().post('/mail/verify', { email: values.email })
}
const handleResetPassword = handleSubmit(async (body) => {
  await useHttp().post<string>('/auth/reset-password', body)
  if (userStore.signed) {
    appStore.closeModal()
  }
  else {
    (modalState.value.props as { type: string }).type = 'sign-in'
  }
})
onMounted(() => {
  if (userProfile.value?.email) {
    setFieldValue('email', userProfile.value.email)
  }
})
</script>

<template>
  <Teleport to="#modal-title" defer>
    {{ t('modal.resetPassword.title') }}
  </Teleport>
  <Teleport to="#modal-description" defer>
    {{ t('modal.resetPassword.description') }}
  </Teleport>
  <FieldGroup>
    <VeeField v-slot="{ field, errors }" name="email">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <FieldLabel for="email">
          {{ t('modal.resetPassword.email.label') }}
        </FieldLabel>
        <div class="flex gap-4">
          <Input
            id="email"
            v-bind="field"
            :aria-invalid="!!errors.length"
            :disabled="userProfile?.email"
          />
          <Button :disabled="retrySeconds > 0" class="min-w-36" variant="outline" @click="sendCode">
            {{ retrySeconds > 0 ? t('modal.resetPassword.email.reSend', { seconds: retrySeconds }) : t('modal.resetPassword.email.send') }}
          </Button>
        </div>
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ field, errors }" name="code">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <FieldLabel for="code">
          {{ t('modal.resetPassword.code.label') }}
        </FieldLabel>
        <Input
          id="code"
          :placeholder="t('modal.resetPassword.code.placeholder')"
          v-bind="field"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ field, errors }" name="password">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <FieldLabel for="password">
          {{ t('modal.resetPassword.password.label') }}
        </FieldLabel>
        <Input
          id="password"
          type="password"
          :placeholder="t('modal.resetPassword.password.placeholder')"
          v-bind="field"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ field, errors }" name="surePassword">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <FieldLabel for="surePassword">
          {{ t('modal.resetPassword.pwd.label') }}
        </FieldLabel>
        <Input
          id="surePassword"
          type="password"
          :placeholder="t('modal.resetPassword.pwd.placeholder')"
          v-bind="field"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <div class="flex gap-4">
      <Button class="flex-1" @click="handleResetPassword">
        {{ t('modal.resetPassword.submit') }}
      </Button>
      <Button class="flex-1" variant="outline" @click="back">
        {{ t('modal.resetPassword.back') }}
      </Button>
    </div>
  </FieldGroup>
</template>
