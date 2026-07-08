export function LoadingBar() {
  return (
    <div
      className="absolute inset-x-0 top-0 h-0.5 overflow-hidden rounded-t-lg"
      role="progressbar"
      aria-label="Carregando"
    >
      <div className="absolute top-0 h-full w-1/3 animate-loading-bar rounded-full bg-blue-base" />
    </div>
  )
}
