<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogClose } from 'reka-ui'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  showCloseButton?: boolean
}>(), {
  showCloseButton: false,
})
</script>

<template>
  <div
    data-slot="dialog-footer"
    :class="cn('ounded-b-xl', props.class)"
  >
    <slot />
    <DialogClose v-if="showCloseButton" as-child>
      <Button variant="outline">
        Close
      </Button>
    </DialogClose>
  </div>
</template>
