import { relations, sql } from 'drizzle-orm'
import { bigint, boolean, integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { userAccount } from './user.ts'

export const friendCategory = pgTable('friend_category', {
  id: bigint('id', { mode: 'number' })
    .notNull()
    .generatedAlwaysAsIdentity()
    .primaryKey(),

  name: varchar('name', { length: 32 }).notNull(),

  sketch: varchar('sketch', { length: 255 }).notNull(),

  statistics: integer('statistics').default(0).notNull(),

  createTime: timestamp('create_time', { withTimezone: true })
    .notNull()
    .default(sql`now()`),

  updateTime: timestamp('update_time', { withTimezone: true })
    .notNull()
    .default(sql`now()`),
})

export const friend = pgTable('friend', {
  id: bigint('id', { mode: 'number' })
    .notNull()
    .generatedAlwaysAsIdentity()
    .primaryKey(),

  administrator: varchar('administrator', { length: 16 }).notNull(),

  title: varchar('title', { length: 16 }).notNull(),

  description: varchar('description', { length: 32 }).notNull(),

  website: varchar('website', { length: 255 }).notNull(),

  avatar: varchar('avatar', { length: 255 }).notNull(),

  comment: varchar('comment', { length: 32 }),

  navCount: integer('nav_count').default(0).notNull(),

  categoryId: bigint('category_id', { mode: 'number' }).references(() => friendCategory.id),

  userId: bigint('user_id', { mode: 'number' }).references(() => userAccount.id),

  createTime: timestamp('create_time', { withTimezone: true })
    .notNull()
    .default(sql`now()`),

  updateTime: timestamp('update_time', { withTimezone: true })
    .notNull()
    .default(sql`now()`),

  deleted: boolean('deleted').default(false).notNull(),

  passed: boolean('passed').default(false).notNull(),
})
export const friendCategoryRelations = relations(friendCategory, ({ many }) => ({
  friends: many(friend),
}))

export const friendRelations = relations(friend, ({ one }) => ({
  category: one(friendCategory, {
    fields: [friend.categoryId],
    references: [friendCategory.id],
  }),
  user: one(userAccount, {
    fields: [friend.userId],
    references: [userAccount.id],
  }),
}))
