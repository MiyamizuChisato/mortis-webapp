<script setup lang="ts">
import type { ComposerTranslation } from 'vue-i18n'
import { Container, Heading, Html, Tailwind, Text } from '@vue-email/components'

defineProps<{
  code: string
  locale: string
  t: ComposerTranslation
}>()
</script>

<template>
  <Tailwind>
    <Html :lang="locale">
      <Container class="space-y-12 w-full">
        <Heading as="h1">
          {{ t("template.code.title") }}
        </Heading>
        <Text>
          {{ t("template.code.description") }}
        </Text>
        <Text class="font-bold text-3xl text-center tracking-widest">
          {{ code }}
        </Text>
        <Text class="text-end text-xs text-muted-foreground">
          {{ t("template.code.tips") }}
        </Text>
      </Container>
    </Html>
  </Tailwind>
</template>
