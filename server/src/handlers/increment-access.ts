import type { FastifyRequest, FastifyReply } from 'fastify'
import { eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { links } from '../db/schema'

type Params = { slug: string }

export async function incrementAccessHandler(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
) {
  const { slug } = request.params

  const [updated] = await db
    .update(links)
    .set({ accessCount: sql`${links.accessCount} + 1` })
    .where(eq(links.slug, slug))
    .returning()

  if (!updated) {
    return reply.status(404).send({ error: 'Link not found' })
  }

  return reply.send(updated)
}
