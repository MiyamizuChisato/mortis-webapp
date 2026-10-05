import type { ComposerTranslation } from 'vue-i18n'
import { randomInt } from 'node:crypto'
import { render } from '@vue-email/render'
import { ErrorCode } from '#server/constant/error-code.ts'
import VerifyCode from '#server/template/VerifyCode.vue'
import { transporter } from '#server/utils/mail'

export const mailService = {
  sendVerifyMail: async (email: string, t: ComposerTranslation, locale: string = 'en') => {
    // 首先检查发送次数
    const times = await cache.get<number>(`verify:times:${email}`)
    if (times && times >= 3) {
      throw serviceError(ErrorCode.OPERATE_BUSY)
    }
    // 生成验证码
    const code = randomInt(100000, 1000000).toString()
    await cache.set(`verify:code:${email}`, code, 60 * 10)
    const html = await render(VerifyCode, { code, locale, t })
    await transporter.sendMail({
      html,
      from: 'Mortis<inxposed@qq.com>',
      to: email,
      subject: '[mortis.uno] 电子邮箱验证码',
    })
    // 添加次数
    await cache.set(`verify:times:${email}`, times ? times + 1 : 1, 60 * 60)
  },
}
