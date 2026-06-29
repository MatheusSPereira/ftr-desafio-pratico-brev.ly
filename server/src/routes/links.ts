import type { FastifyInstance } from 'fastify'
import { createLinkHandler } from '../handlers/create-link'
import { listLinksHandler } from '../handlers/list-links'
import { getLinkHandler } from '../handlers/get-link'
import { deleteLinkHandler } from '../handlers/delete-link'

export async function linksRoutes(app: FastifyInstance) {
  app.post('/links', createLinkHandler)
  app.get('/links', listLinksHandler)
  app.get('/links/:slug', getLinkHandler)
  app.delete('/links/:slug', deleteLinkHandler)
}
