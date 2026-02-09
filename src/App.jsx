import { useState, useCallback, useEffect } from 'react'
import { SinglePageView } from './components/system/SinglePageView'
import { FlowNavigator } from './components/system/FlowNavigator'
import { VersionPanel } from './components/system/VersionPanel'
import { FlowProvider, useFlow } from './lib/flow-context'
import { flows } from './flows'
import { PanelLeft, History, Eye, EyeOff } from 'lucide-react'
import { cn } from './lib/wireframe-system'

function AppContent() {
  const { state, toggleAnnotations } = useFlow()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [versionOpen, setVersionOpen] = useState(false)
  const [activeFlowId, setActiveFlowId] = useState(flows[0]?.id || '')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleKeyDown = useCallback(
    (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      switch (e.key) {
        case 'a':
        case 'A':
          toggleAnnotations()
          break
        case 'v':
        case 'V':
          setVersionOpen((v) => !v)
          break
        case 's':
        case 'S':
          setSidebarOpen((v) => !v)
          break
      }
    },
    [toggleAnnotations]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Collapsible sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-30"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 z-40 h-screen">
            <FlowNavigator
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
            />
          </div>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white border-b border-wire-border shrink-0">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className={cn(
              'p-2 rounded-md border transition-colors',
              sidebarOpen
                ? 'bg-wire-bg-dark text-white border-wire-bg-dark'
                : 'border-wire-border hover:bg-gray-50 text-wire-text-secondary'
            )}
            title="Sidebar (S)"
          >
            <PanelLeft size={16} />
          </button>

          <button
            onClick={toggleAnnotations}
            className={cn(
              'p-2 rounded-md border transition-colors flex items-center gap-1.5 text-xs font-medium',
              state.showAnnotations
                ? 'bg-wire-bg-dark text-white border-wire-bg-dark'
                : 'border-wire-border hover:bg-gray-50 text-wire-text-secondary'
            )}
            title="Anotações (A)"
          >
            {state.showAnnotations ? <Eye size={14} /> : <EyeOff size={14} />}
            Notas
          </button>

          <button
            onClick={() => setVersionOpen(true)}
            className="p-2 rounded-md border border-wire-border hover:bg-gray-50 text-wire-text-secondary transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="Versões (V)"
          >
            <History size={14} />
            Versões
          </button>

          <div className="ml-auto text-[11px] text-wire-text-muted hidden sm:block">
            S sidebar &middot; A notas &middot; V versões
          </div>
        </div>

        <SinglePageView
          flows={flows}
          activeFlowId={activeFlowId}
          onFlowChange={setActiveFlowId}
          showAnnotations={state.showAnnotations}
        />
      </div>

      <VersionPanel open={versionOpen} onClose={() => setVersionOpen(false)} />
    </div>
  )
}

function App() {
  return (
    <FlowProvider flows={flows}>
      <AppContent />
    </FlowProvider>
  )
}

export default App
