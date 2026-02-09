import { cn } from '../../lib/wireframe-system'
import { useFlow } from '../../lib/flow-context'
import {
  ChevronDown,
  ChevronRight,
  Layout,
  Layers,
  Eye,
  EyeOff,
  Columns2,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react'
import { useState } from 'react'

export function FlowNavigator({ collapsed = false, onToggleCollapse }) {
  const {
    flows,
    state,
    currentFlow,
    currentOption,
    setFlow,
    setOption,
    setScreenIndex,
    toggleComparison,
    toggleAnnotations,
  } = useFlow()

  const [expandedFlows, setExpandedFlows] = useState(() =>
    new Set(flows.map((f) => f.id))
  )

  const toggle = (id) => {
    setExpandedFlows((s) => {
      const next = new Set(s)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <aside
      className={cn(
        'bg-white border-r-2 border-wire-border flex flex-col h-screen shrink-0 transition-[width] duration-200 ease-in-out overflow-hidden',
        collapsed ? 'w-14' : 'w-72'
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'py-4 border-b border-wire-border flex min-w-0',
          collapsed ? 'flex-col items-center gap-3 px-2' : 'items-center justify-between px-4'
        )}
      >
        <div className={cn('flex items-center gap-2 min-w-0', collapsed && 'justify-center')}>
          <Layout size={18} className="text-wire-text-muted shrink-0" />
          {!collapsed && (
            <span className="text-sm font-bold tracking-tight truncate">WIREFRAME EXPLORER</span>
          )}
        </div>
        <button
          type="button"
          onClick={onToggleCollapse}
          className="p-1.5 rounded-md border border-wire-border hover:bg-gray-50 transition-colors shrink-0"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <PanelLeft size={18} className="text-wire-text-secondary" />
          ) : (
            <PanelLeftClose size={18} className="text-wire-text-secondary" />
          )}
        </button>
      </div>
      {!collapsed && (
        <>
          <div className="text-xs text-wire-text-muted px-4 -mt-2 pb-2">Picnic Design System</div>

      {/* Controls */}
      <div className="px-4 py-3 border-b border-wire-border flex gap-2">
        <button
          onClick={toggleComparison}
          className={cn(
            'flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border transition-colors',
            state.showComparison
              ? 'bg-wire-bg-dark text-white border-wire-border-dark'
              : 'bg-white text-wire-text-secondary border-wire-border hover:bg-gray-50'
          )}
        >
          <Columns2 size={13} />
          Comparar
        </button>
        <button
          onClick={toggleAnnotations}
          className={cn(
            'flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border transition-colors',
            state.showAnnotations
              ? 'bg-wire-bg-dark text-white border-wire-border-dark'
              : 'bg-white text-wire-text-secondary border-wire-border hover:bg-gray-50'
          )}
        >
          {state.showAnnotations ? <Eye size={13} /> : <EyeOff size={13} />}
          Notas
        </button>
      </div>

      {/* Flow tree */}
      <nav className="flex-1 overflow-y-auto py-2">
        {flows.map((flow) => (
          <div key={flow.id} className="mb-1">
            {/* Flow header */}
            <button
              onClick={() => toggle(flow.id)}
              className={cn(
                'w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors text-left',
                flow.id === state.flowId && 'text-wire-text-primary',
                flow.id !== state.flowId && 'text-wire-text-secondary'
              )}
            >
              {expandedFlows.has(flow.id) ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
              <Layers size={14} className="text-wire-text-muted" />
              {flow.name}
            </button>

            {/* Options */}
            {expandedFlows.has(flow.id) && (
              <div className="ml-4">
                {flow.options.map((option) => (
                  <div key={option.id}>
                    <button
                      onClick={() => {
                        setFlow(flow.id)
                        setOption(option.id)
                      }}
                      className={cn(
                        'w-full flex items-center gap-2 pl-6 pr-4 py-1.5 text-xs hover:bg-gray-50 transition-colors text-left',
                        option.id === currentOption?.id && flow.id === currentFlow?.id
                          ? 'font-semibold text-wire-text-primary bg-gray-50'
                          : 'text-wire-text-secondary'
                      )}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-wire-border shrink-0" />
                      {option.name}
                      <span className="text-wire-text-muted ml-auto">
                        {option.screens.length}
                      </span>
                    </button>

                    {/* Screens */}
                    {option.id === currentOption?.id &&
                      flow.id === currentFlow?.id &&
                      option.screens.length > 1 && (
                        <div className="ml-8 border-l border-wire-border">
                          {option.screens.map((screen, idx) => (
                            <button
                              key={screen.id}
                              onClick={() => {
                                setFlow(flow.id)
                                setOption(option.id)
                                setScreenIndex(idx)
                              }}
                              className={cn(
                                'w-full text-left pl-4 pr-4 py-1 text-[11px] hover:bg-gray-50 transition-colors',
                                idx === state.screenIndex
                                  ? 'text-wire-text-primary font-medium'
                                  : 'text-wire-text-muted'
                              )}
                            >
                              {screen.name}
                            </button>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Keyboard hints */}
      <div className="px-4 py-3 border-t border-wire-border text-[11px] text-wire-text-muted space-y-1">
        <div className="font-medium text-wire-text-secondary mb-1">Atalhos</div>
        <div className="flex justify-between">
          <span>← → Telas</span>
          <span>↑ ↓ Fluxos</span>
        </div>
        <div className="flex justify-between">
          <span>C Comparar</span>
          <span>A Anotações</span>
        </div>
      </div>
        </>
      )}
    </aside>
  )
}
