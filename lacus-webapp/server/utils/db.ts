import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '../../db/schema'

const globalForDb = globalThis as unknown as {
  client: Pool
}

function createDb() {
  const config = useRuntimeConfig() // Nuxt 提供，服务端可用
  return new Pool({
    connectionString: config.databaseUrl,
  })
}

const client = globalForDb.client ?? createDb()

// eslint-disable-next-line node/prefer-global/process
if (process.env.NODE_ENV !== 'production') {
  globalForDb.client = client
}

export const db = drizzle({ client, schema })
export { client }
