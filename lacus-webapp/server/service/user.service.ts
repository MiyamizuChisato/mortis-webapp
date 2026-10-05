import type { IUnbindSocial } from '#server/api/webapp/auth/unbind-social.post.ts'
import type { IUserAvatarUpdate } from '#server/api/webapp/user/avatar.put.ts'
import type { IUserSearch } from '#server/api/webapp/user/index.get.ts'

import type { IUserProfileUpdate } from '#server/api/webapp/user/index.put.ts'
import type { UserConfig } from '#server/repository/user.repo'
import type { IBindEmail, ILogin, IRegister, IResetPassword, ISetPassword } from '#server/schemas/auth.schema.ts'
import type { UserOauth } from '#server/types/user'
import bcrypt from 'bcrypt'
import { and, eq } from 'drizzle-orm'
import { customAlphabet } from 'nanoid'
import { userAccount, userSocial } from '~~/db/schema'
import { ErrorCode } from '#server/constant/error-code.ts'
import { userRepo } from '#server/repository/user.repo'
import { db } from '#server/utils/db'
import { jwt } from '#server/utils/jwt'
import { serviceError } from '#server/utils/service-error.ts'

export const userService = {
  register: async ({ nickname, password, code, email }: IRegister) => {
    const verifyCode = await cache.get<string>(`verify:code:${email}`)
    if (!verifyCode || verifyCode !== code) {
      throw serviceError(ErrorCode.VERIFY_CODE_ERROR)
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const nanoId = customAlphabet(alphabet, 12)
    const uid = nanoId()
    const [user] = await db.insert(userAccount).values({
      uid,
      email,
      nickname,
      password: hashedPassword,
    }).returning({
      id: userAccount.id,
      uid: userAccount.uid,
    })
    if (!user) {
      throw serviceError(ErrorCode.UNKNOWN_ERROR)
    }
    await cache.del(`verify:code:${email}`)
    return await jwt.sign({
      id: user.id,
      uid: user.uid,
    })
  },
  login: async (input: ILogin) => {
    const user = await db.query.userAccount.findFirst({
      where({ email }, { eq }) {
        return eq(email, input.email)
      },
    })
    if (!user || !user.password) {
      throw serviceError(ErrorCode.LOGIN_ERROR)
    }
    const valid = await bcrypt.compare(input.password, user.password)
    if (!valid) {
      throw serviceError(ErrorCode.LOGIN_ERROR)
    }
    return await jwt.sign({
      id: user.id,
    })
  },
  getUserById: async (userId: number) => {
    let user = await cache.get<UserConfig>(`user:${userId}`)
    if (user) {
      return user
    }
    user = await db.query.userAccount.findFirst({
      where({ id }, { eq }) {
        return eq(id, userId)
      },
      columns: {
        password: false,
      },
    })
    await cache.set(`user:${userId}`, user, user ? 60 * 60 : 60)
    return user
  },
  updateUserProfile: async ({ id, avatar, ...data }: IUserProfileUpdate) => {
    await db.update(userAccount).set(data).where(eq(userAccount.id, id))
    await cache.del(`user:${id}`)
  },
  getUser: async (query: IUserSearch) => await userRepo.find(query),
  oauth: async (userOauth: UserOauth) => {
    const social = await db.query.userSocial.findFirst({
      where({ uuid, source }, { eq, and }) {
        return and(eq(uuid, userOauth.uuid), eq(source, userOauth.source))
      },
    })
    if (social) {
      return await jwt.sign({ id: social.userId })
    }
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const nanoId = customAlphabet(alphabet, 12)
    const uid = nanoId()
    const id = await db.transaction(async (tx) => {
      const [user] = await tx.insert(userAccount)
        .values({
          uid,
          avatar: userOauth.avatar,
          nickname: userOauth.nickname,
        })
        .returning({
          id: userAccount.id,
          uid: userAccount.uid,
        })
      if (!user) {
        throw serviceError(ErrorCode.UNKNOWN_ERROR)
      }
      await tx.insert(userSocial)
        .values({
          userId: user.id,
          uuid: userOauth.uuid.toString(),
          source: userOauth.source,
          accessToken: userOauth.accessToken,
        })
      return user.id
    })
    return await jwt.sign({
      id,
    })
  },
  updateUserAvatar: async ({ id, newAvatar, oldAvatar }: IUserAvatarUpdate) => {
    const { ossPrefix } = useRuntimeConfig()
    const avatar = ossPrefix + newAvatar
    await db.update(userAccount).set({ avatar }).where(eq(userAccount.id, id))
    if (oldAvatar) {
      await OSS.remove(oldAvatar.replace(ossPrefix, ''))
    }
    await cache.del(`user:${id}`)
    return avatar
  },
  getUserBindSocial: async (id: number) => {
    const bindSocial = await db.query.userSocial.findMany({
      where({ userId }, { eq }) {
        return eq(userId, id)
      },
      columns: {
        source: true,
      },
    })
    return bindSocial.map(item => item.source.toUpperCase())
  },
  bindEmail: async ({ email, code, password, id }: IBindEmail) => {
    const verifyCode = await cache.get<string>(`verify:code:${email}`)
    if (!verifyCode || verifyCode !== code) {
      throw serviceError(ErrorCode.VERIFY_CODE_ERROR)
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    await db.update(userAccount).set({
      email,
      password: hashedPassword,
    }).where(eq(userAccount.id, id))
    await cache.del(`verify:code:${email}`)
    await cache.del(`user:${id}`)
  },
  setPassword: async (input: ISetPassword) => {
    const user = await db.query.userAccount.findFirst({
      where({ id }, { eq }) {
        return eq(id, input.id)
      },
    })
    if (!user || user.password !== await bcrypt.hash(input.oldPassword, 12)) {
      throw serviceError(ErrorCode.OLD_PASSWORD_ERROR)
    }
    await db.update(userAccount)
      .set({ password: await bcrypt.hash(input.newPassword, 12) })
      .where(eq(userAccount.id, input.id))
  },
  resetPassword: async ({ email, code, password }: IResetPassword) => {
    const verifyCode = await cache.get<string>(`verify:code:${email}`)
    if (!verifyCode || verifyCode !== code) {
      throw serviceError(ErrorCode.VERIFY_CODE_ERROR)
    }
    const user = await userService.getUser({
      email,
    })
    if (!user) {
      throw serviceError(ErrorCode.EMAIL_NOT_FOUND)
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    await db.update(userAccount)
      .set({
        password: hashedPassword,
      })
      .where(eq(userAccount.email, email))
    await cache.del(`verify:code:${email}`)
  },
  unbindSocial: async ({ id, source }: IUnbindSocial) => {
    const user = await userService.getUserById(id)
    if (user && user.email) {
      await db.delete(userSocial).where(and(eq(userSocial.userId, id), eq(userSocial.source, source)))
    }
    else {
      throw serviceError(ErrorCode.EMAIL_NOT_BIND)
    }
  },
  bindSocial: async (oauthUser: UserOauth, userId: number) => {
    const social = await db.query.userSocial.findFirst({
      where({ uuid, source }, { eq, and }) {
        return and(eq(uuid, oauthUser.uuid), eq(source, oauthUser.source))
      },
    })
    if (social) {
      throw serviceError(ErrorCode.SOCIAL_HAS_BOUND)
    }
    else {
      await db.insert(userSocial).values({
        userId,
        uuid: oauthUser.uuid.toString(),
        source: oauthUser.source,
        accessToken: oauthUser.accessToken,
      })
    }
  },
}
