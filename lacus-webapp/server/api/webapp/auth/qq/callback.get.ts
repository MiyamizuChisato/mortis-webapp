import type { UserOauth } from '#server/types/user'
import { z } from 'zod'
import { ErrorCode } from '#server/constant/error-code.ts'
import { userService } from '#server/service/user.service.ts'
import { serviceError } from '#server/utils/service-error.ts'

interface QQUserResult {
  nickname: string
  figureurl_qq_1: string
  figureurl_qq_2?: string
}

const verifyCodeSchema = z.object({
  code: z.string('code格式不正确'),
  state: z.string('state格式不正确'),
})
const QQ_ACCESS_URL = 'https://graph.qq.com/oauth2.0/token'
const QQ_USER_URL = 'https://graph.qq.com/user/get_user_info'
export default defineEventHandler(async (event) => {
  const { code, state } = await getValidatedQuery(event, body => verifyCodeSchema.parse(body))
  const savedState = getCookie(event, 'state')
  if (!state || !savedState || state !== savedState) {
    throw serviceError(ErrorCode.OAUTH_STATE_ERROR)
  }
  const { qqClientId: client_id, qqClientSecret: client_secret, qqRedirectUri: redirect_uri } = useRuntimeConfig()
  const accessResult = await $fetch<string>(
    QQ_ACCESS_URL,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      query: {
        code,
        client_id,
        redirect_uri,
        client_secret,
        need_openid: 1,
        fmt: 'json',
        grant_type: 'authorization_code',
      },
    },
  )
  const { access_token, openid } = JSON.parse(accessResult)
  const { nickname, figureurl_qq_1, figureurl_qq_2 } = await $fetch<QQUserResult>(
    QQ_USER_URL,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      query: {
        access_token,
        openid,
        oauth_consumer_key: client_id,
      },
    },
  )
  const oauthUser: UserOauth = {
    uuid: openid,
    nickname,
    avatar: figureurl_qq_2 || figureurl_qq_1,
    accessToken: access_token,
    source: 'QQ',
  }
  deleteCookie(event, 'state')
  const userId = await cache.get<number>(`oauth:state:${state}`)
  if (userId) {
    await userService.bindSocial(oauthUser, userId)
  }
  else {
    setCookie(event, 'token', await userService.oauth(oauthUser), {
      maxAge: 60 * 60 * 24 * 30 * 24,
    })
  }
  const locale = getCookie(event, 'i18n_redirected')
  await sendRedirect(event, `/${locale}/oauth/success`, 302)
})
