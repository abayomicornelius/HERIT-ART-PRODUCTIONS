import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'

const LINKS = [
  { to: '/admin',               label: 'Dashboard',   icon: 'dashboard'  },
  { to: '/admin/users',         label: 'Users',       icon: 'team'       },
  { to: '/admin/productions',   label: 'Productions', icon: 'projects'   },
  { to: '/admin/events',        label: 'Events',      icon: 'review'     },
  { to: '/admin/studios',       label: 'Studios',     icon: 'sub'        },
  { to: '/admin/rentals',       label: 'Rentals',     icon: 'brands'     },
  { to: '/admin/costumes',      label: 'Costumes',    icon: 'sub'        },
  { to: '/admin/creatives',     label: 'Creatives',   icon: 'team'       },
  { to: '/admin/payments',      label: 'Payments',    icon: 'analytics'  },
  { to: '/admin/analytics',     label: 'Analytics',   icon: 'analytics'  },
  { to: '/admin/pricing',       label: 'Pricing',     icon: 'analytics'  },
  { to: '/production/dashboard',label: 'Content Team',icon: 'dashboard'  },
]

export default function AdminLayout({ children, title, subtitle, actions }) {
  return (
    <div className="flex min-h-screen bg-hap-bg">
      <Sidebar links={LINKS} />
      <div className="ml-[255px] flex-1 flex flex-col">
        <header className="sticky top-0 z-40 bg-hap-bg/95 backdrop-blur border-b border-hap-border px-8 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[0.6rem] bg-gold/20 text-gold border border-gold/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Admin</span>
            </div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
            {subtitle && <p className="text-xs text-white/30 mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            {actions}
            <Link to="/" className="text-xs text-white/30 hover:text-white transition-colors px-3 py-2 border border-hap-border rounded-xl hover:border-hap-borderl">
              ← Public Site
            </Link>
          </div>
        </header>
        <main className="flex-1 p-8 animate-fade-in">{children}</main>
      </div>
    </div>
  )
}
