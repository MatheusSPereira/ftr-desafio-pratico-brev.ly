import { createContext, useCallback, useContext, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type Toast = {
  id: number
  title: string
  description: string
}

type ToastContextValue = {
  showToast: (toast: { title: string; description: string }) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const TOAST_DURATION_MS = 4000

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextIdRef = useRef(0)

  const dismissToast = useCallback((id: number) => {
    setToasts(current => current.filter(toast => toast.id !== id))
  }, [])

  const showToast = useCallback(
    ({ title, description }: { title: string; description: string }) => {
      const id = ++nextIdRef.current
      setToasts(current => [...current, { id, title, description }])
      setTimeout(() => dismissToast(id), TOAST_DURATION_MS)
    },
    [dismissToast]
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4">
        {toasts.map(toast => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto w-full max-w-sm animate-toast-in rounded-lg border border-gray-300 bg-white p-4 shadow-lg"
          >
            <p className="text-sm font-semibold text-gray-600">{toast.title}</p>
            <p className="mt-1 text-sm text-gray-500">{toast.description}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
