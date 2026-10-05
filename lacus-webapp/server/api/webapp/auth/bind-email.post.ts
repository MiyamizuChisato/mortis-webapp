import { getServerBindEmailSchema } from '#server/schemas/auth.schema.ts'
import { userService } from '#server/service/user.service.ts'
import { checkToken } from '#server/utils/auth.ts'
import { ok } from '#server/utils/response.ts'

export default defineEventHandler(async (event) => {
  const schema = getServerBindEmailSchema(await useTranslation(event))
  const body = await readValidatedBody(event, body => schema.parse(body))
  await checkToken(event, body.id)
  return ok(await userService.bindEmail(body))
})
