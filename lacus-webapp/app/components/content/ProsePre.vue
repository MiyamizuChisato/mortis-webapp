<script setup lang="ts">
import IconButton from '~/components/ui/button/IconButton.vue'

withDefaults(defineProps<{
  code?: string
  language?: string | null
  filename?: string | null
  highlights?: number[]
  meta?: string | null
  class?: string | null
}>(), {
  code: '',
  language: null,
  filename: null,
  highlights: () => [],
  meta: null,
  class: null,
})
</script>

<template>
  <div class="bg-muted rounded-md mt-6 overflow-auto">
    <div class="flex items-center justify-between p-2 border-b border-dashed">
      <div class="flex items-center space-x-2">
        <Icon class="text-lg" name="icon-[solar--code-linear]" />
        <span v-if="filename">
          {{ filename }}
        </span>
        <span v-else>
          {{ language }}
        </span>
      </div>
      <div>
        <IconButton icon="icon-[solar--copy-linear]" tips="拷贝" />
      </div>
    </div>
    <pre class="p-2 font-mono" :class="$props.class"><slot /></pre>
  </div>
</template>
