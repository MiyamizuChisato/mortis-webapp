<script setup lang="ts">
import { annotate } from 'rough-notation'

const del = useTemplateRef('del')

onMounted(() => {
  if (del.value) {
    annotate(del.value, {
      type: 'strike-through',
      animate: false,
    }).show()
  }
})
</script>

<template>
  <del ref="del" class="no-underline">
    <slot />
  </del>
</template>

<style scoped>

</style>
