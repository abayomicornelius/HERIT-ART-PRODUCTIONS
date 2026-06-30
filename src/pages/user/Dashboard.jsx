import { Link } from 'react-router-dom'
import UserLayout from '../../components/layout/UserLayout'
import { useAuth } from '../../context/AuthContext'

const QUICK = [
  { icon:'🎟️', label:'My Tickets', to:'/dashboard/tickets', count:2, desc:'Upcoming events' },
  { icon:'📅', label:'My Bookings', to:'/dashboard/bookings', count:1, desc:'Studio & rentals' },
  { icon:'📁', label:'My Projects', to:'/dashboard/projects', count:3, desc:'Active projects' },
  { icon:'👤', label:'Profile', to:'/dashboard/profile', count:null, desc:'Account settings' },
]

const UPCOMING = [
  { id:'1', event:'1960 — The Musical', date:'Oct 1, 2026', venue:'MUSON Centre', tickets:2, category:'Premium', ref:'HAP-882741' },
  { id:'2', event:'Drums of Sankofa', date:'Dec 12, 2026', venue:'Eko Hotel', tickets:1, category:'Regular', ref:'HAP-119023' },
]

export default function UserDashboard() {
  const { user } = useAuth()

  return (
    <UserLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-1">Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋</h1>
        <p className="text-white/40 text-sm">Here's a summary of your HERIT activity.</p>
      </div>

      {/* Quick cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {QUICK.map(q => (
          <Link key={q.label} to={q.to} className="card no-underline hover:border-gold/25 hover:-translate-y-0.5 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{q.icon}</span>
              {q.count !== null && <span className="bg-gold text-hap-bg text-xs font-bold px-2 py-0.5 rounded-full">{q.count}</span>}
            </div>
            <p className="font-semibold text-white group-hover:text-gold transition-colors">{q.label}</p>
            <p className="text-xs text-white/30 mt-0.5">{q.desc}</p>
          </Link>
        ))}
      </div>

      {/* Upcoming events */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-lg font-bold text-white">Upcoming Events</h3>
          <Link to="/dashboard/tickets" className="text-xs text-gold hover:underline">View all →</Link>
        </div>
        <div className="space-y-3">
          {UPCOMING.map(e => (
            <div key={e.id} className="flex items-center gap-4 p-4 bg-hap-surface2 border border-hap-border rounded-xl">
              <div className="w-12 h-12 bg-gold/10 border border-gold/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🎭</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm truncate">{e.event}</p>
                <p className="text-xs text-white/35">{e.date} · {e.venue}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-gold font-bold">{e.tickets} × {e.category}</p>
                <p className="text-xs text-white/25 font-mono">{e.ref}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="card">
        <h3 className="font-display text-lg font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-2">
          {[
            { icon:'🎟️', action:'Purchased tickets', detail:'1960 — The Musical · 2 Premium tickets', time:'2 days ago' },
            { icon:'📅', action:'Studio booking confirmed', detail:'H.ART Visual Studio · Jun 28', time:'5 days ago' },
            { icon:'👤', action:'Profile updated', detail:'Phone number and profile photo', time:'1 week ago' },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-hap-surface2 transition-colors">
              <span className="text-lg mt-0.5">{a.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/70">{a.action}</p>
                <p className="text-xs text-white/30 mt-0.5">{a.detail}</p>
              </div>
              <span className="text-xs text-white/20 flex-shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  )
}
