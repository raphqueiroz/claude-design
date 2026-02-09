import { cn, formatCurrency } from '../../lib/wireframe-system'

export function WireframeBalance({
  label,
  value,
  currency = 'US$',
  size = 'md',
  trend,
  className,
}) {
  const sizes = {
    sm: { label: 'text-xs', value: 'text-lg' },
    md: { label: 'text-sm', value: 'text-2xl' },
    lg: { label: 'text-sm', value: 'text-3xl' },
  }

  return (
    <div className={cn('relative', className)}>
      {label && (
        <div className={cn('text-wire-text-muted mb-1', sizes[size].label)}>{label}</div>
      )}
      <div className={cn('font-bold tracking-tight', sizes[size].value)}>
        {formatCurrency(value, currency)}
      </div>
      {trend && (
        <div
          className={cn(
            'text-xs mt-1 font-medium',
            trend.type === 'up' && 'text-green-600',
            trend.type === 'down' && 'text-red-600',
            trend.type === 'neutral' && 'text-wire-text-muted'
          )}
        >
          {trend.type === 'up' && '↑ '}
          {trend.type === 'down' && '↓ '}
          {trend.label}
        </div>
      )}
    </div>
  )
}
