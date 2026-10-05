import { relations, sql } from 'drizzle-orm'
import {
  bigint,
  date,
  pgTable,
  primaryKey,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { instant, instantThumb } from './instant.ts'

export const userAccount = pgTable('user_account', {
  id: bigint('id', { mode: 'number' })
    .notNull()
    .generatedAlwaysAsIdentity()
    .primaryKey(),

  uid: varchar('uid', { length: 12 }).notNull().unique(),

  nickname: varchar('nickname', { length: 16 }).notNull(),

  motto: varchar('motto', { length: 255 }),

  birthday: date('birthday', {
    mode: 'string',
  }),

  profession: varchar('profession', { length: 255 }),

  address: varchar('address', { length: 50 }),

  phone: varchar('phone', { length: 50 }),

  email: varchar('email', { length: 50 }),

  gender: varchar('gender', { length: 10 })
    .default('UNKNOWN'),

  password: varchar('password', { length: 255 }),

  website: varchar('website', { length: 255 }),

  avatar: varchar('avatar', { length: 255 }),

  createTime: timestamp('create_time', { withTimezone: true })
    .notNull()
    .default(sql`now()`),

  updateTime: timestamp('update_time', { withTimezone: true })
    .notNull()
    .default(sql`now()`),
})

export const userSocial = pgTable('user_social', {
  id: bigint('id', { mode: 'number' })
    .generatedAlwaysAsIdentity()
    .primaryKey(),

  userId: bigint('user_id', { mode: 'number' })
    .notNull()
    .references(() => userAccount.id),

  uuid: varchar('uuid', { length: 255 }).notNull(),

  accessToken: varchar('access_token', { length: 1024 }).notNull(),

  refreshToken: varchar('refresh_token', { length: 1024 }),

  expireIn: timestamp('expire_in', { withTimezone: true }),

  socialPath: varchar('social_path', { length: 255 }),

  source: varchar('source', { length: 20 }).notNull(),
})

export const systemRole = pgTable('system_role', {
  id: bigint('id', { mode: 'number' })
    .generatedAlwaysAsIdentity()
    .primaryKey(),

  roleName: varchar('role_name', { length: 20 }).notNull(),

  createTime: timestamp('create_time', { withTimezone: true })
    .notNull()
    .default(sql`now()`),

  updateTime: timestamp('update_time', { withTimezone: true })
    .notNull()
    .default(sql`now()`),
})

export const userRole = pgTable('user_role', {
  userId: bigint('user_id', { mode: 'number' })
    .notNull()
    .references(() => userAccount.id),

  roleId: bigint('role_id', { mode: 'number' })
    .notNull()
    .references(() => systemRole.id),
}, table => [
  primaryKey({
    columns: [table.userId, table.roleId],
  }),
])

export const userRelations = relations(userAccount, ({ many }) => ({
  userSocials: many(userSocial),
  userRoles: many(userRole),
  instants: many(instant),
  instantThumbs: many(instantThumb),
}))
export const roleRelations = relations(systemRole, ({ many }) => ({
  users: many(userRole),
}))
export const userRoleRelations = relations(userRole, ({ one }) => ({
  user: one(userAccount, {
    fields: [userRole.userId],
    references: [userAccount.id],
  }),
  role: one(systemRole, {
    fields: [userRole.roleId],
    references: [systemRole.id],
  }),
}))
export const userSocialRelations = relations(userSocial, ({ one }) => ({
  user: one(userAccount, {
    fields: [userSocial.userId],
    references: [userAccount.id],
  }),
}))
// 导出类型推断
export type UserAccount = typeof userAccount.$inferSelect
export type NewUserAccount = typeof userAccount.$inferInsert

export type UserSocial = typeof userSocial.$inferSelect
export type NewUserSocial = typeof userSocial.$inferInsert
