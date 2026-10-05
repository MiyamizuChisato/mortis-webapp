<script setup lang="ts">
import type { UserConfig } from '#server/repository/user.repo.ts'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { getResetPasswordSchema } from '#server/schemas/auth.schema.ts'
import { Button } from '~/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { useAppStore } from '~/store/appStore.ts'
import { useUserStore } from '~/store/userStore.ts'

const props = defineProps<{
  id: number
}>()
const userStore = useUserStore()
const appStore = useAppStore()
const { t } = useI18n()
const formSchema = toTypedSchema(getResetPasswordSchema(t))
const { values, handleSubmit, validateField, setFieldError } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    code: '',
    password: '',
    surePassword: '',
  },
})
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

const handleBind = handleSubmit(async (body) => {
  await useHttp().post<string>('/auth/bind-email', { ...body, id: props.id })
  userStore.$patch({
    userProfile: {
      email: body.email,
    },
  })
  appStore.closeModal()
})
</script>

<template>
  <Teleport to="#modal-title" defer>
    {{ t("modal.bindEmail.title") }}
  </Teleport>
  <Teleport to="#modal-description" defer>
    {{ t("modal.bindEmail.description") }}
  </Teleport>
  <FieldGroup>
    <VeeField v-slot="{ field, errors }" name="email">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <FieldLabel for="email">
          {{ t("modal.bindEmail.email.label") }}
        </FieldLabel>
        <div class="flex gap-4">
          <Input
            id="email"
            :placeholder="t('modal.bindEmail.email.placeholder')"
            v-bind="field"
            :aria-invalid="!!errors.length"
          />
          <Button :disabled="retrySeconds > 0" class="min-w-36" variant="outline" @click="sendCode">
            {{ retrySeconds > 0 ? t("modal.bindEmail.email.reSend", { seconds: retrySeconds }) : t("modal.bindEmail.email.send") }}
          </Button>
        </div>
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ field, errors }" name="code">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <FieldLabel for="code">
          {{ t("modal.bindEmail.code.label") }}
        </FieldLabel>
        <Input
          id="code"
          :placeholder="t('modal.bindEmail.code.placeholder')"
          v-bind="field"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ field, errors }" name="password">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <FieldLabel for="password">
          {{ t("modal.bindEmail.password.label") }}
        </FieldLabel>
        <Input
          id="password"
          type="password"
          :placeholder="t('modal.bindEmail.password.placeholder')"
          v-bind="field"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ field, errors }" name="surePassword">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <FieldLabel for="surePassword">
          {{ t("modal.bindEmail.pwd.label") }}
        </FieldLabel>
        <Input
          id="surePassword"
          type="password"
          :placeholder="t('modal.bindEmail.pwd.placeholder')"
          v-bind="field"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <Button class="w-full" @click="handleBind">
      {{ t("modal.bindEmail.submit") }}
    </Button>
  </FieldGroup>
</template>
