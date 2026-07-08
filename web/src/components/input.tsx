import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import { WarningIcon } from './icons/warning-icon'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, id, className = '', ...props },
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
      <input
        id={inputId}
        ref={ref}
        {...props}
        className={`h-12 rounded-lg border bg-white px-4 text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none ${
          error ? 'border-danger focus:border-danger' : 'border-gray-300 focus:border-blue-base'
        } ${className}`}
      />
      {error && (
        <p className="flex items-center gap-1 text-sm text-gray-500">
          <WarningIcon className="h-4 w-4 shrink-0 text-danger" />
          {error}
        </p>
      )}
    </div>
  )
})
