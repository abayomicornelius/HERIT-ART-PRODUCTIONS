import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { MOCK_NOTIFICATIONS } from '../../data/notifications'

const UNREAD = MOCK_NOTIFICATIONS.filter(n => !n.read).length

const LINKS = [
  { to: '/dashboard',               label: 'Overview',       icon: 'dashboard' },
  { to: '/dashboard/tickets',       label: 'My Tickets',     icon: 'review'    },
  { to: '/dashboard/bookings',      label: 'My Bookings',    icon: 'sub'       },
  { to: '/dashboard/projects',      label: 'My Projects',    icon: 'projects'  },
  { to: '/dashboard/payments',      label: 'Payments',       icon: 'analytics' },
  { to: '/dashboard/notifications', label: 'Notifications',  icon: 'brands'    },
  { to: '/dashboard/profile',       label: 'Profile',        icon: 'team'      },
]

export default function UserLayout({ children, title, subtitle, actions }) {
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
            <Link to="/dashboard/notifications" className="relative text-white/40 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all" title="Notifications">
              🔔
              {UNREAD > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold rounded-full text-hap-bg text-[0.55rem] font-bold flex items-center justify-center">{UNREAD}</span>}
            </Link>
            <Link to="/" className="text-xs text-white/30 hover:text-white px-3 py-2 border border-hap-border rounded-xl hover:border-hap-borderl transition-all">← Site</Link>
          </div>
        </header>
        <main className="flex-1 p-8 animate-fade-in">{children}</main>
      </div>
    </div>
  )
}
