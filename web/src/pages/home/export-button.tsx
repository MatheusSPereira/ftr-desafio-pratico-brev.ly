import { useState } from 'react'
import { useExportLinks } from '../../hooks/use-links'

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
      <button type="button" onClick={handleExport} disabled={exportLinks.isPending} className="border p-2 disabled:opacity-50">
        {exportLinks.isPending ? 'Exportando...' : 'Exportar CSV'}
      </button>
      {exportError && <p className="text-sm text-red-600">{exportError}</p>}
    </div>
  )
}
