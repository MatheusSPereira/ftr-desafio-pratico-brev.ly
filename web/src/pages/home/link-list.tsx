import { useLinksQuery, useDeleteLink } from '../../hooks/use-links'
import { buildShortUrl } from '../../lib/utils'

export function LinkList() {
  const { data, isLoading, isError } = useLinksQuery()
  const deleteLink = useDeleteLink()

  if (isLoading) {
    return <p>Carregando links...</p>
  }

  if (isError) {
    return <p className="text-red-600">Não foi possível carregar os links.</p>
  }

  if (!data || data.length === 0) {
    return <p>Ainda não existem links cadastrados.</p>
  }

  return (
    <ul className="flex flex-col gap-2">
      {data.map(link => (
        <li key={link.id} className="flex flex-col gap-1 border-b pb-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <a href={buildShortUrl(link.slug)} target="_blank" rel="noreferrer" className="font-medium underline">
              {buildShortUrl(link.slug)}
            </a>
            <span className="text-sm text-gray-600">{link.originalUrl}</span>
            <span className="text-xs text-gray-500">{link.accessCount} acessos</span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(buildShortUrl(link.slug)).catch(() => {})}
              className="border p-2 text-sm"
            >
              Copiar
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Excluir este link?')) {
                  deleteLink.mutate(link.slug)
                }
              }}
              disabled={deleteLink.isPending}
              className="border p-2 text-sm text-red-600 disabled:opacity-50"
            >
              Excluir
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
