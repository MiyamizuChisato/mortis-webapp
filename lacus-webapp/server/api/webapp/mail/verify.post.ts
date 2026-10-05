import { z } from 'zod'
import { mailService } from '#server/service/mail.service.ts'
import { ok } from '#server/utils/response.ts'

const paramSchema = z.object({
  email: z.email('邮箱格式不正确'),
})
export default defineEventHandler(async (event) => {
  const locale = getCookie(event, 'i18n_redirected')
  const { email } = await readValidatedBody(event, body => paramSchema.parse(body))
  const t = await useTranslation(event)
  return ok(await mailService.sendVerifyMail(email, t, locale))
})
