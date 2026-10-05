<script setup lang="ts">
import { Button } from '~/components/ui/button'
import { useAppStore } from '~/store/appStore.ts'
import { useUserStore } from '~/store/userStore.ts'

const userStore = useUserStore()
const appStore = useAppStore()
const { t } = useI18n()
</script>

<template>
  <Teleport to="#modal-title" defer>
    {{ t('modal.logout.title') }}
  </Teleport>
  <Teleport to="#modal-description" defer>
    {{ t('modal.logout.description') }}
  </Teleport>
  <div class="flex gap-4">
    <Button class="flex-1" variant="destructive" @click="userStore.signOut();appStore.closeModal()">
      {{ t('modal.logout.yes') }}
    </Button>
    <Button class="flex-1" variant="outline" @click="appStore.closeModal">
      {{ t('modal.logout.no') }}
    </Button>
  </div>
</template>
