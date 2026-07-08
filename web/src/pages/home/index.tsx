import { LinkForm } from './link-form'

export function HomePage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 p-4">
      <h1 className="text-xl font-bold">Brev.ly</h1>
      <LinkForm />
    </main>
  )
}
