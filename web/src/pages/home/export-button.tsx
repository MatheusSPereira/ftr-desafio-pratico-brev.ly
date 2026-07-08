import { useState } from 'react'
import { useExportLinks } from '../../hooks/use-links'
import { Button } from '../../components/button'

export function ExportButton() {
  const exportLinks = useExportLinks()
  const [exportError, setExportError] = useState<string | null>(null)

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
      <Button variant="secondary" onClick={handleExport} disabled={exportLinks.isPending}>
        {exportLinks.isPending ? 'Exportando...' : 'Exportar CSV'}
      </Button>
      {exportError && <p className="text-sm text-danger">{exportError}</p>}
    </div>
  )
}
