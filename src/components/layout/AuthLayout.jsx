import { Link } from 'react-router-dom'

export default function AuthLayout({ children, rightPanel }) {
  return (
    <div className="min-h-screen flex bg-hap-bg">
      {/* Left — form */}
      <div className="flex-1 flex items-center justify-center px-10 py-16 relative overflow-hidden">
        {/* Glow decorations */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gold/3 blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-[420px] animate-slide-up">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-10 no-underline group">
            <div className="w-10 h-10 bg-gold-grad rounded-xl flex items-center justify-center font-display font-black text-lg text-hap-bg">H</div>
            <div>
              <span className="block font-display font-bold text-gold text-lg leading-tight">HERIT ART</span>
              <span className="block text-[0.6rem] text-white/25 tracking-[0.14em] uppercase">Production</span>
            </div>
          </Link>
          {children}
        </div>
      </div>

      {/* Right — info panel */}
      <div className="hidden lg:flex w-[44%] bg-gradient-to-br from-hap-surface to-[#161424] border-l border-hap-border flex-col items-center justify-center px-14 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-[360px] text-center">
          {rightPanel || <DefaultRightPanel />}
        </div>
      </div>
    </div>
  )
}

function DefaultRightPanel() {
  return (
    <>
      <div className="w-16 h-16 bg-gold-grad rounded-2xl flex items-center justify-center font-display font-black text-3xl text-hap-bg mx-auto mb-6">H</div>
      <h2 className="font-display text-3xl font-bold text-gold mb-4">Where Brands Come Alive</h2>
      <p className="text-white/50 text-sm leading-7 mb-8">
        Professional content creation for brands that demand excellence. From concept to delivery, we handle every frame.
      </p>
      <ul className="text-left space-y-4">
        {[
          'Structured creative briefs for precision results',
          'Real-time project tracking & status updates',
          'Multi-format content across all platforms',
          'Dedicated production team for your brand',
        ].map(f => (
          <li key={f} className="flex items-start gap-3 text-sm text-white/50">
            <span className="text-gold text-[0.6rem] mt-1.5 flex-shrink-0">✦</span>
            {f}
          </li>
        ))}
      </ul>
    </>
  )
}
