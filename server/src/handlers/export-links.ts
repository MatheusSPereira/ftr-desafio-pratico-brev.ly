import type { FastifyRequest, FastifyReply } from 'fastify'
import { randomUUID } from 'crypto'
import { db } from '../db'
import { links } from '../db/schema'
import { uploadToR2 } from '../services/storage'

export async function exportLinksHandler(request: FastifyRequest, reply: FastifyReply) {
  const allLinks = await db.select().from(links)

  const header = 'original_url,slug,access_count,created_at'
  const rows = allLinks.map(
    link =>
      `"${link.originalUrl}","${link.slug}",${link.accessCount},"${link.createdAt.toISOString()}"`
  )
  const csv = [header, ...rows].join('\n')

  const filename = `links-export-${randomUUID()}.csv`
  const url = await uploadToR2(filename, csv)

  return reply.send({ url })
}
