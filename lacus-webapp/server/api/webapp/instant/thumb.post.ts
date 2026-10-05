import { z } from 'zod'
import { instantService } from '#server/service/instant.service.ts'
import { ok } from '#server/utils/response.ts'

const paramSchema = z.object({
  instantId: z.number(),
  userId: z.number(),
})
export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, body => paramSchema.parse(body))
  await checkToken(event, body.userId)
  return ok(await instantService.switchInstantThumb(body))
})
