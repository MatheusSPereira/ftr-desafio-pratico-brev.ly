const BASE_URL = import.meta.env.VITE_BACKEND_URL

export class ApiError extends Error {
  status: number
  payload: unknown

  constructor(status: number, payload: unknown) {
    super(`Request failed with status ${status}`)
    this.status = status
    this.payload = payload
  }
}

type Method = 'GET' | 'POST' | 'DELETE' | 'PATCH'

type RequestOptions = {
  method?: Method
  body?: unknown
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: options.body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  })

  if (response.status === 204) {
    return undefined as T
  }

  const payload = await response.json().catch(() => undefined)

  if (!response.ok) {
    throw new ApiError(response.status, payload)
  }

  return payload as T
}
