import type { H3Event } from '#imports'
import { ErrorCode } from '#server/constant/error-code.ts'
import { serviceError } from '#server/utils/service-error.ts'

export async function checkToken(event: H3Event<EventHandlerRequest>, userId: number) {
  const token = getHeader(event, 'authorization')
  if (!token) {
    throw serviceError(ErrorCode.TOKEN_NOT_FOUND)
  }
  const { id } = await jwt.verify(token)
  if (id !== userId) {
    throw serviceError(ErrorCode.TOKEN_MISMATCH)
  }
}
export async function getUserIdByToken(event: H3Event<EventHandlerRequest>) {
  const token = getHeader(event, 'authorization')
  if (token) {
    const { id } = await jwt.verify(token.replace('Bearer ', ''))
    return id
  }
  else {
    throw serviceError(ErrorCode.TOKEN_NOT_FOUND)
  }
}

export async function tryUserIdByToken(event: H3Event<EventHandlerRequest>) {
  try {
    return await getUserIdByToken(event)
  }
  catch {
    return null
  }
}
