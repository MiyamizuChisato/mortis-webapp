import { z } from 'zod'
import { pageSchema } from '#server/schemas/page.schema.ts'
import { articleService } from '#server/service/article.service.ts'
import { ok } from '#server/utils/response.ts'

const paramSchema = pageSchema.extend({
  categoryName: z.string().optional(),
})
export type IArticleSearch = z.infer<typeof paramSchema>
export default defineEventHandler(async (event) => {
  const body = await getValidatedQuery(event, body => paramSchema.parse(body))
  return ok(await articleService.getArticleList(body))
})
