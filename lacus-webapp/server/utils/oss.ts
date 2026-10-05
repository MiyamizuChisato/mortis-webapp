import type { StreamingBlobPayloadInputTypes } from '@smithy/types'
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const OSS = {
  async signUrl(
    Key: string,
    ContentType?: string,
  ) {
    const { ossBucket: Bucket } = useRuntimeConfig()
    const command = new PutObjectCommand({
      Bucket,
      Key,
      ContentType,
    })
    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 60 * 5,
    })
    return {
      key: Key,
      url: uploadUrl,
    }
  },
  async remove(Key: string) {
    const { ossBucket: Bucket } = useRuntimeConfig()
    return await s3.send(
      new DeleteObjectCommand({
        Key,
        Bucket,
      }),
    )
  },
  async save(
    Key: string,
    Body: StreamingBlobPayloadInputTypes,
    ContentType?: string,
  ) {
    const { ossBucket: Bucket } = useRuntimeConfig()
    return await s3.send(
      new PutObjectCommand({
        Bucket,
        Key,
        Body,
        ContentType,
      }),
    )
  },
}
