<script setup lang="ts">
const { load } = defineProps<{
  row: number
  load?: boolean
}>()
const emit = defineEmits<{
  loading: []
}>()
const loader = useTemplateRef('loader')
if (load) {
  const { stop } = useIntersectionObserver(loader, ([entry]) => {
    if (entry?.isIntersecting) {
      emit('loading')
    }
  }, { threshold: 0.5 })
  onUnmounted(() => {
    stop()
  })
}
</script>

<template>
  <div ref="loader" class="bg-card rounded-xl p-4">
    <div class="flex gap-2">
      <Skeleton class="size-10 rounded-full" />
      <div class="flex flex-col justify-between">
        <Skeleton class="h-5 w-20" />
        <Skeleton class="h-4 w-30" />
      </div>
    </div>
    <div class="mt-4 space-y-2">
      <Skeleton v-for="i in row" :key="i" class="h-4" />
      <Skeleton class="h-4 w-[60%]" />
    </div>
  </div>
</template>
