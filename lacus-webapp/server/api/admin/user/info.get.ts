import { userAdminService } from '#server/service/user.admin.service.ts'

export default defineEventHandler(async (event) => {
  const id = await getUserIdByToken(event)
  return userAdminService.getUserById(id)
})
