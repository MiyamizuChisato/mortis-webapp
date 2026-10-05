<script setup lang="ts">
import type { ArticleCategoryList } from '#server/service/article.service.ts'
import ArticleCategoryCardSkeleton from '~/components/article/ArticleCategoryCardSkeleton.vue'
import { ButtonGroup, ButtonGroupSeparator } from '~/components/ui/button-group'
import { useArticleStore } from '~/store/articleStore.ts'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const articleStore = useArticleStore()
const currentCategory = computed(() => route.query.category)
const { articleCategoryList } = storeToRefs(articleStore)
const { pending } = useAsyncData('article-category', async () => {
  if (!articleCategoryList.value) {
    articleCategoryList.value = await delayFn(async () => await useHttp().get<ArticleCategoryList>('/article/category/all'), 500)
  }
  return articleCategoryList
})
function handleCategory(category: string) {
  if (currentCategory.value === category) {
    router.replace({ query: {} })
  }
  else {
    router.replace({
      query: {
        category,
      },
    })
  }
}
</script>

<template>
  <div class="p-4 bg-card rounded-xl">
    <h2 class="text-sm font-bold mb-4">
      {{ t("article.category.title") }}
    </h2>
    <ArticleCategoryCardSkeleton v-if="pending" />
    <div v-else class="flex gap-2 flex-wrap text-muted-foreground cursor-default">
      <ButtonGroup v-for="category in articleCategoryList" :key="category.id">
        <Button
          :variant="currentCategory === category.name ? 'default' : 'secondary'"
          @click="handleCategory(category.name)"
        >
          {{ category.name }}
        </Button>
        <ButtonGroupSeparator />
        <Button class="text-muted-foreground" variant="secondary">
          {{ category.statistics }}
        </Button>
      </ButtonGroup>
    </div>
  </div>
</template>
