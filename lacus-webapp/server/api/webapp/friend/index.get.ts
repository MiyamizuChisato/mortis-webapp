import { friendService } from '#server/service/friend.service.ts'
import { ok } from '#server/utils/response.ts'

export default defineEventHandler(async () => {
  return ok(await friendService.getFriendList())
})
