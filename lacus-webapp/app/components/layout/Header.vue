<script setup lang="ts">
import Logo from '~/components/layout/Logo.vue'
import Settings from '~/components/layout/Settings.vue'
import NavMenu from './NavMenu.vue'
</script>

<template>
  <header class="fixed w-dvw z-10 top-0 border-dashed border-b bg-background/75 backdrop-blur-xl">
    <div class="flex relative justify-center items-center h-16 mx-auto 2xl:w-7xl xl:w-6xl lg:w-5xl md:w-180">
      <Logo class="absolute left-2" />
      <NavMenu class="max-lg:hidden" />
      <Settings class="absolute right-2" />
    </div>
  </header>
</template>

<style scoped>

</style>
