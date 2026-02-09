import { User, TrendingUp, Eye, HelpCircle } from 'lucide-react'

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 pb-3">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-wire-border flex items-center justify-center">
        <User size={20} className="text-wire-text-muted" />
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2">
        {/* Rendimento pill */}
        <div className="flex items-center gap-1.5 bg-wire-bg-dark text-white text-xs font-medium px-3 py-1.5 rounded-full">
          <TrendingUp size={14} />
          <span>R$ 5,45</span>
        </div>

        {/* Eye / visibility */}
        <button className="w-9 h-9 rounded-full bg-gray-100 border border-wire-border flex items-center justify-center">
          <Eye size={16} className="text-wire-text-muted" />
        </button>

        {/* Help */}
        <button className="w-9 h-9 rounded-full bg-gray-100 border border-wire-border flex items-center justify-center">
          <HelpCircle size={16} className="text-wire-text-muted" />
        </button>
      </div>
    </div>
  )
}
