import { userService } from '#server/service/user.service.ts'
import { getUserIdByToken } from '#server/utils/auth.ts'
import { ok } from '#server/utils/response.ts'

export default defineEventHandler(async (event) => {
  const userId = await getUserIdByToken(event)
  return ok(await userService.getUserBindSocial(userId))
})
