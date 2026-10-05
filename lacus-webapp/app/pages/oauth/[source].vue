<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})
const { params } = useRoute()
onBeforeMount(async () => {
  const { source } = params as { source: string }
  const { url, state } = await useHttp().get<{ url: string, state: string }>(`/auth/${source.toLowerCase()}`)
  document.cookie = `state=${state}; max-age=600; path=/`
  window.location.href = url
})
</script>

<template>
  <div class="w-dvw h-dvh flex justify-center items-center">
    <Icon class="size-12" name="icon-[svg-spinners--ring-resize]" />
  </div>
</template>
