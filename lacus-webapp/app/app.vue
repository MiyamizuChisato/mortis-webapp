<script setup lang="ts">
import GlobalModal from '~/components/global/GlobalModal.vue'
import GlobalToast from '~/components/global/GlobalToast.vue'
</script>

<template>
  <Html>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <GlobalToast />
    <GlobalModal />
  </Html>
</template>

<style>
html.dark {
  color-scheme: dark;
}
</style>
