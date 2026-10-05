<script setup lang="ts">
import Header from '~/components/layout/Header.vue'
</script>

<template>
  <Body>
    <Header class="border-none" />
    <main class="max-h-[calc(100vh-64px)]">
      <slot />
    </main>
  </Body>
</template>
