import { z } from 'zod'
import { ok } from '#server/utils/response.ts'

const paramSchema = z.object({
  key: z.string(),
})
export default defineEventHandler(async (event) => {
  const { key } = await getValidatedQuery(event, body => paramSchema.parse(body))
  ok(await OSS.remove(key))
})
