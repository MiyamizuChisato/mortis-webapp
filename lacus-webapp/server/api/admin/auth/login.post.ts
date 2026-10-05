import { getLoginSchema } from '#server/schemas/auth.schema.ts'
import { userAdminService } from '#server/service/user.admin.service.ts'

export default defineEventHandler(async (event) => {
  const schema = getLoginSchema(await useTranslation(event))
  const body = await readValidatedBody(event, body => schema.parse(body))
  return userAdminService.login(body)
})
