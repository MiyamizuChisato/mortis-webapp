import type { ArticleCategoryList, ArticleList } from '#server/service/article.service.ts'

export const useArticleStore = defineStore('article', () => {
  const articleCategoryList = ref<ArticleCategoryList>()
  const articleState = ref<{
    query: {
      page: number
      size: number
      category?: string
    }
    articleList?: ArticleList
  }>(initState())
  function initState(category?: string) {
    return {
      query: {
        page: 1,
        size: 5,
        category,
      },
      articleList: undefined,
    }
  }
  async function loadArticle(categoryName?: string) {
    const { query } = articleState.value
    const { page, size } = query
    return await useHttp().get<ArticleList>('/article', { categoryName, page, size })
  }

  return { articleCategoryList, articleState, loadArticle, initState }
})
