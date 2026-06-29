import type { FastifyInstance } from 'fastify'
import { createLinkHandler } from '../handlers/create-link'
import { listLinksHandler } from '../handlers/list-links'

export async function linksRoutes(app: FastifyInstance) {
  app.post('/links', createLinkHandler)
  app.get('/links', listLinksHandler)
}
