<script setup lang="ts">
definePageMeta({
  layout: 'center',
})
onBeforeMount(() => {
  window.opener?.postMessage(
    {
      type: 'oauth-success',
    },
    window.opener.origin,
  )
})
</script>

<template>
  <div class="flex gap-2 items-center">
    <Icon class="size-6" name="icon-[solar--check-circle-bold-duotone]" />
    <span>登陆成功！</span>
  </div>
</template>
