import { articleService } from '#server/service/article.service.ts'
import { ok } from '#server/utils/response.ts'

export default defineEventHandler(async () => {
  return ok(await articleService.getAllCategories())
})
