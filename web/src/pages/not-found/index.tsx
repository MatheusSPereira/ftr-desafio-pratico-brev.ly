import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
      <h1 className="text-2xl font-bold">404</h1>
      <p>Link não encontrado</p>
      <Link to="/" className="underline">
        Voltar para a home
      </Link>
    </main>
  )
}
