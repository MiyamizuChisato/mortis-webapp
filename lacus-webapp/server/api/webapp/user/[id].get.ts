import { z } from 'zod'
import { userService } from '#server/service/user.service.ts'
import { ok } from '#server/utils/response.ts'

const paramSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, params => paramSchema.parse(params))
  return ok(await userService.getUserById(id))
})
