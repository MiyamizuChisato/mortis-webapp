import crypto from 'node:crypto'
import { tryUserIdByToken } from '#server/utils/auth.ts'
import { ok } from '#server/utils/response.ts'

const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'

export default defineEventHandler(async (event) => {
  const { githubClientId, githubRedirectUri } = useRuntimeConfig()
  const url = new URL(GITHUB_OAUTH_URL)
  const state = crypto.randomBytes(32).toString('hex')
  url.searchParams.set('client_id', githubClientId)
  url.searchParams.set('redirect_uri', githubRedirectUri)
  url.searchParams.set('state', state)
  await cache.set(`oauth:state:${state}`, await tryUserIdByToken(event), 5 * 60)
  return ok({
    url,
    state,
  })
})
