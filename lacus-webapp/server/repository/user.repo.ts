import type { IUserSearch } from '#server/api/webapp/user/index.get.ts'
import { db } from '#server/utils/db'

export type UserConfig = Awaited<ReturnType<typeof userRepo.findById>>
export const userRepo = {
  findById: async (userId: number) => await db.query.userAccount.findFirst({
    where({ id }, { eq }) {
      return eq(id, userId)
    },
    columns: {
      password: false,
      updateTime: false,
    },
  }),
  find: async (query: IUserSearch) => await db.query.userAccount.findMany({
    where(userProfile, { eq, and }) {
      const conditions = []
      if (query.id !== undefined) {
        conditions.push(eq(userProfile.id, query.id))
      }
      if (query.nickname) {
        conditions.push(eq(userProfile.nickname, query.nickname))
      }
      if (query.email) {
        conditions.push(eq(userProfile.email, query.email))
      }
      return conditions.length > 0 ? and(...conditions) : undefined
    },
    columns: {
      password: false,
      updateTime: false,
    },
  }),
}
