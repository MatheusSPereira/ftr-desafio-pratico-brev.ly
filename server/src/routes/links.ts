import type { FastifyInstance } from 'fastify'
import { createLinkHandler } from '../handlers/create-link'
import { listLinksHandler } from '../handlers/list-links'
import { exportLinksHandler } from '../handlers/export-links'
import { getLinkHandler } from '../handlers/get-link'
import { deleteLinkHandler } from '../handlers/delete-link'
import { incrementAccessHandler } from '../handlers/increment-access'
import {
  createLinkSchema,
  listLinksSchema,
  exportLinksSchema,
  getLinkSchema,
  deleteLinkSchema,
  incrementAccessSchema,
} from '../schemas/links'

export async function linksRoutes(app: FastifyInstance) {
  app.post('/links', { schema: createLinkSchema }, createLinkHandler)
  app.get('/links', { schema: listLinksSchema }, listLinksHandler)
  app.get('/links/export', { schema: exportLinksSchema }, exportLinksHandler)
  app.get('/links/:slug', { schema: getLinkSchema }, getLinkHandler)
  app.delete('/links/:slug', { schema: deleteLinkSchema }, deleteLinkHandler)
  app.patch('/links/:slug/access', { schema: incrementAccessSchema }, incrementAccessHandler)
}
