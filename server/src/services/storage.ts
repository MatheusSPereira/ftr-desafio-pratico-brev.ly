import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { env } from '../lib/env'

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
})

export async function uploadToR2(filename: string, content: string): Promise<string> {
  await s3.send(
    new PutObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET,
      Key: filename,
      Body: content,
      ContentType: 'text/csv',
    })
  )
  return `${env.CLOUDFLARE_PUBLIC_URL}/${filename}`
}
