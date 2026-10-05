<script setup lang="ts">
import { Button } from '~/components/ui/button'
import { useAppStore } from '~/store/appStore'
import { useUserStore } from '~/store/userStore'

const userStore = useUserStore()
const { t } = useI18n()
const appStore = useAppStore()
const localPath = useLocalePath()
let newWindow: WindowProxy | null
function handleOauth(source: string) {
  const path = localPath({
    name: 'oauth-source',
    params: {
      source: source.toLowerCase(),
    },
  })
  newWindow = window.open(path, '_blank')
}

async function handleMessage(event: MessageEvent) {
  if (event.origin !== window.location.origin) {
    return
  }
  if (event.data?.type === 'oauth-success') {
    await userStore.loadUser()
    appStore.closeModal()
    window.removeEventListener(
      'message',
      handleMessage,
    )
    newWindow?.close()
  }
}
onMounted(() => {
  window.addEventListener(
    'message',
    handleMessage,
  )
})
onBeforeUnmount(() => {
  window.removeEventListener(
    'message',
    handleMessage,
  )
})
</script>

<template>
  <div class="p-4 space-y-4">
    <div class="flex items-center gap-10">
      <div class="flex-1 border-dashed border-y" />
      <div>
        {{ t("modal.oauth.title") }}
      </div>
      <div class="flex-1 border-dashed border-y" />
    </div>
    <div class="flex justify-center">
      <Button class="rounded-full size-16" variant="ghost" @click="handleOauth('qq')">
        <NuxtImg src="https://static.mortis.uno/social/QQ.png" />
      </Button>
      <Button class="rounded-full size-16" variant="ghost" @click="handleOauth('github')">
        <NuxtImg src="https://static.mortis.uno/social/github.png" />
      </Button>
      <Button class="rounded-full size-16" variant="ghost" @click="handleOauth('gitee')">
        <NuxtImg src="https://static.mortis.uno/social/gitee.png" />
      </Button>
    </div>
  </div>
</template>
