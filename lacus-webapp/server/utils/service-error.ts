import type { ErrorCode } from '#server/constant/error-code.ts'

export function serviceError(message: ErrorCode) {
  return createError(String(message))
}
