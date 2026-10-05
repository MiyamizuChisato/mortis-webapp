import type { SQL } from 'drizzle-orm'
import type { IArticleSearch } from '#server/api/webapp/article/index.get.ts'
import { and, eq, sql } from 'drizzle-orm'
import { article } from '~~/db/schema'
import { ErrorCode } from '#server/constant/error-code.ts'
import { serviceError } from '#server/utils/service-error.ts'

export type ArticleCategoryList = Awaited<ReturnType<typeof articleService.getAllCategories>>
export type ArticleList = Awaited<ReturnType<typeof articleService.getArticleList>>
export type Article = Awaited<ReturnType<typeof articleService.getArticleById>>
export const articleService = {
  getAllCategories: async () => {
    return await db.query.articleCategory.findMany()
  },

  getArticleCategoryByName: async (categoryName: string) => {
    return await db.query.articleCategory.findFirst({
      where({ name }, { eq }) {
        return eq(name, categoryName)
      },
    })
  },

  getArticleList: async ({ categoryName, page, size }: IArticleSearch) => {
    const conditions: SQL<unknown>[] = []
    conditions.push(eq(article.deleted, false))
    if (categoryName) {
      const category = await articleService.getArticleCategoryByName(categoryName)
      if (category) {
        conditions.push(eq(article.categoryId, category?.id))
      }
      else {
        throw serviceError(ErrorCode.NOT_FOUND_CATEGORY)
      }
    }
    const filter = and(...conditions)
    const [records, total] = await Promise.all([
      await db.query.article.findMany({
        where() {
          return filter
        },
        with: {
          category: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
        orderBy({ id }, { desc }) {
          return desc(id)
        },
        limit: size,
        offset: (page - 1) * size,
      }),
      await db.$count(article, filter),
    ])
    return { records, total }
  },
  getArticleById: async (articleId: number) => {
    return db.query.article.findFirst({
      where({ id }, { eq }) {
        return eq(id, articleId)
      },
      with: {
        category: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    })
  },
  getArticleByTitle: (articleTitle: string) => {
    return db.query.article.findFirst({
      where({ title }, { eq }) {
        return eq(title, articleTitle)
      },
      with: {
        category: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    })
  },
  getRandomArticleTitle: async () => {
    const [random] = await db
      .select({
        title: article.title,
      })
      .from(article)
      .orderBy(sql`RANDOM()`)
      .limit(1)
    return random?.title
  },
}
