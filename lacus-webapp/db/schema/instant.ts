import { relations, sql } from 'drizzle-orm'
import { bigint, boolean, integer, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'
import { userAccount } from './user.ts'

export const instant = pgTable('instant', {
  id: bigint('id', { mode: 'number' })
    .notNull()
    .generatedAlwaysAsIdentity()
    .primaryKey(),

  content: text('content').notNull(),

  thumbs: integer('thumbs').default(0).notNull(),

  confidential: boolean('confidential').default(false).notNull(),

  rootId: bigint('root_id', { mode: 'number' }),

  replyId: bigint('reply_id', { mode: 'number' }),

  authorId: bigint('author_id', { mode: 'number' }).notNull().references(() => userAccount.id),

  referId: bigint('refer_id', { mode: 'number' }).references(() => userAccount.id),

  changed: boolean('changed').default(false).notNull(),

  createTime: timestamp('create_time', { withTimezone: true })
    .notNull()
    .default(sql`now()`),

  updateTime: timestamp('update_time', { withTimezone: true })
    .notNull()
    .default(sql`now()`),

  deleted: boolean('deleted').default(false).notNull(),
})
export const instantThumb = pgTable('instant_thumb', {
  id: bigint('id', { mode: 'number' })
    .notNull()
    .generatedAlwaysAsIdentity()
    .primaryKey(),
  userId: bigint('user_id', { mode: 'number' }).notNull().references(() => userAccount.id),

  instantId: bigint('instant_id', { mode: 'number' }).notNull().references(() => instant.id),
}, table => [
  uniqueIndex('instant_user_unique')
    .on(table.instantId, table.userId),
])
export const instantRelations = relations(instant, ({ one }) => ({
  author: one(userAccount, {
    fields: [instant.authorId],
    references: [userAccount.id],
  }),
  refer: one(userAccount, {
    fields: [instant.referId],
    references: [userAccount.id],
  }),
}))
export const instantThumbRelations = relations(instantThumb, ({ one }) => ({
  user: one(userAccount, {
    fields: [instantThumb.userId],
    references: [userAccount.id],
  }),
  instant: one(instant, {
    fields: [instantThumb.instantId],
    references: [instant.id],
  }),
}))
export type NewInstant = typeof instant.$inferInsert
