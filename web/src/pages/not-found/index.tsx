import { Link } from 'react-router-dom'
import notFoundImageUrl from '../../assets/404.svg'

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-200 p-4">
      <div className="flex w-full max-w-[580px] flex-col items-center gap-6 rounded-lg bg-gray-100 px-8 py-12 text-center sm:px-12 sm:py-16">
        <img src={notFoundImageUrl} alt="404" className="h-[85px] w-[194px]" />
        <h1 className="text-2xl font-bold text-gray-600">Link não encontrado</h1>
        <p className="text-sm font-semibold text-gray-500">
          O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba
          mais em{' '}
          <Link to="/" className="text-blue-base underline hover:text-blue-dark">
            brev.ly
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
