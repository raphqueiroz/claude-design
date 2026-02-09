import { cn } from '../../lib/wireframe-system'
import { Search } from 'lucide-react'

export function WireframeInput({ placeholder, icon, className }) {
  return (
    <div className={cn('relative', className)}>
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-wire-text-muted">
          {icon}
        </div>
      )}
      <div
        className={cn(
          'w-full border-2 border-wire-border rounded-lg px-3 py-2 text-sm text-wire-text-muted bg-white',
          icon && 'pl-9'
        )}
      >
        {placeholder}
      </div>
    </div>
  )
}

export function WireframeSearchBar({ placeholder = 'Buscar...', className }) {
  return <WireframeInput placeholder={placeholder} icon={<Search size={16} />} className={className} />
}
