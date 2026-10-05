import crypto from 'node:crypto'
import { tryUserIdByToken } from '#server/utils/auth.ts'
import { ok } from '#server/utils/response.ts'

const QQ_OAUTH_URL = 'https://graph.qq.com/oauth2.0/authorize'

export default defineEventHandler(async (event) => {
  const { qqClientId, qqRedirectUri } = useRuntimeConfig()
  const url = new URL(QQ_OAUTH_URL)
  const state = crypto.randomBytes(32).toString('hex')
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('client_id', qqClientId)
  url.searchParams.set('redirect_uri', qqRedirectUri)
  url.searchParams.set('state', state)
  await cache.set(`oauth:state:${state}`, await tryUserIdByToken(event), 5 * 60)
  return ok({
    url,
    state,
  })
})
