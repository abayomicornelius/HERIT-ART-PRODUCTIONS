const variants = {
  gold:    'bg-gold/10 text-gold border border-gold/30',
  success: 'bg-green-500/10 text-green-400 border border-green-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  error:   'bg-red-500/10 text-red-400 border border-red-500/20',
  info:    'bg-blue-400/10 text-blue-400 border border-blue-400/20',
  muted:   'bg-hap-surface3 text-white/40 border border-hap-border',
}

export default function Badge({ children, variant = 'muted', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.7rem] font-semibold tracking-wide ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
