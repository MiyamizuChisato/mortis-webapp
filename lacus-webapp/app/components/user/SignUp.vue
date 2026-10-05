<script setup lang="ts">
import type { UserConfig } from '#server/repository/user.repo'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { getRegisterSchema } from '#server/schemas/auth.schema.ts'
import { Button } from '~/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { useAppStore } from '~/store/appStore'
import { useUserStore } from '~/store/userStore'

const userStore = useUserStore()
const appStore = useAppStore()
const { modalState } = storeToRefs(appStore)
const { t } = useI18n()
const formSchema = toTypedSchema(getRegisterSchema(t))
const { values, handleSubmit, validateField, setFieldError } = useForm({
  validationSchema: formSchema,
  initialValues: {
    nickname: '',
    email: '',
    code: '',
    password: '',
    surePassword: '',
  },
})
function switchModal() {
  (modalState.value.props as { type: string }).type = 'sign-in'
}
const retrySeconds = ref(0)
async function sendCode() {
  const { valid } = await validateField('email')
  if (!valid) {
    return
  }
  const data = await useHttp().get<UserConfig[]>('/user', { email: values.email })
  if (data.length > 0) {
    setFieldError('email', t('zod.user.emailUsed'))
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
const handleSignUp = handleSubmit(async (body) => {
  const token = await useHttp().post<string>('/auth/register', body)
  if (token && document) {
    document.cookie = `token=${token}; max-age=99999999; path=/`
    appStore.closeModal()
    await userStore.loadUser()
  }
})
</script>

<template>
  <Teleport to="#modal-title" defer>
    {{ t('modal.register.title') }}
  </Teleport>
  <Teleport to="#modal-description" defer>
    {{ t('modal.register.description') }}
  </Teleport>
  <FieldGroup>
    <VeeField v-slot="{ field, errors }" name="nickname">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <FieldLabel for="nickname">
          {{ t('modal.register.nickname.label') }}
        </FieldLabel>
        <Input
          id="nickname"
          :placeholder="t('modal.register.nickname.placeholder')"
          v-bind="field"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ field, errors }" name="email">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <FieldLabel for="email">
          {{ t('modal.register.email.label') }}
        </FieldLabel>
        <div class="flex gap-4">
          <Input
            id="email"
            :placeholder="t('modal.register.email.placeholder')"
            v-bind="field"
            :aria-invalid="!!errors.length"
          />
          <Button :disabled="retrySeconds > 0" class="min-w-36" variant="outline" @click="sendCode">
            {{ retrySeconds > 0 ? t('modal.register.email.reSend', { seconds: retrySeconds }) : t('modal.register.email.send') }}
          </Button>
        </div>
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ field, errors }" name="code">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <FieldLabel for="code">
          {{ t('modal.register.code.label') }}
        </FieldLabel>
        <Input
          id="code"
          :placeholder="t('modal.register.code.placeholder')"
          v-bind="field"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ field, errors }" name="password">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <FieldLabel for="password">
          {{ t('modal.register.password.label') }}
        </FieldLabel>
        <Input
          id="password"
          type="password"
          :placeholder="t('modal.register.password.placeholder')"
          v-bind="field"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ field, errors }" name="surePassword">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <FieldLabel for="surePassword">
          {{ t('modal.register.pwd.label') }}
        </FieldLabel>
        <Input
          id="surePassword"
          type="password"
          :placeholder="t('modal.register.pwd.placeholder')"
          v-bind="field"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <div class="flex gap-4">
      <Button class="flex-1" @click="handleSignUp">
        {{ t('modal.register.submit') }}
      </Button>
      <Button class="flex-1" variant="outline" @click="switchModal">
        {{ t('modal.register.login') }}
      </Button>
    </div>
  </FieldGroup>
</template>
