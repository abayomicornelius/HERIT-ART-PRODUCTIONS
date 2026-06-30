import Sidebar from './Sidebar'

const LINKS = [
  { to: '/production/dashboard', label: 'Dashboard',  icon: 'dashboard'  },
  { to: '/production/projects',  label: 'Projects',   icon: 'projects'   },
  { to: '/production/brands',    label: 'Brands',     icon: 'brands'     },
  { to: '/production/analytics', label: 'Analytics',  icon: 'analytics'  },
  { to: '/production/team',      label: 'Team',       icon: 'team'       },
]

export default function ProductionLayout({ children, title, subtitle, actions }) {
  return (
    <div className="flex min-h-screen bg-hap-bg">
      <Sidebar links={LINKS} />
      <div className="ml-[255px] flex-1 flex flex-col">
        <header className="sticky top-0 z-40 bg-hap-bg/95 backdrop-blur border-b border-hap-border px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
            {subtitle && <p className="text-xs text-white/30 mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            {actions}
            <button className="w-9 h-9 rounded-xl bg-hap-surface2 border border-hap-border flex items-center justify-center text-white/40 hover:text-white hover:border-hap-borderl transition-all relative">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-gold rounded-full border-2 border-hap-bg" />
            </button>
          </div>
        </header>
        <main className="flex-1 p-8 animate-fade-in">{children}</main>
      </div>
    </div>
  )
}
