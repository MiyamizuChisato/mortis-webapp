import type { UserOauth } from '#server/types/user'
import { z } from 'zod'
import { ErrorCode } from '#server/constant/error-code.ts'
import { userService } from '#server/service/user.service.ts'
import { serviceError } from '#server/utils/service-error.ts'

interface GithubAccessResult {
  access_token: string
  token_type: string
  scope: string
}

interface GithubUserResult {
  id: number
  login: string
  name: string | null
  avatar_url: string
}

const verifyCodeSchema = z.object({
  code: z.string('code格式不正确'),
  state: z.string('state格式不正确'),
})
const GITHUB_ACCESS_URL = 'https://github.com/login/oauth/access_token'
const GITHUB_USER_URL = 'https://api.github.com/user'
export default defineEventHandler(async (event) => {
  const { code, state } = await getValidatedQuery(event, body => verifyCodeSchema.parse(body))
  const savedState = getCookie(event, 'state')
  if (!state || !savedState || state !== savedState) {
    throw serviceError(ErrorCode.OAUTH_STATE_ERROR)
  }
  const { githubClientId: client_id, githubClientSecret: client_secret, githubRedirectUri: redirect_uri } = useRuntimeConfig()
  const { access_token } = await $fetch<GithubAccessResult>(
    GITHUB_ACCESS_URL,
    {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: {
        code,
        client_id,
        redirect_uri,
        client_secret,
      },
    },
  )
  const { id, name, login, avatar_url } = await $fetch<GithubUserResult>(
    GITHUB_USER_URL,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    },
  )
  const oauthUser: UserOauth = {
    uuid: id.toString(),
    nickname: name || login,
    avatar: avatar_url,
    accessToken: access_token,
    source: 'GITHUB',
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
