<script setup lang="ts">
</script>

<template>
  <Motion
    class="will-change-[transform,opacity]"
    :initial="{
      opacity: 0,
      y: 80,
    }"
    :while-in-view="{
      opacity: 1,
      y: 0,
    }"
    :in-view-options="{
      once: true,
    }"
    :transition="{
      type: 'spring',
      duration: 1,
    }"
  >
    <slot />
  </Motion>
</template>
