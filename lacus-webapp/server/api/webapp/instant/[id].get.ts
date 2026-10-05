import { z } from 'zod'
import { instantService } from '#server/service/instant.service.ts'
import { ok } from '#server/utils/response.ts'

const paramSchema = z.object({
  id: z.coerce.number(),
})
export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, body => paramSchema.parse(body))
  return ok(await instantService.getInstantById(id))
})
