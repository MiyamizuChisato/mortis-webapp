// server/utils/jwt.ts
import type { JWTPayload } from 'jose'
import { jwtVerify, SignJWT } from 'jose'

const SECRET = new TextEncoder().encode(useRuntimeConfig().jwtSecret)
const EXPIRES = '1000d'

export interface JwtPayload extends JWTPayload {
  id: number
}

export const jwt = {
  // 生成 token
  async sign(payload: JwtPayload): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(EXPIRES)
      .sign(SECRET)
  },

  // 验证并解析 token
  async verify(token: string): Promise<JwtPayload> {
    try {
      const { payload } = await jwtVerify(token, SECRET)
      return payload as unknown as JwtPayload
    }
    catch {
      throw createError({ statusCode: 401, message: 'Token 无效或已过期' })
    }
  },
}
