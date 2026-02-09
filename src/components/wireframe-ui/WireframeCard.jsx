import { cn } from '../../lib/wireframe-system'

export function WireframeCard({
  title,
  subtitle,
  content,
  children,
  variant = 'light',
  className,
  onClick,
}) {
  return (
    <div
      className={cn(
        'relative border-2 rounded-lg p-4',
        variant === 'dark' && 'bg-wire-bg-dark text-white border-wire-border-dark',
        variant === 'light' && 'bg-white border-wire-border',
        variant === 'muted' && 'bg-wire-bg-muted border-wire-border',
        onClick && 'cursor-pointer hover:border-gray-400 transition-colors',
        className
      )}
      onClick={onClick}
    >
      {title && <div className="text-sm font-semibold mb-1">{title}</div>}
      {subtitle && <div className="text-xs text-wire-text-muted mb-3">{subtitle}</div>}
      {content}
      {children}
    </div>
  )
}
