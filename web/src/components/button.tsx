import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  icon?: ReactNode
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-base px-6 py-3 text-base text-white hover:bg-blue-dark',
  secondary:
    'border border-transparent bg-gray-200 px-4 py-2 text-sm text-gray-500 hover:border-blue-base',
}

export function Button({
  variant = 'primary',
  icon,
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {icon}
      {children}
    </button>
  )
}
