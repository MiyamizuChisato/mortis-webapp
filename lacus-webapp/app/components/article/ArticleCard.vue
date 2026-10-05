<script setup lang="ts">
import type { Article } from '#server/service/article.service.ts'
import dayjs from 'dayjs'
import { Badge } from '~/components/ui/badge'

defineProps<{
  article: Article
}>()
const localePath = useLocalePath()
</script>

<template>
  <NuxtLink
    v-if="article"
    class="h-fit"
    :to="localePath({
      name: 'article-title',
      params: {
        title: article.title,
      },
    })"
  >
    <section class="grid relative bg-card items-stretch sm:grid-cols-9 rounded-xl group overflow-hidden">
      <Badge class="absolute right-4 top-4 z-1" variant="secondary">
        {{ article.category.name }}
      </Badge>
      <div class="aspect-2/1 relative overflow-hidden sm:col-span-4 sm:order-2">
        <div class="z-1 absolute inset-0 bg-background opacity-25 transition-opacity duration-300 group-hover:opacity-0" />
        <NuxtImg :src="article.cover" class="w-full object-cover sm:mask-l-from-75%  max-sm:mask-b-from-75%" />
      </div>
      <div class="w-full p-5 space-y-4 sm:col-span-5">
        <h1 class="text-xl line-clamp-1">
          {{ article.title }}
        </h1>
        <p class="line-clamp-3 h-18 text-accent-foreground">
          {{ article.summary }}
        </p>
        <div class="flex justify-between items-center gap-3 text-muted-foreground">
          <div class="flex items-center gap-2">
            <Icon name="icon-[solar--calendar-linear]" />
            <span class="text-sm">{{ dayjs(article.createTime).format("YYYY-MM-DD") }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon name="icon-[solar--text-selection-linear]" />
            <span class="text-sm">{{ article.characters }}字</span>
          </div>
        </div>
      </div>
    </section>
  </NuxtLink>
</template>

<style scoped>

</style>
