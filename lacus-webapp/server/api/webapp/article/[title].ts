import { z } from 'zod'
import { articleService } from '#server/service/article.service.ts'
import { ok } from '#server/utils/response.ts'

const paramSchema = z.object({
  title: z.string(),
})
export default defineEventHandler(async (event) => {
  const { title } = await getValidatedRouterParams(event, body => paramSchema.parse(body))
  return ok(await articleService.getArticleByTitle(title))
})
