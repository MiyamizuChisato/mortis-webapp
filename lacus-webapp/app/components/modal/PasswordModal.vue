<script setup lang="ts">
import ResetPassword from '~/components/user/ResetPassword.vue'
import SetPassword from '~/components/user/SetPassword.vue'

defineProps<{
  id: number
  type: 'change' | 'reset'
}>()
</script>

<template>
  <div v-auto-animate>
    <SetPassword v-if="type === 'change'" :id="id" />
    <ResetPassword v-else />
  </div>
</template>
