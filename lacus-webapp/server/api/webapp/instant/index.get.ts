import { z } from 'zod'
import { pageSchema } from '#server/schemas/page.schema.ts'
import { instantService } from '#server/service/instant.service.ts'
import { ok } from '#server/utils/response.ts'

const paramSchema = pageSchema.extend({
  rootId: z.coerce.number().optional(),
  referId: z.coerce.number().optional(),
})
export type IInstantSearch = z.infer<typeof paramSchema>
export default defineEventHandler(async (event) => {
  const body = await getValidatedQuery(event, body => paramSchema.parse(body))
  return ok(await instantService.getInstantList(body))
})
