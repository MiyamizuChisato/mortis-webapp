import { instantService } from '#server/service/instant.service.ts'
import { ok } from '#server/utils/response.ts'

export default defineEventHandler(async (event) => {
  const userId = await getUserIdByToken(event)
  return ok(await instantService.getInstantThumbList(userId))
})
