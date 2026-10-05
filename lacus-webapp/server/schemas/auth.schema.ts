import type { ComposerTranslation } from 'vue-i18n'
import { z } from 'zod'

const password = /^(?=.*[A-Z])(?=.*\d).{8,16}$/i
export function getLoginSchema(t: ComposerTranslation) {
  return z.object({
    email: z.email(t('zod.user.email')),
    password: z.string().regex(password, t('zod.user.password')),
  })
}
export function getRegisterSchema(t: ComposerTranslation) {
  return z.object({
    nickname: z.string().max(8, t('zod.user.nickname')),
    email: z.email(t('zod.user.email')),
    code: z.string().length(6, t('zod.user.code')),
    password: z.string().regex(password, t('zod.user.password')),
    surePassword: z.string(),
  }).refine(({ password, surePassword }) => password === surePassword, {
    message: t('zod.user.pwd'),
    path: ['surePassword'],
  })
}

export function getServerSetPasswordSchema(t: ComposerTranslation) {
  return getClientSetPasswordSchema(t).extend({
    id: z.number(),
  })
}
export function getClientSetPasswordSchema(t: ComposerTranslation) {
  return z.object({
    oldPassword: z.string().regex(password, t('zod.user.password')),
    newPassword: z.string().regex(password, t('zod.user.password')),
    surePassword: z.string(),
  }).refine(({ newPassword, surePassword }) => newPassword === surePassword, {
    message: t('zod.user.pwd'),
    path: ['surePassword'],
  })
}

export function getResetPasswordSchema(t: ComposerTranslation) {
  return z.object({
    email: z.email(t('zod.user.email')),
    code: z.string().length(6, t('zod.user.code')),
    password: z.string().regex(password, t('zod.user.password')),
    surePassword: z.string(),
  }).refine(({ password, surePassword }) => password === surePassword, {
    message: t('zod.user.pwd'),
    path: ['surePassword'],
  })
}
export function getClientBindEmailSchema(t: ComposerTranslation) {
  return getResetPasswordSchema(t)
}
export function getServerBindEmailSchema(t: ComposerTranslation) {
  return getClientBindEmailSchema(t).extend({
    id: z.number(),
  })
}

export type IRegister = z.infer<ReturnType<typeof getRegisterSchema>>
export type ILogin = z.infer<ReturnType<typeof getLoginSchema>>
export type ISetPassword = z.infer<ReturnType<typeof getServerSetPasswordSchema>>
export type IResetPassword = z.infer<ReturnType<typeof getResetPasswordSchema>>
export type IBindEmail = z.infer<ReturnType<typeof getServerBindEmailSchema>>
