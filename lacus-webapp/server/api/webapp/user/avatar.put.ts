import { z } from 'zod'
import { userService } from '#server/service/user.service.ts'
import { checkToken } from '#server/utils/auth.ts'
import { ok } from '#server/utils/response.ts'

const paramSchema = z.object({
  id: z.number(),
  newAvatar: z.string(),
  oldAvatar: z.string().nullable(),
})
export type IUserAvatarUpdate = z.infer<typeof paramSchema>
export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, body => paramSchema.parse(body))
  await checkToken(event, body.id)
  return ok(await userService.updateUserAvatar(body))
})
