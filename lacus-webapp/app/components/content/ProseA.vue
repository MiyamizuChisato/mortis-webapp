<script setup lang="ts">
import { annotate } from 'rough-notation'
import { LinkPreview } from '~/components/ui/link-preview'

withDefaults(defineProps<{
  href: string
  target?: '_blank' | '_parent' | '_self' | '_top'
}>(), {
  target: '_blank',
})

const link = useTemplateRef('link')

onMounted(() => {
  if (link.value) {
    annotate(link.value, {
      type: 'underline',
      padding: 0,
      animate: false,
    }).show()
  }
})
</script>

<template>
  <LinkPreview :url="href" :target="target" link-class="group cursor-pointer relative overflow-hidden px-1">
    <span ref="link" class="relative z-1 transition-colors duration-300 group-hover:text-background ">
      <slot />
    </span>
    <span class="absolute left-0 bottom-0 w-full h-0 bg-foreground transition-[height] duration-300 ease-out group-hover:h-full" />
  </LinkPreview>
</template>
