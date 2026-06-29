import type { FastifyRequest, FastifyReply } from 'fastify'
import { eq } from 'drizzle-orm'
import { db } from '../db'
import { links } from '../db/schema'

type Params = { slug: string }

export async function getLinkHandler(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
) {
  const { slug } = request.params

  const [link] = await db
    .select({ originalUrl: links.originalUrl })
    .from(links)
    .where(eq(links.slug, slug))
    .limit(1)

  if (!link) {
    return reply.status(404).send({ error: 'Link not found' })
  }

  return reply.send({ originalUrl: link.originalUrl })
}
