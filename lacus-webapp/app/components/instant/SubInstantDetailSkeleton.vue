<script setup lang="ts">
</script>

<template>
  <div class="flex gap-2 items-start">
    <Skeleton class="size-6 rounded-full" />
    <div class="flex-1 space-y-1">
      <div class="flex flex-1 gap-2">
        <skeleton class="w-16 h-5" />
        <skeleton class="flex-1 h-5" />
      </div>
      <skeleton class="h-5 w-[75%]" />
      <div class="pt-2 flex justify-between">
        <skeleton class="h-4 w-64" />
        <skeleton class="h-4 w-16" />
      </div>
    </div>
  </div>
</template>
