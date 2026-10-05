<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="alert-dialog-footer"
    :class="
      cn(
        'bg-muted/50',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
