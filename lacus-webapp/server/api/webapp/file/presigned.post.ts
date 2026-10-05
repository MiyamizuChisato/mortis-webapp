import { nanoid } from 'nanoid'
import { z } from 'zod'
import { ok } from '#server/utils/response.ts'

const paramSchema = z.object({
  folder: z.string(),
  filename: z.string(),
  contentType: z.string().optional(),
  useDate: z.boolean().default(() => false),
})
export default defineEventHandler(async (event) => {
  const { folder, filename, useDate, contentType } = await readValidatedBody(event, body => paramSchema.parse(body))
  const now = new Date()
  const ext = filename.includes('.') ? filename.substring(filename.lastIndexOf('.')) : ''
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const date = useDate ? `/${year}/${month}/${day}` : ''
  const key = `${folder}${date}/${nanoid()}${ext}`
  return ok(await OSS.signUrl(key, contentType))
})
