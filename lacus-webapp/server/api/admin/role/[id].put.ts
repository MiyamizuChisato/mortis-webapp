import { idSchema } from '#server/schemas/page.schema.ts'
import { roleSchema } from '#server/schemas/role.schema.ts'
import { roleAdminService } from '#server/service/role.admin.service.ts'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, body => roleSchema.parse(body))
  const { id } = await getValidatedRouterParams(event, body => idSchema.parse(body))
  return roleAdminService.updateRole(id, body)
})
