<script setup lang="ts">
defineProps<{
  image?: string
}>()
const { header, neck, footer } = useSlots() as unknown as { default: boolean, header: boolean, neck: boolean, footer: boolean }
</script>

<template>
  <div
    :style="image ? { backgroundImage: `url(${image})` } : undefined"
    class="relative flex flex-col bg-card rounded-xl bg-center bg-cover bg-no-repeat overflow-hidden px-4 py-4 xl:py-6 xl:px-6"
  >
    <div v-if="header" class="text-xs mb-4 xl:mb-6">
      <slot name="header" />
    </div>
    <div v-if="neck" class="text-4xl font-bold mb-8 xl:mb-12">
      <slot name="neck" />
    </div>
    <div class="flex-1">
      <slot />
    </div>
    <div v-if="footer" class="text-xs mt-4 xl:mt-6">
      <slot name="footer" />
    </div>
  </div>
</template>
