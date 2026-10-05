import { z } from 'zod'

export const roleSchema = z.object({
  roleName: z.string(),
})
export type IRole = z.infer<typeof roleSchema>
