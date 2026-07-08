import { LinkForm } from './link-form'
import { LinkList } from './link-list'
import { ExportButton } from './export-button'

export function HomePage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 p-4">
      <h1 className="text-xl font-bold text-gray-600">Brev.ly</h1>
      <LinkForm />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-gray-600">Meus links</h2>
        <ExportButton />
      </div>
      <LinkList />
    </main>
  )
}
