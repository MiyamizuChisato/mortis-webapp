import crypto from 'node:crypto'
import { tryUserIdByToken } from '#server/utils/auth.ts'
import { ok } from '#server/utils/response.ts'

const GITEE_OAUTH_URL = 'https://gitee.com/oauth/authorize'
export default defineEventHandler(async (event) => {
  const { giteeClientId, giteeRedirectUri } = useRuntimeConfig()
  const url = new URL(GITEE_OAUTH_URL)
  const state = crypto.randomBytes(32).toString('hex')
  url.searchParams.set('client_id', giteeClientId)
  url.searchParams.set('redirect_uri', giteeRedirectUri)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('state', state)
  await cache.set(`oauth:state:${state}`, await tryUserIdByToken(event), 5 * 60)
  return ok({
    url,
    state,
  })
})
