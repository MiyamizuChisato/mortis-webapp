import { z } from 'zod'
import { userService } from '#server/service/user.service.ts'
import { ok } from '#server/utils/response.ts'

export const paramSchema = z.object({
  id: z.number().optional(),
  email: z.string().optional(),
  nickname: z.string().optional(),
  birthday: z.string().optional(),
  profession: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  gender: z.string().optional(),
})
export type IUserSearch = z.infer<typeof paramSchema>
export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, query => paramSchema.parse(query))
  return ok(await userService.getUser(query))
})
