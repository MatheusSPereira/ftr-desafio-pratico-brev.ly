import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { db } from '../db'
import { links } from '../db/schema'

const bodySchema = z.object({
  originalUrl: z.string().url(),
  slug: z.string().regex(/^[a-zA-Z0-9-]{3,50}$/, {
    message: 'Slug must be 3–50 characters: letters, numbers, or hyphens only',
  }),
})

export async function createLinkHandler(request: FastifyRequest, reply: FastifyReply) {
  const result = bodySchema.safeParse(request.body)

  if (!result.success) {
    return reply.status(400).send({ error: result.error.flatten() })
  }

  const { originalUrl, slug } = result.data

  const existing = await db
    .select({ id: links.id })
    .from(links)
    .where(eq(links.slug, slug))
    .limit(1)

  if (existing.length > 0) {
    return reply.status(409).send({ error: 'Slug already exists' })
  }

  const [link] = await db
    .insert(links)
    .values({ originalUrl, slug })
    .returning()

  return reply.status(201).send(link)
}
