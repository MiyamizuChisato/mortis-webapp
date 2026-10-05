<script setup lang="ts">
import { InteractiveHoverButton } from '~/components/ui/interactive-hover-button'

const localePath = useLocalePath()
const { t } = useI18n()
async function browse() {
  const title = await useHttp().get<string>('/article/random')
  navigateTo(localePath({
    name: 'article-title',
    params: {
      title,
    },
  }))
}
</script>

<template>
  <div class="bg-card overflow-hidden rounded-xl p-4">
    <Icon name="icon-[solar--round-arrow-right-down-linear]" />
    <h1 class="text-lg font-bold">
      {{ t("article.hero.title") }}
    </h1>
    <p class="my-4 text-muted-foreground">
      {{ t("article.hero.content") }}
    </p>
    <InteractiveHoverButton class="border-none" :text="t('article.hero.browse')" @click="browse" />
  </div>
</template>

<style scoped>

</style>
