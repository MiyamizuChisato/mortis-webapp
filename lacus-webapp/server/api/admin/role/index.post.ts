import { roleSchema } from '#server/schemas/role.schema.ts'
import { roleAdminService } from '#server/service/role.admin.service.ts'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, body => roleSchema.parse(body))
  return roleAdminService.createRole(body)
})
