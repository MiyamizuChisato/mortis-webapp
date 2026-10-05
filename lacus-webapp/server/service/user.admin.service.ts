import type { ILogin } from '#server/schemas/auth.schema.ts'
import bcrypt from 'bcrypt'
import { ErrorCode } from '#server/constant/error-code.ts'
import { db } from '#server/utils/db'
import { jwt } from '#server/utils/jwt'

export const userAdminService = {
  login: async (input: ILogin) => {
    const user = await db.query.userAccount.findFirst({
      where({ email }, { eq }) {
        return eq(email, input.email)
      },
      with: {
        userRoles: {
          with: {
            role: {
              columns: {
                roleName: true,
              },
            },
          },
        },
      },
    })
    if (!user || !user.password) {
      return ng(ErrorCode.LOGIN_ERROR)
    }
    const isAdmin = user.userRoles.some(item => ['SUPERADMIN', 'ADMINISTRATOR'].includes(item.role.roleName))
    if (!isAdmin) {
      return ng(ErrorCode.LOGIN_ERROR)
    }
    const valid = await bcrypt.compare(input.password, user.password)
    if (!valid) {
      return ng(ErrorCode.LOGIN_ERROR)
    }
    return ok({
      accessToken: await jwt.sign({
        id: user.id,
      }),
    })
  },
  getUserById: async (userId: number) => {
    const user = await db.query.userAccount.findFirst({
      where({ id }, { eq }) {
        return eq(id, userId)
      },
      columns: {
        password: false,
      },
      with: {
        userRoles: {
          with: {
            role: {
              columns: {
                roleName: true,
              },
            },
          },
        },
      },
    })
    return ok({ ...user, userRoles: user?.userRoles.map(item => item.role.roleName) || [] })
  },
}
