import { useLinksQuery, useDeleteLink } from '../../hooks/use-links'
import { buildShortUrl } from '../../lib/utils'
import { Button } from '../../components/button'
import { IconButton } from '../../components/icon-button'
import { CopyIcon } from '../../components/icons/copy-icon'

export function LinkList() {
  const { data, isLoading, isError } = useLinksQuery()
  const deleteLink = useDeleteLink()

  if (isLoading) {
    return <p className="text-gray-500">Carregando links...</p>
  }

  if (isError) {
    return <p className="text-danger">Não foi possível carregar os links.</p>
  }

  if (!data || data.length === 0) {
    return <p className="text-gray-500">Ainda não existem links cadastrados.</p>
  }

  return (
    <ul className="flex flex-col gap-2">
      {data.map(link => (
        <li
          key={link.id}
          className="flex flex-col gap-1 border-b border-gray-200 pb-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-col">
            <a
              href={buildShortUrl(link.slug)}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-base underline hover:text-blue-dark"
            >
              {buildShortUrl(link.slug)}
            </a>
            <span className="text-sm text-gray-500">{link.originalUrl}</span>
            <span className="text-xs text-gray-400">{link.accessCount} acessos</span>
          </div>
          <div className="flex gap-2">
            <IconButton
              icon={<CopyIcon className="h-4 w-4" />}
              aria-label="Copiar link encurtado"
              onClick={() => navigator.clipboard.writeText(buildShortUrl(link.slug)).catch(() => {})}
            />
            <Button
              variant="secondary"
              className="text-danger hover:border-danger"
              onClick={() => {
                if (window.confirm('Excluir este link?')) {
                  deleteLink.mutate(link.slug)
                }
              }}
              disabled={deleteLink.isPending}
            >
              Excluir
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
