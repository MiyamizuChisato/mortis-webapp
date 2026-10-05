<script setup lang="ts">
import { Button } from '~/components/ui/button'
import { useAppStore } from '~/store/appStore.ts'
import { useUserStore } from '~/store/userStore.ts'

const { id, source } = defineProps<{
  id: number
  source: string
}>()
const appStore = useAppStore()
const userStore = useUserStore()
const { t } = useI18n()
async function handleUnbindSocial() {
  await useHttp().post('/auth/unbind-social', { id, source })
  await userStore.loadUserSocial()
  appStore.closeModal()
}
</script>

<template>
  <Teleport to="#modal-title" defer>
    {{ t('modal.unbindSocial.title') }}
  </Teleport>
  <Teleport to="#modal-description" defer>
    {{ t('modal.unbindSocial.description', { source }) }}
  </Teleport>
  <div class="flex gap-4">
    <Button class="flex-1" variant="destructive" @click="handleUnbindSocial">
      {{ t('modal.unbindSocial.yes') }}
    </Button>
    <Button class="flex-1" variant="outline" @click="appStore.closeModal">
      {{ t('modal.unbindSocial.no') }}
    </Button>
  </div>
</template>
