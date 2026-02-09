import { useFlow } from '../../lib/flow-context'
import { cn } from '../../lib/wireframe-system'

export function ComparisonView() {
  const { state, currentFlow } = useFlow()

  if (!currentFlow || !currentFlow.options.length) {
    return (
      <div className="flex-1 flex items-center justify-center text-wire-text-muted">
        Nenhum fluxo selecionado para comparação
      </div>
    )
  }

  const options = currentFlow.options

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b-2 border-wire-border">
        <div>
          <div className="text-sm font-semibold">{currentFlow.name}</div>
          <div className="text-xs text-wire-text-muted">
            Comparando {options.length} opções — Tela {state.screenIndex + 1}
          </div>
        </div>
      </div>

      {/* Comparison grid */}
      <div className="flex-1 overflow-auto p-6 bg-gray-100">
        <div
          className={cn(
            'flex gap-6 justify-center',
            !state.showAnnotations && '[&_.annotation-layer]:hidden'
          )}
        >
          {options.map((option) => {
            const screen = option.screens[state.screenIndex] || option.screens[0]
            if (!screen) return null
            return (
              <div key={option.id} className="flex flex-col items-center gap-3">
                <div className="text-xs font-semibold text-wire-text-secondary bg-white px-3 py-1 rounded-full border border-wire-border">
                  {option.name}
                </div>
                <div className="transform scale-[0.85] origin-top">
                  {screen.component}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
