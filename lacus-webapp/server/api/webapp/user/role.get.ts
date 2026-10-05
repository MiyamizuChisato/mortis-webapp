import { roleAdminService } from '#server/service/role.admin.service.ts'
import { getUserIdByToken } from '#server/utils/auth.ts'

export default defineEventHandler(async (event) => {
  const userId = await getUserIdByToken(event)
  return await roleAdminService.getRolesByUserId(userId)
})
