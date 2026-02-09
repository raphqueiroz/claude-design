import { cn } from '../../lib/wireframe-system'

export function SinglePageView({ flows, activeFlowId, onFlowChange, showAnnotations }) {
  const activeFlow = flows.find((f) => f.id === activeFlowId) || flows[0]

  return (
    <div className="flex-1 flex flex-col min-w-0 h-screen">
      {/* Flow tabs */}
      <div className="bg-white border-b-2 border-wire-border px-6 py-4 shrink-0">
        <div className="flex gap-3 flex-wrap">
          {flows.map((flow, i) => (
            <button
              key={flow.id}
              onClick={() => onFlowChange(flow.id)}
              className={cn(
                'px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-colors whitespace-nowrap',
                flow.id === activeFlowId
                  ? 'bg-wire-bg-dark text-white border-wire-bg-dark'
                  : 'bg-white text-wire-text-primary border-wire-border hover:bg-gray-50'
              )}
            >
              Fluxo {i + 1}: {flow.name}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div
        className={cn(
          'flex-1 overflow-y-auto bg-gray-100',
          !showAnnotations && '[&_.annotation-layer]:hidden'
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          {activeFlow.options.map((option, optIdx) => (
            <div key={option.id}>
              {/* Option header */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-wire-text-primary">{option.name}</h2>
                {option.description && (
                  <p className="text-sm text-wire-text-secondary mt-1 max-w-2xl">
                    {option.description}
                  </p>
                )}
              </div>

              {/* Screen labels */}
              <div className="flex gap-8 mb-2 flex-wrap">
                {option.screens.map((screen, idx) => (
                  <div key={screen.id} className="text-xs text-wire-text-muted font-medium">
                    {idx + 1}. {screen.name}
                  </div>
                ))}
              </div>

              {/* Screens side by side */}
              <div className="flex gap-8 flex-wrap">
                {option.screens.map((screen) => (
                  <div key={screen.id} className="shrink-0">
                    {screen.component}
                  </div>
                ))}
              </div>

              {/* Divider between options */}
              {optIdx < activeFlow.options.length - 1 && (
                <hr className="border-wire-border my-12" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
