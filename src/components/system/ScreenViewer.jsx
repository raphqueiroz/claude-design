import { useFlow } from '../../lib/flow-context'
import { cn } from '../../lib/wireframe-system'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function ScreenViewer() {
  const {
    state,
    currentFlow,
    currentOption,
    currentScreen,
    totalScreens,
    nextScreen,
    prevScreen,
  } = useFlow()

  if (!currentScreen) {
    return (
      <div className="flex-1 flex items-center justify-center text-wire-text-muted">
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">Nenhuma tela selecionada</div>
          <div className="text-sm">Selecione um fluxo na barra lateral</div>
        </div>
      </div>
    )
  }

  const ScreenComponent = currentScreen.component

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b-2 border-wire-border">
        <div className="min-w-0">
          <div className="text-sm font-semibold truncate">{currentFlow?.name}</div>
          <div className="text-xs text-wire-text-muted truncate">
            {currentOption?.name} — {currentScreen.name}
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={prevScreen}
            disabled={state.screenIndex === 0 && currentFlow?.options[0]?.id === currentOption?.id}
            className="p-1.5 rounded-md border border-wire-border hover:bg-gray-50 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs text-wire-text-muted font-medium tabular-nums">
            {state.screenIndex + 1} / {totalScreens}
          </span>
          <button
            onClick={nextScreen}
            disabled={
              state.screenIndex === totalScreens - 1 &&
              currentFlow?.options[currentFlow.options.length - 1]?.id === currentOption?.id
            }
            className="p-1.5 rounded-md border border-wire-border hover:bg-gray-50 disabled:opacity-30 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-auto flex items-start justify-center p-8 bg-gray-100">
        <div
          className={cn(
            'transition-opacity duration-200',
            !state.showAnnotations && '[&_.annotation-layer]:hidden'
          )}
        >
          {ScreenComponent}
        </div>
      </div>
    </div>
  )
}
