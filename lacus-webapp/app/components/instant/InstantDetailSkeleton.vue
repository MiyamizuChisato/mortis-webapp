<script setup lang="ts">
</script>

<template>
  <div class="space-y-4 p-4">
    <div class="flex justify-between items-center">
      <div class="flex gap-2">
        <Skeleton class="size-10 rounded-full" />
        <div class="space-y-1">
          <Skeleton class="w-20 h-5" />
          <Skeleton class="w-30 h-4" />
        </div>
      </div>
      <Skeleton class="w-12 h-6" />
    </div>
    <div class="space-y-2">
      <Skeleton class="h-4" />
      <Skeleton class="h-4" />
      <Skeleton class="h-4 w-[60%]" />
    </div>
  </div>
</template>
