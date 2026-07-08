import { Logo } from '../../components/logo'
import { LinkForm } from './link-form'
import { LinkList } from './link-list'
import { ExportButton } from './export-button'

export function HomePage() {
  return (
    <main className="min-h-screen bg-gray-200 px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="sr-only">Brev.ly</h1>
      <div className="mx-auto flex max-w-[980px] flex-col gap-6">
        <Logo />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
          <section className="flex w-full flex-col gap-6 rounded-lg bg-gray-100 p-8 lg:w-[380px] lg:shrink-0">
            <h2 className="text-lg font-bold text-gray-600">Novo link</h2>
            <LinkForm />
          </section>
          <section className="flex w-full min-w-0 flex-col gap-5 rounded-lg bg-gray-100 p-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-gray-600">Meus links</h2>
              <ExportButton />
            </div>
            <LinkList />
          </section>
        </div>
      </div>
    </main>
  )
}
