import { LinkForm } from './link-form'
import { LinkList } from './link-list'

export function HomePage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 p-4">
      <h1 className="text-xl font-bold">Brev.ly</h1>
      <LinkForm />
      <h2 className="text-lg font-semibold">Meus links</h2>
      <LinkList />
    </main>
  )
}
