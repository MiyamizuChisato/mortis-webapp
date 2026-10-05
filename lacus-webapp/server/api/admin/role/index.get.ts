import { z } from 'zod'
import { pageSchema } from '#server/schemas/page.schema.ts'
import { roleAdminService } from '#server/service/role.admin.service.ts'

const paramSchema = pageSchema.extend({
  roleName: z.string().optional(),
})
export type ISystemRoleSearch = z.infer<typeof paramSchema>
export default defineEventHandler(async (event) => {
  const body = await getValidatedQuery(event, body => paramSchema.parse(body))
  return roleAdminService.getRolesPage(body)
})
