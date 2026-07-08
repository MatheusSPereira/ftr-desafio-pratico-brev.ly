import { useExportLinks } from '../../hooks/use-links'

export function ExportButton() {
  const exportLinks = useExportLinks()

  function handleExport() {
    exportLinks.mutate(undefined, {
      onSuccess: ({ url }) => {
        window.open(url, '_blank')
      },
    })
  }

  return (
    <button type="button" onClick={handleExport} disabled={exportLinks.isPending} className="border p-2 disabled:opacity-50">
      {exportLinks.isPending ? 'Exportando...' : 'Exportar CSV'}
    </button>
  )
}
