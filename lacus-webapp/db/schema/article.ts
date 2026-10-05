import { relations, sql } from 'drizzle-orm'
import { bigint, boolean, integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const articleCategory = pgTable('article_category', {
  id: bigint('id', { mode: 'number' })
    .notNull()
    .generatedAlwaysAsIdentity()
    .primaryKey(),

  name: varchar('name', { length: 32 }).notNull(),

  statistics: integer('statistics').default(0).notNull(),

  createTime: timestamp('create_time', { withTimezone: true })
    .notNull()
    .default(sql`now()`),

  updateTime: timestamp('update_time', { withTimezone: true })
    .notNull()
    .default(sql`now()`),
})

export const article = pgTable('article', {
  id: bigint('id', { mode: 'number' })
    .notNull()
    .generatedAlwaysAsIdentity()
    .primaryKey(),

  title: varchar('title', { length: 64 }).notNull(),

  summary: varchar('summary', { length: 512 }).notNull(),

  cover: varchar('cover', { length: 255 }).notNull(),

  content: varchar('content', { length: 255 }).notNull(),

  characters: varchar('characters', { length: 255 }).notNull(),

  browse: integer().default(0).notNull(),

  collected: integer().default(0).notNull(),

  categoryId: bigint('category_id', { mode: 'number' }).notNull().references(() => articleCategory.id),

  changed: boolean('changed').default(false).notNull(),

  createTime: timestamp('create_time', { withTimezone: true })
    .notNull()
    .default(sql`now()`),

  updateTime: timestamp('update_time', { withTimezone: true })
    .notNull()
    .default(sql`now()`),

  deleted: boolean('deleted').default(false).notNull(),
})
export const articleRelations = relations(article, ({ one }) => ({
  category: one(articleCategory, {
    fields: [article.categoryId],
    references: [articleCategory.id],
  }),
}))
