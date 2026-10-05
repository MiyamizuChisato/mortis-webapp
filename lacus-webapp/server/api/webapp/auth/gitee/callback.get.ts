import type { UserOauth } from '#server/types/user'
import { z } from 'zod'
import { ErrorCode } from '#server/constant/error-code.ts'
import { userService } from '#server/service/user.service.ts'
import { serviceError } from '#server/utils/service-error.ts'

interface GiteeAccessResult {
  access_token: string
  token_type: string
  scope: string
}

interface GiteeUserResult {
  id: number
  login: string
  name: string | null
  avatar_url: string
}

const verifyCodeSchema = z.object({
  code: z.string('code格式不正确'),
  state: z.string('state格式不正确'),
})
const GITEE_ACCESS_URL = 'https://gitee.com/oauth/token'
const GITEE_USER_URL = 'https://gitee.com/api/v5/user'
export default defineEventHandler(async (event) => {
  const { code, state } = await getValidatedQuery(event, body => verifyCodeSchema.parse(body))
  const savedState = getCookie(event, 'state')
  if (!state || !savedState || state !== savedState) {
    throw serviceError(ErrorCode.OAUTH_STATE_ERROR)
  }
  const { giteeClientId: client_id, giteeClientSecret: client_secret, giteeRedirectUri: redirect_uri } = useRuntimeConfig()
  const { access_token } = await $fetch<GiteeAccessResult>(
    GITEE_ACCESS_URL,
    {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: {
        code,
        client_id,
        redirect_uri,
        client_secret,
        grant_type: 'authorization_code',
      },
    },
  )
  const userUrl = new URL(GITEE_USER_URL)
  userUrl.searchParams.set('access_token', access_token)
  const { id, login, avatar_url, name } = await $fetch<GiteeUserResult>(userUrl.toString())
  const oauthUser: UserOauth = {
    uuid: id.toString(),
    nickname: name || login,
    avatar: avatar_url,
    accessToken: access_token,
    source: 'GITEE',
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
