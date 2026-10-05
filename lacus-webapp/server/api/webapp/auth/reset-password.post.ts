import { getResetPasswordSchema } from '#server/schemas/auth.schema.ts'
import { userService } from '#server/service/user.service.ts'
import { ok } from '#server/utils/response.ts'

export default defineEventHandler(async (event) => {
  const schema = getResetPasswordSchema(await useTranslation(event))
  const body = await readValidatedBody(event, body => schema.parse(body))
  return ok(await userService.resetPassword(body))
})
