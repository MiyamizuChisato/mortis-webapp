<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { getLoginSchema } from '#server/schemas/auth.schema.ts'
import { Button } from '~/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { useAppStore } from '~/store/appStore'
import { useUserStore } from '~/store/userStore'

const userStore = useUserStore()
const appStore = useAppStore()
const { t } = useI18n()
const { modalState } = storeToRefs(appStore)

function switchModal(type: 'sign-up' | 'reset-pwd') {
  (modalState.value.props as { type: string }).type = type
}

const formSchema = toTypedSchema(getLoginSchema(t))
const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: '',
  },
})

const handleSignIn = handleSubmit(async (body) => {
  const token = await useHttp().post<string>('/auth/login', body)
  if (token && document) {
    document.cookie = `token=${token}; max-age=99999999; path=/`
    await userStore.loadUser()
    appStore.closeModal()
  }
})
</script>

<template>
  <Teleport to="#modal-title" defer>
    {{ t('modal.login.title') }}
  </Teleport>
  <Teleport to="#modal-description" defer>
    {{ t('modal.login.description') }}
  </Teleport>
  <FieldGroup>
    <VeeField v-slot="{ field, errors }" name="email">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <FieldLabel for="email">
          {{ t('modal.login.email.label') }}
        </FieldLabel>
        <Input
          id="email"
          :placeholder="t('modal.login.email.placeholder')"
          v-bind="field"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <VeeField v-slot="{ field, errors }" name="password">
      <Field v-auto-animate :data-invalid="!!errors.length">
        <div class="flex gap-4 justify-between items-center">
          <FieldLabel for="password">
            {{ t('modal.login.password.label') }}
          </FieldLabel>
          <Button variant="link" class="text-muted-foreground" @click="switchModal('reset-pwd')">
            {{ t('modal.login.password.forget') }}
          </Button>
        </div>
        <Input
          id="password"
          type="password"
          :placeholder="t('modal.login.password.placeholder')"
          v-bind="field"
          :aria-invalid="!!errors.length"
        />
        <FieldError v-if="errors.length" :errors="errors" />
      </Field>
    </VeeField>
    <div class="flex gap-4">
      <Button class="flex-1" @click="handleSignIn">
        {{ t('modal.login.submit') }}
      </Button>
      <Button class="flex-1" variant="outline" @click="switchModal('sign-up')">
        {{ t('modal.login.register') }}
      </Button>
    </div>
  </FieldGroup>
</template>
