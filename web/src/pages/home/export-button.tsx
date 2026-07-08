import { useState } from 'react'
import { useExportLinks, useLinksQuery } from '../../hooks/use-links'
import { Button } from '../../components/button'
import { DownloadIcon } from '../../components/icons/download-icon'

export function ExportButton() {
  const exportLinks = useExportLinks()
  const { data } = useLinksQuery()
  const [exportError, setExportError] = useState<string | null>(null)
  const isEmpty = !data || data.length === 0

  function handleExport() {
    setExportError(null)
    const newWindow = window.open('', '_blank')
    exportLinks.mutate(undefined, {
      onSuccess: ({ url }) => {
        if (newWindow) {
          newWindow.location.href = url
        }
      },
      onError: () => {
        newWindow?.close()
        setExportError('Não foi possível exportar os links. Tente novamente.')
      },
    })
  }

  return (
    <div className="flex flex-col gap-1">
      <Button
        variant="secondary"
        icon={<DownloadIcon className="h-4 w-4" />}
        onClick={handleExport}
        disabled={exportLinks.isPending || isEmpty}
      >
        {exportLinks.isPending ? 'Exportando...' : 'Baixar CSV'}
      </Button>
      {exportError && <p className="text-sm text-danger">{exportError}</p>}
    </div>
  )
}
