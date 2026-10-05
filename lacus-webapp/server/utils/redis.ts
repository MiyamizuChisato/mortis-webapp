import Redis from 'ioredis'

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined
}

function createRedis() {
  const config = useRuntimeConfig()

  const redis = new Redis(config.redisUrl, {
    maxRetriesPerRequest: 3,
    lazyConnect: true, // 用到时才真正连接
    connectTimeout: 10000,
  })

  redis.on('error', err => console.error('[Redis] 连接错误', err))

  return redis
}

const redis = globalForRedis.redis ?? createRedis()

// eslint-disable-next-line node/prefer-global/process
if (process.env.NODE_ENV !== 'production') {
  globalForRedis.redis = redis
}

export { redis }
