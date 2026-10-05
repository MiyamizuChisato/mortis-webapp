import type { ComposerTranslation } from 'vue-i18n'
import { z } from 'zod'

export function getInstantSchema(t: ComposerTranslation) {
  return z.object({
    content: z.string().min(5, t('zod.instant.content')),
    authorId: z.number(),
    confidential: z.boolean(),
    rootId: z.number().optional(),
    referId: z.number().optional(),
    replyId: z.number().optional(),
  })
}
export type IInstant = z.infer<ReturnType<typeof getInstantSchema>>
