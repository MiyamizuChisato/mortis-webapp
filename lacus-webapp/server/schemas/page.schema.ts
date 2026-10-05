import { z } from 'zod'

export const pageSchema = z.object({
  page: z.coerce.number().int().optional().default(1),
  size: z.coerce.number().int().min(1).max(100).optional().default(5),
})
export const idSchema = z.object({
  id: z.coerce.number().int(),
})
export type PageSchema = z.infer<typeof pageSchema>
export type IdSchema = z.infer<typeof idSchema>
