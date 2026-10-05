<script setup lang="ts">
import BindEmailModal from '~/components/modal/BindEmailModal.vue'
import PasswordModal from '~/components/modal/PasswordModal.vue'
import UnbindSocialModal from '~/components/modal/UnbindSocialModal.vue'
import { useAppStore } from '~/store/appStore.ts'
import { useUserStore } from '~/store/userStore'

const { t } = useI18n()
const editing = ref(false)
const userStore = useUserStore()
const appStore = useAppStore()
const { userProfile, userSocialList } = storeToRefs(userStore)

function handleBindEmail() {
  if (userProfile.value) {
    appStore.openModal(BindEmailModal, {
      id: userProfile.value.id,
    })
  }
}

function handleChangePasswd() {
  if (userProfile.value) {
    appStore.openModal(PasswordModal, {
      type: 'change',
      id: userProfile.value.id,
    })
  }
}

let newWindow: WindowProxy | null
const localPath = useLocalePath()
function handleBindSocial(source: string) {
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
    await userStore.loadUserSocial()
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

function handleUnBindSocial(source: string) {
  if (userProfile.value) {
    appStore.openModal(UnbindSocialModal, {
      id: userProfile.value.id,
      source,
    })
  }
}

onBeforeMount(async () => {
  if (!userSocialList.value) {
    await Promise.all([
      await userStore.loadUserSocial(),
      new Promise(resolve => setTimeout(resolve, 500)),
    ])
  }
})
</script>

<template>
  <div v-auto-animate class="space-y-4">
    <template v-if="editing">
      <div class="bg-card rounded-xl divide-y divide-dashed">
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--letter-bold-duotone]" />
            <span>
              {{ t("user.security.email") }}
            </span>
          </div>
          <span v-if="userProfile?.email">
            {{ userProfile.email }}
          </span>
          <Button v-else variant="secondary" @click="handleBindEmail">
            {{ t("user.security.bind") }}
          </Button>
        </div>
        <div v-if="userProfile?.email" class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--lock-password-bold-duotone]" />
            <span>
              {{ t("user.security.password") }}
            </span>
          </div>
          <Button variant="secondary" @click="handleChangePasswd">
            {{ t("user.security.update") }}
          </Button>
        </div>
      </div>
      <div class="bg-card rounded-xl divide-y divide-dashed">
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[simple-icons--github]" />
            <span>
              Github
            </span>
          </div>
          <Button v-if="userSocialList?.includes('GITHUB')" variant="destructive" @click="handleUnBindSocial('GITHUB')">
            {{ t("user.security.unbind") }}
          </Button>
          <Button v-else variant="secondary" @click="handleBindSocial('GITHUB')">
            {{ t("user.security.bind") }}
          </Button>
        </div>
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[simple-icons--gitee]" />
            <span>
              Gitee
            </span>
          </div>
          <Button v-if="userSocialList?.includes('GITEE')" variant="destructive" @click="handleUnBindSocial('GITEE')">
            {{ t("user.security.unbind") }}
          </Button>
          <Button v-else variant="secondary" @click="handleBindSocial('GITEE')">
            {{ t("user.security.bind") }}
          </Button>
        </div>
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[simple-icons--qq]" />
            <span>
              QQ
            </span>
          </div>
          <Button v-if="userSocialList?.includes('QQ')" variant="destructive" @click="handleUnBindSocial('QQ')">
            {{ t("user.security.unbind") }}
          </Button>
          <Button v-else variant="secondary" @click="handleBindSocial('QQ')">
            {{ t("user.security.bind") }}
          </Button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="bg-card rounded-xl divide-y divide-dashed">
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[solar--letter-bold-duotone]" />
            <span>
              {{ t("user.security.email") }}
            </span>
          </div>
          <span>
            {{ userProfile?.email || t("user.unbound") }}
          </span>
        </div>
      </div>
      <div class="bg-card rounded-xl divide-y divide-dashed">
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[simple-icons--github]" />
            <span>
              Github
            </span>
          </div>
          <span v-if="userSocialList">
            {{ userSocialList.includes('GITHUB') ? t("user.bound") : t("user.unbound") }}
          </span>
          <Skeleton v-else class="w-16 h-5" />
        </div>
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[simple-icons--gitee]" />
            <span>
              Gitee
            </span>
          </div>
          <span v-if="userSocialList">
            {{ userSocialList.includes('GITEE') ? t("user.bound") : t("user.unbound") }}
          </span>
          <Skeleton v-else class="w-16 h-5" />
        </div>
        <div class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="icon-[simple-icons--qq]" />
            <span>
              QQ
            </span>
          </div>
          <span v-if="userSocialList">
            {{ userSocialList.includes('QQ') ? t("user.bound") : t("user.unbound") }}
          </span>
          <Skeleton v-else class="w-16 h-5" />
        </div>
      </div>
    </template>
  </div>
  <ClientOnly>
    <Teleport to="#user-info-option" defer>
      <Button v-if="editing" variant="outline" @click="editing = !editing">
        {{ t("user.save") }}
      </Button>
      <Button v-else variant="outline" @click="editing = !editing">
        {{ t("user.setting") }}
      </Button>
    </Teleport>
  </ClientOnly>
</template>
