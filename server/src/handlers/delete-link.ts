import type { FastifyRequest, FastifyReply } from 'fastify'
import { eq } from 'drizzle-orm'
import { db } from '../db'
import { links } from '../db/schema'

type Params = { slug: string }

export async function deleteLinkHandler(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
) {
  const { slug } = request.params

  const deleted = await db
    .delete(links)
    .where(eq(links.slug, slug))
    .returning({ id: links.id })

  if (deleted.length === 0) {
    return reply.status(404).send({ error: 'Link not found' })
  }

  return reply.status(204).send()
}
