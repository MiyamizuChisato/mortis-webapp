import { z } from 'zod'
import { userService } from '#server/service/user.service.ts'
import { checkToken } from '#server/utils/auth.ts'
import { ok } from '#server/utils/response.ts'

export const paramSchema = z.object({
  id: z.number(),
  nickname: z.string().optional(),
  motto: z.string().optional().nullable(),
  birthday: z.string().optional().nullable(),
  profession: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
})
export type IUserProfileUpdate = z.infer<typeof paramSchema>
export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, body => paramSchema.parse(body))
  await checkToken(event, body.id)
  return ok(await userService.updateUserProfile(body))
})
