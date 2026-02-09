import { useEffect, useState, useCallback } from 'react'
import { FlowProvider, useFlow } from './lib/flow-context'
import { FlowNavigator } from './components/system/FlowNavigator'
import { ScreenViewer } from './components/system/ScreenViewer'
import { ComparisonView } from './components/system/ComparisonView'
import { VersionPanel } from './components/system/VersionPanel'
import { flows } from './flows'
import { History } from 'lucide-react'

function AppContent() {
  const { state, nextScreen, prevScreen, nextFlow, prevFlow, toggleComparison, toggleAnnotations } =
    useFlow()
  const [versionOpen, setVersionOpen] = useState(false)

  const handleKeyDown = useCallback(
    (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault()
          nextScreen()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prevScreen()
          break
        case 'ArrowDown':
          e.preventDefault()
          nextFlow()
          break
        case 'ArrowUp':
          e.preventDefault()
          prevFlow()
          break
        case 'c':
        case 'C':
          toggleComparison()
          break
        case 'a':
        case 'A':
          toggleAnnotations()
          break
        case 'v':
        case 'V':
          setVersionOpen((v) => !v)
          break
      }
    },
    [nextScreen, prevScreen, nextFlow, prevFlow, toggleComparison, toggleAnnotations]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <FlowNavigator />
      {state.showComparison ? <ComparisonView /> : <ScreenViewer />}

      <button
        onClick={() => setVersionOpen(true)}
        className="fixed bottom-4 right-4 w-10 h-10 bg-white border-2 border-wire-border rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-40"
        title="Histórico de versões (V)"
      >
        <History size={18} className="text-wire-text-secondary" />
      </button>

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
