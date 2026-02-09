import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { saveNavigationState, loadNavigationState } from './version-control'

const FlowContext = createContext(null)

export function FlowProvider({ children, flows }) {
  const [state, setState] = useState(() => {
    const saved = loadNavigationState()
    return saved || {
      flowId: flows[0]?.id || '',
      optionId: flows[0]?.options[0]?.id || '',
      screenIndex: 0,
      showComparison: false,
      showAnnotations: true,
    }
  })

  useEffect(() => {
    saveNavigationState(state)
  }, [state])

  const currentFlow = flows.find((f) => f.id === state.flowId) || flows[0]
  const currentOption = currentFlow?.options.find((o) => o.id === state.optionId) || currentFlow?.options[0]
  const currentScreen = currentOption?.screens[state.screenIndex] || currentOption?.screens[0]
  const totalScreens = currentOption?.screens.length || 0

  const setFlow = useCallback((flowId) => {
    const flow = flows.find((f) => f.id === flowId)
    if (flow) {
      setState((s) => ({
        ...s,
        flowId,
        optionId: flow.options[0]?.id || '',
        screenIndex: 0,
      }))
    }
  }, [flows])

  const setOption = useCallback((optionId) => {
    setState((s) => ({ ...s, optionId, screenIndex: 0 }))
  }, [])

  const setScreenIndex = useCallback((index) => {
    setState((s) => ({ ...s, screenIndex: index }))
  }, [])

  const nextScreen = useCallback(() => {
    setState((s) => {
      if (s.screenIndex < totalScreens - 1) {
        return { ...s, screenIndex: s.screenIndex + 1 }
      }
      // Move to next option
      const flow = flows.find((f) => f.id === s.flowId)
      const optionIdx = flow?.options.findIndex((o) => o.id === s.optionId)
      if (optionIdx !== undefined && optionIdx < flow.options.length - 1) {
        return { ...s, optionId: flow.options[optionIdx + 1].id, screenIndex: 0 }
      }
      return s
    })
  }, [flows, totalScreens])

  const prevScreen = useCallback(() => {
    setState((s) => {
      if (s.screenIndex > 0) {
        return { ...s, screenIndex: s.screenIndex - 1 }
      }
      // Move to previous option's last screen
      const flow = flows.find((f) => f.id === s.flowId)
      const optionIdx = flow?.options.findIndex((o) => o.id === s.optionId)
      if (optionIdx !== undefined && optionIdx > 0) {
        const prevOption = flow.options[optionIdx - 1]
        return { ...s, optionId: prevOption.id, screenIndex: prevOption.screens.length - 1 }
      }
      return s
    })
  }, [flows])

  const nextFlow = useCallback(() => {
    const idx = flows.findIndex((f) => f.id === state.flowId)
    if (idx < flows.length - 1) {
      setFlow(flows[idx + 1].id)
    }
  }, [flows, state.flowId, setFlow])

  const prevFlow = useCallback(() => {
    const idx = flows.findIndex((f) => f.id === state.flowId)
    if (idx > 0) {
      setFlow(flows[idx - 1].id)
    }
  }, [flows, state.flowId, setFlow])

  const toggleComparison = useCallback(() => {
    setState((s) => ({ ...s, showComparison: !s.showComparison }))
  }, [])

  const toggleAnnotations = useCallback(() => {
    setState((s) => ({ ...s, showAnnotations: !s.showAnnotations }))
  }, [])

  return (
    <FlowContext.Provider
      value={{
        flows,
        state,
        currentFlow,
        currentOption,
        currentScreen,
        totalScreens,
        setFlow,
        setOption,
        setScreenIndex,
        nextScreen,
        prevScreen,
        nextFlow,
        prevFlow,
        toggleComparison,
        toggleAnnotations,
      }}
    >
      {children}
    </FlowContext.Provider>
  )
}

export function useFlow() {
  const ctx = useContext(FlowContext)
  if (!ctx) throw new Error('useFlow must be used within FlowProvider')
  return ctx
}
