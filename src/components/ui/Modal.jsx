import { useEffect } from 'react'

export default function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-3xl' }

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[200] flex items-center justify-center p-6 animate-fade-in"
         onClick={e => e.target === e.currentTarget && onClose?.()}>
      <div className={`bg-hap-surface border border-hap-borderl rounded-3xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto shadow-xl2 animate-slide-up`}>
        {title && (
          <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-hap-border">
            <h3 className="font-display text-lg font-bold text-white">{title}</h3>
            <button onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:bg-hap-surface2 hover:text-white transition-all text-lg leading-none">✕</button>
          </div>
        )}
        <div className="p-6">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 pb-6 pt-2 border-t border-hap-border">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
