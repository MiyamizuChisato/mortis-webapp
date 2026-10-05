<script setup lang="ts">

</script>

<template>
  <Motion
    :initial="{
      opacity: 0,
      scale: 0.6,
    }"
    :animate="{
      opacity: 1,
      scale: 1,
    }"
    :transition="{
      type: 'spring',
      duration: 0.8,
    }"
  >
    <slot />
  </Motion>
</template>

<style scoped>

</style>
