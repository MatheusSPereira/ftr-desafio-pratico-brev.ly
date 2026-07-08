import { useLinksQuery, useDeleteLink } from '../../hooks/use-links'
import { buildShortUrl } from '../../lib/utils'
import { IconButton } from '../../components/icon-button'
import { CopyIcon } from '../../components/icons/copy-icon'
import { TrashIcon } from '../../components/icons/trash-icon'
import { LinkIcon } from '../../components/icons/link-icon'
import { useToast } from '../../components/toast-provider'

export function LinkList() {
  const { data, isLoading, isError } = useLinksQuery()
  const deleteLink = useDeleteLink()
  const { showToast } = useToast()

  if (isLoading) {
    return <p className="py-6 text-center text-sm text-gray-500">Carregando links...</p>
  }

  if (isError) {
    return <p className="py-6 text-center text-sm text-danger">Não foi possível carregar os links.</p>
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-6">
        <LinkIcon className="h-6 w-6 text-gray-400" />
        <p className="text-center text-xs uppercase tracking-wide text-gray-500">
          ainda não existem links cadastrados
        </p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col divide-y divide-gray-200">
      {data.map(link => (
        <li key={link.id} className="flex items-center gap-5 py-2">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <a
              href={buildShortUrl(link.slug)}
              target="_blank"
              rel="noreferrer"
              className="truncate text-sm font-semibold text-blue-base hover:text-blue-dark"
            >
              {buildShortUrl(link.slug)}
            </a>
            <span className="truncate text-xs text-gray-500">{link.originalUrl}</span>
          </div>
          <span className="shrink-0 text-xs text-gray-500">{link.accessCount} acessos</span>
          <div className="flex shrink-0 gap-1">
            <IconButton
              icon={<CopyIcon className="h-4 w-4" />}
              aria-label="Copiar link encurtado"
              onClick={() =>
                navigator.clipboard
                  .writeText(buildShortUrl(link.slug))
                  .then(() =>
                    showToast({
                      title: 'Link copiado com sucesso',
                      description: `O link ${buildShortUrl(link.slug)} foi copiado para a sua área de transferência`,
                    })
                  )
                  .catch(() => {})
              }
            />
            <IconButton
              icon={<TrashIcon className="h-4 w-4" />}
              aria-label="Excluir link"
              onClick={() => {
                if (window.confirm('Excluir este link?')) {
                  deleteLink.mutate(link.slug)
                }
              }}
              disabled={deleteLink.isPending}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
