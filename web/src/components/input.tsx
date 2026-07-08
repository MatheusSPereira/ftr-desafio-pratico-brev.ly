import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import { WarningIcon } from './icons/warning-icon'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  prefix?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, id, className = '', prefix, ...props },
  ref
) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className={`text-[10px] uppercase tracking-wide ${error ? 'text-danger' : 'text-gray-500'}`}
      >
        {label}
      </label>
      <div
        className={`flex h-12 items-center gap-1 rounded-lg border bg-white px-4 ${
          error ? 'border-danger focus-within:border-danger' : 'border-gray-300 focus-within:border-blue-base'
        } ${className}`}
      >
        {prefix && <span className="shrink-0 text-sm text-gray-400">{prefix}</span>}
        <input
          id={inputId}
          ref={ref}
          {...props}
          className="w-full min-w-0 border-0 bg-transparent p-0 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-0"
        />
      </div>
      {error && (
        <p className="flex items-center gap-1 text-sm text-gray-500">
          <WarningIcon className="h-4 w-4 shrink-0 text-danger" />
          {error}
        </p>
      )}
    </div>
  )
})
