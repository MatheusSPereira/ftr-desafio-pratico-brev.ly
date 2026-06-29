import type { FastifyRequest, FastifyReply } from 'fastify'
import { randomUUID } from 'crypto'
import { db } from '../db'
import { links } from '../db/schema'
import { uploadToR2 } from '../services/storage'

function escapeCSV(value: string): string {
  return '"' + value.replace(/"/g, '""') + '"'
}

export async function exportLinksHandler(request: FastifyRequest, reply: FastifyReply) {
  const allLinks = await db.select().from(links)

  const header = 'original_url,slug,access_count,created_at'
  const rows = allLinks.map(
    link =>
      `${escapeCSV(link.originalUrl)},${escapeCSV(link.slug)},${link.accessCount},${escapeCSV(link.createdAt.toISOString())}`
  )
  const csv = [header, ...rows].join('\n')

  const filename = `links-export-${randomUUID()}.csv`

  let url: string
  try {
    url = await uploadToR2(filename, csv)
  } catch (err) {
    request.log.error(err, 'Failed to upload CSV to R2')
    return reply.status(500).send({ error: 'Failed to export links: storage upload failed' })
  }

  return reply.send({ url })
}
