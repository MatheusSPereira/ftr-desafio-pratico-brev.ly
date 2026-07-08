import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useIncrementAccess } from '../../hooks/use-links'
import { ApiError } from '../../api/client'
import { NotFoundPage } from '../not-found'

export function RedirectPage() {
  const { slug } = useParams<{ slug: string }>()
  const { mutate, isPending, isError, isSuccess, data, error } = useIncrementAccess()

  useEffect(() => {
    if (slug) {
      mutate(slug)
    }
  }, [slug, mutate])

  useEffect(() => {
    if (isSuccess && data) {
      window.location.href = data.originalUrl
    }
  }, [isSuccess, data])

  if (isError) {
    if (error instanceof ApiError && error.status === 404) {
      return <NotFoundPage />
    }
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
        <p>Não foi possível redirecionar. Tente novamente mais tarde.</p>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
      <p>{isPending ? 'Redirecionando...' : 'Redirecionando...'}</p>
    </main>
  )
}
