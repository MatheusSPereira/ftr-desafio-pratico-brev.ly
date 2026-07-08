const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL

export function buildShortUrl(slug: string): string {
  return `${FRONTEND_URL}/${slug}`
}
