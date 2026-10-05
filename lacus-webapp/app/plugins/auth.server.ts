import { useUserStore } from '~/store/userStore'

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore()
  const token = useCookie('token').value
  if (token) {
    await userStore.loadUser()
    await userStore.loadUserRole()
  }
})
