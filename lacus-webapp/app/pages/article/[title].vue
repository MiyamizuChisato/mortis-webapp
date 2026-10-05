<script setup lang="ts">
import type { Article } from '#server/service/article.service.ts'
import dayjs from 'dayjs'
import ArticleDetailSkeleton from '~/components/article/ArticleDetailSkeleton.vue'
import ArticleTocCard from '~/components/article/ArticleTocCard.vue'
import { clientDelayFn } from '~/composables/delay.ts'
import useMarkdownParser from '~/composables/parser'

const { params } = useRoute()
const title = computed(() => (params as { title: string }).title)
const { data, pending, error } = await useAsyncData(`article-${title.value}`, async () => {
  const result = await clientDelayFn(async () => {
    return await useHttp().get<Article>(`/article/${title.value}`)
  }, 500)
  if (!result) {
    throw showError({ message: 'not found' })
  }
  else {
    return result
  }
}, {
  lazy: true,
  async transform(res) {
    const markdown = await $fetch<string>(res.content)
    const md = await useMarkdownParser()(markdown)
    return {
      md,
      res,
    }
  },
})
if (error.value) {
  showError({ message: 'not found' })
}
</script>

<template>
  <div>
    <div class="grid grid-cols-5">
      <div class="max-md:hidden" />
      <div class="col-span-5 lg:col-span-3 px-4">
        <template v-if="pending">
          <ArticleDetailSkeleton />
        </template>
        <template v-else>
          <div class="flex items-center flex-wrap gap-4 text-muted-foreground">
            <Badge>{{ data?.res.category.name }}</Badge>
            <div class="flex items-center gap-1">
              <Icon name="icon-[solar--calendar-linear]" />
              <span class="text-sm">
                {{ dayjs(data?.res.createTime).format("YYYY-MM-DD") }}
              </span>
            </div>
            <div class="flex items-center gap-1">
              <Icon name="icon-[solar--text-selection-linear]" />
              <span class="text-sm">{{ data?.res.characters }}字</span>
            </div>
          </div>
          <h1 class="text-4xl font-bold mt-4 mb-8">
            {{ data?.res.title }}
          </h1>
          <NuxtImg :src="data?.res.cover" class="rounded-xl w-full object-cover aspect-2/1" />
          <MDCRenderer v-if="data?.md" :body="data.md.body" :data="data.md.data" />
        </template>
      </div>
      <div class="max-md:hidden mx-4">
        <div class="sticky mb-10 h-[50vh] top-[50%] translate-y-[-50%] overflow-y-auto no-scrollbar">
          <ClientOnly>
            <ArticleTocCard :toc="data?.md.toc" />
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>
