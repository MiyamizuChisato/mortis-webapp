import type { SQL } from 'drizzle-orm'
import type { NewInstant } from '~~/db/schema'
import type { IInstantSearch } from '#server/api/webapp/instant/index.get.ts'
import { and, eq, isNull, sql } from 'drizzle-orm'
import { instant, instantThumb } from '~~/db/schema'

export type InstantList = Awaited<ReturnType<typeof instantService.getInstantList>>
export type Instant = Awaited<ReturnType<typeof instantService.getInstantById>>
export const instantService = {
  getInstantById: async (instantId: number) => {
    return await db.query.instant.findFirst({
      where({ id, deleted }, { eq, and }) {
        return and(
          eq(id, instantId),
          eq(deleted, false),
        )
      },
      with: {
        author: {
          columns: {
            id: true,
            nickname: true,
            avatar: true,
            identity: true,
            motto: true,
          },
        },
        refer: {
          columns: {
            id: true,
            nickname: true,
            avatar: true,
            identity: true,
            motto: true,
          },
        },
      },
    })
  },
  getInstantThumbList: async (userId: number) => {
    const userInstantThumbedList = await db.query.instantThumb.findMany({
      columns: {
        instantId: true,
      },
      where(table, { eq }) {
        return eq(table.userId, userId)
      },
    })
    return userInstantThumbedList.map(item => item.instantId)
  },
  getInstantList: async (input: IInstantSearch) => {
    const conditions: SQL<unknown>[] = []
    conditions.push(
      eq(instant.confidential, false),
      eq(instant.deleted, false),
    )
    input.rootId ? conditions.push(eq(instant.rootId, input.rootId)) : conditions.push(isNull(instant.rootId))
    if (input.referId) {
      conditions.push(eq(instant.referId, input.referId))
    }
    const filter = and(...conditions)
    const [records, total] = await Promise.all([
      await db.query.instant.findMany({
        where() {
          return filter
        },
        with: {
          author: {
            columns: {
              id: true,
              nickname: true,
              avatar: true,
              identity: true,
              motto: true,
            },
          },
          refer: {
            columns: {
              id: true,
              nickname: true,
              avatar: true,
              identity: true,
              motto: true,
            },
          },
        },
        orderBy({ id }, { desc }) {
          return desc(id)
        },
        limit: input.size,
        offset: (input.page - 1) * input.size,
      }),
      await db.$count(instant, filter),
    ])
    return { records, total }
  },
  saveInstant: async (body: NewInstant) => {
    const [user] = await db.insert(instant).values(body).returning({ id: instant.id })
    return await instantService.getInstantById(user?.id || 0)
  },
  switchInstantThumb: async ({ userId, instantId }: { userId: number, instantId: number }) => {
    const thumb = await db.query.instantThumb.findFirst({
      columns: {
        id: true,
      },
      where(table, { eq, and }) {
        return and(eq(table.userId, userId), eq(table.instantId, instantId))
      },
    })
    // 存在，则取消
    if (thumb) {
      return await db.transaction(async (tx) => {
        await tx.delete(instantThumb).where(eq(instantThumb.id, thumb.id))
        await tx.update(instant)
          .set({
            thumbs: sql`GREATEST(${instant.thumbs} - 1, 0)`,
          })
          .where(eq(instant.id, instantId))
        return false
      })
    }
    // 不存在，新增
    else {
      return await db.transaction(async (tx) => {
        await tx.insert(instantThumb).values({ userId, instantId })
        await tx.update(instant)
          .set({
            thumbs: sql<number>`${instant.thumbs} + 1`,
          })
          .where(eq(instant.id, instantId))
        return true
      })
    }
  },
}
