<script setup lang="ts">
import LogoutModal from '~/components/modal/LogoutModal.vue'
import SignModal from '~/components/modal/SignModal.vue'
import { Avatar, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import IconButton from '~/components/ui/button/IconButton.vue'
import { Icon } from '~/components/ui/icon'
import { useAppStore } from '~/store/appStore'
import { useUserStore } from '~/store/userStore'

const userStore = useUserStore()
const { t } = useI18n()
const appstore = useAppStore()
const { userProfile } = storeToRefs(userStore)
const localePath = useLocalePath()
function handleLogin() {
  appstore.openModal(SignModal, { type: 'sign-in' })
}
function handleRegister() {
  appstore.openModal(SignModal, { type: 'sign-up' })
}
</script>

<template>
  <div class="px-3 py-4 rounded border-dashed border space-y-4">
    <h2 class="flex items-center gap-2">
      <Icon name="icon-[solar--user-bold]" />
      <span>
        {{ t('panel.account.label') }}
      </span>
    </h2>
    <div v-if="userStore.signed" class="flex items-center gap-4">
      <Avatar class="size-16">
        <AvatarImage :src="userProfile?.avatar || ''" alt="avatar" />
      </Avatar>
      <div class="flex-1 space-y-1">
        <div class="text-lg font-bold">
          {{ userProfile?.nickname }}
        </div>
        <p class="text-muted-foreground line-clamp-1">
          {{ userProfile?.motto || t('user.unsetMotto') }}
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <NuxtLink
          :to="localePath({
            name: 'user-id',
            params: {
              id: userProfile?.id || 0,
            },
          })"
          @click="appstore.closePanel"
        >
          <IconButton variant="outline" icon="icon-[solar--pen-new-square-linear]" :tips="t('panel.account.edit')" />
        </NuxtLink>
        <IconButton variant="destructive" icon="icon-[solar--exit-linear]" :tips="t('panel.account.logout')" @click="appstore.openModal(LogoutModal)" />
      </div>
    </div>
    <div v-else class="flex flex-col gap-4 items-center justify-center">
      <Button class="size-12" variant="secondary" disabled>
        <Icon class="size-8" name="icon-[solar--close-circle-bold]" />
      </Button>
      <h2 class="text-lg font-bold">
        {{ t('panel.account.offline.title') }}
      </h2>
      <div class="text-muted-foreground">
        <p class="text-center">
          {{ t('panel.account.offline.description') }}
        </p>
      </div>
      <div class="space-x-2">
        <Button size="lg" @click="handleLogin">
          {{ t('panel.account.offline.login') }}
        </Button>
        <Button variant="outline" size="lg" @click="handleRegister">
          {{ t('panel.account.offline.register') }}
        </Button>
      </div>
    </div>
  </div>
</template>
