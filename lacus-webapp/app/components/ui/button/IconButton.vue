<script setup lang="ts">
import { Button } from '~/components/ui/button/index'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'

withDefaults(defineProps<{
  icon: string
  tips: string
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link' | null | undefined
}>(), {
  variant: 'ghost',
})
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button v-bind="$attrs" :variant="variant" size="icon-lg">
          <Icon :name="icon" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ tips }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<style scoped>

</style>
