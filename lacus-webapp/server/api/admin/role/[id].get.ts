import { idSchema } from '#server/schemas/page.schema.ts'
import { roleAdminService } from '#server/service/role.admin.service.ts'

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, body => idSchema.parse(body))
  return roleAdminService.getRoleById(id)
})
