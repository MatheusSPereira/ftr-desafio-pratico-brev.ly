import type { ButtonHTMLAttributes, ReactNode } from 'react'

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> & {
  icon: ReactNode
  'aria-label': string
}

export function IconButton({
  icon,
  className = '',
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={`inline-flex size-8 items-center justify-center rounded border border-transparent bg-gray-200 text-gray-600 transition-colors hover:border-blue-base disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {icon}
    </button>
  )
}
