import { apiRequest } from './client'
import type { Link } from './types'

export function listLinks(): Promise<Link[]> {
  return apiRequest<Link[]>('/links')
}

export function createLink(input: { originalUrl: string; slug: string }): Promise<Link> {
  return apiRequest<Link>('/links', { method: 'POST', body: input })
}

export function deleteLink(slug: string): Promise<void> {
  return apiRequest<void>(`/links/${slug}`, { method: 'DELETE' })
}

export function incrementAccess(slug: string): Promise<Link> {
  return apiRequest<Link>(`/links/${slug}/access`, { method: 'PATCH' })
}

export function exportLinks(): Promise<{ url: string }> {
  return apiRequest<{ url: string }>('/links/export')
}
