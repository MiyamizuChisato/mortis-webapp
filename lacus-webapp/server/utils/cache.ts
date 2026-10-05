import { redis } from './redis'

export const cache = {
  // 读缓存，自动 JSON 解析
  async get<T>(key: string): Promise<T | null> {
    const val = await redis.get(key)
    if (!val)
      return null
    try {
      return JSON.parse(val) as T
    }
    catch {
      return val as unknown as T
    }
  },

  // 写缓存，自动 JSON 序列化，ttl 单位秒
  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    const str = JSON.stringify(value)
    if (ttl) {
      await redis.set(key, str, 'EX', ttl)
    }
    else {
      await redis.set(key, str)
    }
  },

  // 删缓存
  async del(...keys: string[]): Promise<void> {
    await redis.del(...keys)
  },

  // 缓存穿透保护：有缓存直接返回，没有则执行 fn 并缓存结果
  async remember<T>(key: string, ttl: number, fn: () => Promise<T>): Promise<T> {
    const cached = await cache.get<T>(key)
    if (cached !== null)
      return cached

    const result = await fn()
    await cache.set(key, result, ttl)
    return result
  },

  async has(key: string): Promise<boolean> {
    return await redis.exists(key) > 0
  },
}
