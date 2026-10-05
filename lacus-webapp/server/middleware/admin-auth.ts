import { roleAdminService } from '#server/service/role.admin.service.ts'

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname
  if (!path.startsWith('/api/admin/')) {
    return
  }
  if (path === '/api/admin/auth/login') {
    return
  }
  const id = await getUserIdByToken(event)
  const roles = await roleAdminService.getRolesByUserId(id)
  const isAdmin = roles.payload?.some(item => ['SUPERADMIN', 'ADMINISTRATOR'].includes(item))
  if (!isAdmin) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }
})
