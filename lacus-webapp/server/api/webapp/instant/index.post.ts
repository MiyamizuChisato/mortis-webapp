import { getInstantSchema } from '#server/schemas/instant.schema.ts'
import { instantService } from '#server/service/instant.service.ts'
import { ok } from '#server/utils/response.ts'

export default defineEventHandler(async (event) => {
  const schema = getInstantSchema(await useTranslation(event))
  const body = await readValidatedBody(event, body => schema.parse(body))
  await checkToken(event, body.authorId)
  return ok(await instantService.saveInstant(body))
})
