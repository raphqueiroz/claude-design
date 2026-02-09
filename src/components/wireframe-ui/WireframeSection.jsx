import { cn } from '../../lib/wireframe-system'
import { ChevronRight } from 'lucide-react'

export function WireframeSection({ title, action, children, className }) {
  return (
    <div className={cn('mb-4', className)}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-2">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {action && (
            <button className="text-xs text-wire-text-muted hover:text-wire-text-primary flex items-center gap-0.5 transition-colors">
              {action} <ChevronRight size={12} />
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
