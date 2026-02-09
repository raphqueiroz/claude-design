import { cn } from '../../lib/wireframe-system'
import { Signal, Wifi, Battery } from 'lucide-react'

export function PhoneFrame({ children, className }) {
  return (
    <div
      className={cn(
        'w-[375px] min-h-[700px] bg-white rounded-[32px] border-2 border-gray-300 shadow-lg overflow-hidden flex flex-col relative',
        className
      )}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1 text-xs font-medium">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <Signal size={14} />
          <Wifi size={14} />
          <Battery size={14} />
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
      {/* Home indicator */}
      <div className="flex justify-center pb-2 pt-1">
        <div className="w-32 h-1 bg-gray-300 rounded-full" />
      </div>
    </div>
  )
}
