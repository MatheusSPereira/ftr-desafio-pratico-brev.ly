import type { FastifyInstance } from 'fastify'
import { createLinkHandler } from '../handlers/create-link'

export async function linksRoutes(app: FastifyInstance) {
  app.post('/links', createLinkHandler)
}
