<script setup lang="ts">
import Footer from '~/components/layout/Footer.vue'
import Header from '~/components/layout/Header.vue'
</script>

<template>
  <Body>
    <Header />
    <div class="flex flex-col min-h-dvh">
      <main class="my-16 py-4 mx-auto flex-1 w-full 2xl:w-7xl xl:w-6xl lg:w-240 md:w-180">
        <slot />
      </main>
      <Footer />
    </div>
  </Body>
</template>
