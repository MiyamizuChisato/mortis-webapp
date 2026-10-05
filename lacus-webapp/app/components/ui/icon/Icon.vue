<script setup lang="ts">
withDefaults(defineProps<{
  name?: string
}>(), {
  name: 'icon-[solar--leaf-linear]',
})
</script>

<template>
  <i class="text-xl" :class="name" />
</template>
