<script setup lang="ts">
const { useLoad } = defineProps<{
  useLoad?: boolean
}>()
const emit = defineEmits<{
  load: []
}>()
const loader = useTemplateRef('loader')
if (useLoad) {
  const { stop } = useIntersectionObserver(loader, ([entry]) => {
    if (entry?.isIntersecting) {
      emit('load')
    }
  }, { threshold: 0.5 })
  onUnmounted(() => {
    stop()
  })
}
</script>

<template>
  <div ref="loader">
    <skeleton class="w-full h-90 md:h-48" />
  </div>
</template>

<style scoped>

</style>
