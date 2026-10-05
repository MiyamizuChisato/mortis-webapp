import { S3Client } from '@aws-sdk/client-s3'

const globalForS3 = globalThis as unknown as {
  s3: S3Client | undefined
}

function createS3() {
  const {
    ossEndpoint: endpoint,
    ossAccessKeyId: accessKeyId,
    ossSecretAccessKey: secretAccessKey,
    ossRegion: region,
  } = useRuntimeConfig()
  return new S3Client({
    region,
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })
}

const s3 = globalForS3.s3 ?? createS3()

// eslint-disable-next-line node/prefer-global/process
if (process.env.NODE_ENV !== 'production') {
  globalForS3.s3 = s3
}

export { s3 }
