import { cn } from '../../lib/wireframe-system'

export function WireframeList({ items, className }) {
  return (
    <div className={cn('divide-y divide-wire-border', className)}>
      {items.map((item, i) => (
        <WireframeListItem key={i} {...item} />
      ))}
    </div>
  )
}

export function WireframeListItem({
  icon,
  title,
  subtitle,
  right,
  rightSub,
  rightColor,
  className,
}) {
  return (
    <div className={cn('flex items-center gap-3 py-3', className)}>
      {icon && (
        <div className="w-9 h-9 rounded-full bg-gray-100 border border-wire-border flex items-center justify-center text-wire-text-muted shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{title}</div>
        {subtitle && <div className="text-xs text-wire-text-muted">{subtitle}</div>}
      </div>
      {right && (
        <div className="text-right shrink-0">
          <div className={cn('text-sm font-semibold', rightColor)}>{right}</div>
          {rightSub && <div className="text-xs text-wire-text-muted">{rightSub}</div>}
        </div>
      )}
    </div>
  )
}
