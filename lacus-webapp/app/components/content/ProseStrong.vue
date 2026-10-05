<script setup lang="ts">
import { annotate } from 'rough-notation'

const strong = useTemplateRef('strong')

onMounted(() => {
  if (strong.value) {
    annotate(strong.value, {
      type: 'box',
      padding: 2,
      animate: false,
    }).show()
  }
})
</script>

<template>
  <strong ref="strong">
    <slot />
  </strong>
</template>
