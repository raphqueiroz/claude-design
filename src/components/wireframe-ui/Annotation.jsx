import { cn } from '../../lib/wireframe-system'

const colors = {
  add: 'bg-wire-annotation-add border-green-300 text-green-800',
  change: 'bg-wire-annotation-change border-yellow-300 text-yellow-800',
  remove: 'bg-wire-annotation-remove border-red-300 text-red-800',
  note: 'bg-wire-annotation-note border-blue-300 text-blue-800',
}

const positions = {
  'top-right': '-top-2 -right-2',
  'top-left': '-top-2 -left-2',
  'bottom-right': '-bottom-2 -right-2',
  'bottom-left': '-bottom-2 -left-2',
}

export function Annotation({ type = 'note', children, position = 'top-right', className }) {
  return (
    <div
      className={cn(
        'absolute text-[11px] leading-tight px-2 py-1 rounded border font-medium max-w-[200px] z-10 shadow-sm',
        colors[type],
        positions[position],
        className
      )}
    >
      {children}
    </div>
  )
}
