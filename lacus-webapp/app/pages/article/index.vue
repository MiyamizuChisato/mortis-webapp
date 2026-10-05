<script setup lang="ts">
import ArticleCard from '~/components/article/ArticleCard.vue'
import ArticleCardSkeleton from '~/components/article/ArticleCardSkeleton.vue'
import ArticleCategoryCard from '~/components/article/ArticleCategoryCard.vue'
import ArticleHeroCard from '~/components/article/ArticleHeroCard.vue'
import { clientDelayFn } from '~/composables/delay.ts'
import { useArticleStore } from '~/store/articleStore.ts'

const route = useRoute()
const { replace } = useRouter()
const category = computed(() => route.query.category as string)
const articleStore = useArticleStore()
const { articleState } = storeToRefs(articleStore)
const [loading, toggleLoading] = useToggle()
const hasMore = computed(() => {
  if (articleState.value.articleList) {
    const { page, size } = articleState.value.query
    return page * size < articleState.value.articleList.total
  }
  else {
    return true
  }
})
async function loadMore() {
  if (articleState.value.articleList && !loading.value) {
    toggleLoading()
    articleState.value.query.page += 1
    const result = await delayFn(async () => {
      return await articleStore.loadArticle(category.value)
    }, 800)
    articleState.value.articleList.records.push(...result.records)
    toggleLoading()
  }
}
if (articleState.value.query.category) {
  replace({
    query: {
      category: articleState.value.query.category,
    },
  })
}
if (hasMore.value && !articleState.value.articleList) {
  toggleLoading()
  const { error } = await useAsyncData('article', async () => {
    const result = await clientDelayFn(async () => {
      articleState.value.query.category = category.value
      return await articleStore.loadArticle(category.value)
    }, 500)
    articleState.value.articleList = result
    if (!result) {
      throw showError({ message: 'not found' })
    }
    else {
      return result
    }
  }, { lazy: true })
  if (error.value) {
    showError({ fatal: true })
  }
  toggleLoading()
  if (error.value) {
    throw createError({ message: '666', fatal: true })
  }
}

const close = watch(category, async () => {
  if (category.value !== articleState.value.query.category) {
    articleState.value = articleStore.initState(category.value)
    articleState.value.articleList = await delayFn(async () => {
      return await articleStore.loadArticle(category.value)
    }, 800)
  }
})
onUnmounted(() => {
  close()
})
autoScroll('article')
</script>

<template>
  <div class="grid grid-cols-4 gap-4 px-4">
    <div class="col-span-1 max-lg:hidden">
      <div class="sticky top-20">
        <ArticleHeroCard />
      </div>
    </div>
    <div class="grid gap-4 grid-rows-[auto_auto] content-start lg:col-span-2 col-span-4">
      <template v-if="articleState.articleList">
        <ArticleCard v-for="i in articleState.articleList.records" :key="i.id" :article="i" />
      </template>
      <template v-if="hasMore || loading">
        <ArticleCardSkeleton use-load @load="loadMore" />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
      </template>
    </div>
    <div class="col-span-1 max-lg:hidden">
      <div class="sticky space-y-4 top-20">
        <ArticleCategoryCard />
        <!--        <ArticleStatisticsCard /> -->
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
