import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const add = useCallback((message, type = 'info') => {
    const id = Date.now()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
  }, [])

  const toast = {
    success: (m) => add(m, 'success'),
    error:   (m) => add(m, 'error'),
    warning: (m) => add(m, 'warning'),
    info:    (m) => add(m, 'info'),
  }

  const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' }
  const borders = { success: 'border-l-green-500', error: 'border-l-red-500', warning: 'border-l-amber-500', info: 'border-l-blue-400' }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-2.5 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id}
            className={`pointer-events-auto flex items-center gap-3 bg-hap-surface3 border border-hap-borderl
                        border-l-4 ${borders[t.type]} rounded-xl px-4 py-3.5 shadow-xl text-sm text-white
                        min-w-[260px] max-w-sm animate-slide-r`}>
            <span className="flex-shrink-0 text-base">{icons[t.type]}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
