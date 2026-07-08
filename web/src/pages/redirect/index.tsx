import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useIncrementAccess } from '../../hooks/use-links'
import { ApiError } from '../../api/client'
import { NotFoundPage } from '../not-found'
import logoIconUrl from '../../assets/Logo_Icon.svg'

export function RedirectPage() {
  const { slug } = useParams<{ slug: string }>()
  const { isSuccess, data, isError, error } = useIncrementAccess(slug)

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
      <main className="flex min-h-screen items-center justify-center bg-gray-200 p-4">
        <p className="text-sm text-gray-500">Não foi possível redirecionar. Tente novamente mais tarde.</p>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-200 p-4">
      <div className="flex w-full max-w-[580px] flex-col items-center gap-6 rounded-lg bg-gray-100 px-8 py-12 text-center sm:px-12 sm:py-16">
        <img src={logoIconUrl} alt="" className="size-12" />
        <h1 className="text-2xl font-bold text-gray-600">Redirecionando...</h1>
        <div className="flex flex-col items-center gap-1 text-sm font-semibold text-gray-500">
          <p>O link será aberto automaticamente em alguns instantes.</p>
          <p>
            Não foi redirecionado?{' '}
            <a href={data?.originalUrl} className="text-blue-base underline hover:text-blue-dark">
              Acesse aqui
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
