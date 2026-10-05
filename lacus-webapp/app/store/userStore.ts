import type { UserConfig } from '#server/repository/user.repo'

export const useUserStore = defineStore('user', () => {
  const userProfile = ref<UserConfig>()
  const userSocialList = ref<string[]>()
  const userRoleList = ref<string[]>()
  const userProfileCopied = ref<UserConfig>()
  const userInstantThumbList = ref<Set<number>>()
  const signed = computed(() => userProfile.value !== undefined)
  async function loadUser() {
    userProfile.value = await useHttp().get<UserConfig>('/user/me')
  }
  async function loadUserSocial() {
    userSocialList.value = await useHttp().get<string[]>('/auth/social')
  }
  async function loadUserRole() {
    userRoleList.value = await useHttp().get<string[]>('/user/role')
  }

  async function thumbInstant(instantId: number) {
    return await useHttp().post<boolean>('/instant/thumb', {
      instantId,
      userId: userProfile.value?.id,
    })
  }
  async function loadUserInstantThumbList() {
    userInstantThumbList.value = new Set<number>(await useHttp().get<number[]>('/instant/thumb'))
    return userInstantThumbList.value
  }
  function signOut() {
    userProfile.value = undefined
    userSocialList.value = undefined
    userProfileCopied.value = undefined
    userInstantThumbList.value = undefined
    useCookie('token').value = null
  }
  return {
    signed,
    signOut,
    loadUser,
    userProfile,
    userSocialList,
    userProfileCopied,
    userInstantThumbList,
    loadUserInstantThumbList,
    loadUserSocial,
    thumbInstant,
    userRoleList,
    loadUserRole,
  }
})
