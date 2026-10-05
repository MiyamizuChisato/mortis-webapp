import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config()
export default defineConfig({
  dialect: 'postgresql',
  schema: './db/schema/index.ts',
  out: './db/migrations',
  dbCredentials: {
    // url: process.env.NUXT_DATABASE_URL!,
    url: 'postgres://lacus:EAC2HTaQEAK7fPnW@116.62.224.57:5432/lacus',
  },
})
