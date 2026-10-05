import type { SQL } from 'drizzle-orm'
import type { ISystemRoleSearch } from '#server/api/admin/role/index.get.ts'
import type { IRole } from '#server/schemas/role.schema.ts'

import { and, eq, ilike } from 'drizzle-orm'
import { systemRole, userRole } from '~~/db/schema'
import { success } from '#server/utils/response.ts'

export const roleAdminService = {
  getRolesPage: async ({ page, size, roleName }: ISystemRoleSearch) => {
    const conditions: SQL<unknown>[] = []
    if (roleName) {
      conditions.push(ilike(systemRole.roleName, `%${roleName}%`))
    }
    const filter = and(...conditions)
    const [items, total] = await Promise.all([
      await db.query.systemRole.findMany({
        where: filter,
        limit: size,
        offset: (page - 1) * size,
      }),
      await db.$count(systemRole, filter),
    ])
    return ok({
      items,
      total,
    })
  },
  getRolesByUserId: async (userId: number) => {
    let result = await cache.get<string[]>(`user.roles.${userId}`)
    if (!result) {
      const res = await db.query.userRole.findMany({
        where: eq(userRole.userId, userId),
        with: {
          role: {
            columns: {
              roleName: true,
            },
          },
        },
      })
      result = res.map(item => item.role.roleName)
      await cache.set(`user.roles.${userId}`, result, 60 * 60 * 24)
    }
    return ok(result)
  },
  getRoleById: async (id: number) => {
    const result = db.query.systemRole.findFirst({
      where: eq(systemRole.id, id),
    })
    return ok(result)
  },
  updateRole: async (id: number, body: IRole) => {
    await db.update(systemRole).set(body).where(eq(systemRole.id, id))
    return success()
  },
  createRole: async (body: IRole) => {
    const precheck = await roleAdminService.getRoleByName(body.roleName)
    if (precheck.payload.length > 0) {
      return ng()
    }
    await db.insert(systemRole).values(body)
    return success()
  },

  getRoleByName: async (name: string) => {
    const result = await db.query.systemRole.findMany({
      where: eq(systemRole.roleName, name),
    })
    return ok(result)
  },
  deleteRole: async (id: number) => {
    await db.delete(systemRole).where(eq(systemRole.id, id))
    return success()
  },
}
