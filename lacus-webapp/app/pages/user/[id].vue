<script setup lang="ts">
import type { UserConfig } from '#server/repository/user.repo'
import FadeInUp from '~/components/motion/FadeInUp.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import UserInfo from '~/components/user/UserInfo.vue'
import UserProfile from '~/components/user/UserProfile.vue'
import UserSecurity from '~/components/user/UserSecurity.vue'
import { useUserStore } from '~/store/userStore'

const { t } = useI18n()
const userStore = useUserStore()
const { userProfile } = storeToRefs(userStore)
const { params } = useRoute()
const userId = computed(() => (params as { id: number }).id)
const isCurrent = computed(() => String(userProfile.value?.id) === String(userId.value))
const editing = ref(false)
const tabs = ref<'profile' | 'security'>('profile')
const { data, error } = await useAsyncData(`user-${userId.value}`, async () => {
  const result = await clientDelayFn(async () => {
    return await useHttp().get <UserConfig> (`/user/${userId.value}`)
  }, 500)
  if (result) {
    return result
  }
  else {
    throw showError({ message: 'not found' })
  }
}, { lazy: true })
if (error.value) {
  showError({ fatal: true, message: 'not found' })
}
const user = computed(() => {
  if (userProfile.value?.id === data.value?.id) {
    return userProfile.value
  }
  return data.value
})
</script>

<template>
  <div :key="userId" class="mx-auto px-4 md:w-2xl">
    <UserInfo :user="user" :type="tabs" />
    <Tabs v-model="tabs" @update:model-value="editing = false">
      <TabsList class="group-data-horizontal/tabs:h-10 w-full mt-8 mb-2">
        <TabsTrigger value="profile">
          {{ t("user.profile.label") }}
        </TabsTrigger>
        <TabsTrigger :disabled="!isCurrent" value="security">
          {{ t("user.security.label") }}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <FadeInUp>
          <UserProfile :user="user" :editable="isCurrent" />
        </FadeInUp>
      </TabsContent>
      <TabsContent value="security">
        <FadeInUp>
          <UserSecurity />
        </FadeInUp>
      </TabsContent>
    </Tabs>
  </div>
</template>
