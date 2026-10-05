<script setup lang="ts">
import ResetPassword from '~/components/user/ResetPassword.vue'
import SignIn from '~/components/user/SignIn.vue'
import SignOauth from '~/components/user/SignOauth.vue'
import SignUp from '~/components/user/SignUp.vue'

defineProps<{
  type: 'sign-in' | 'sign-up' | 'reset-pwd'
}>()
</script>

<template>
  <div v-auto-animate>
    <SignIn v-if="type === 'sign-in'" />
    <SignUp v-else-if="type === 'sign-up'" />
    <ResetPassword v-else />
    <SignOauth />
  </div>
</template>
