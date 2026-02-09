import { cn } from '../../lib/wireframe-system'

const variants = {
  primary: 'bg-wire-bg-dark text-white border-wire-border-dark hover:bg-gray-700',
  secondary: 'bg-white text-wire-text-primary border-wire-border hover:bg-gray-50',
  ghost: 'bg-transparent text-wire-text-secondary border-transparent hover:bg-gray-100',
  outline: 'bg-transparent text-wire-text-primary border-wire-border hover:bg-gray-50',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function WireframeButton({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className,
  onClick,
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg border-2 font-medium transition-colors',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        disabled && 'opacity-40 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
