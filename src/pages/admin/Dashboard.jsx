import AdminLayout from '../../components/layout/AdminLayout'

const STATS = [
  { label:'Total Revenue', value:'₦12.4M', change:'+18%', trend:'up', icon:'💰' },
  { label:'Tickets Sold', value:'1,248', change:'+31%', trend:'up', icon:'🎟️' },
  { label:'Studio Bookings', value:'87', change:'+12%', trend:'up', icon:'🎙️' },
  { label:'Active Projects', value:'23', change:'-2', trend:'down', icon:'📁' },
  { label:'Rentals Active', value:'14', change:'+5', trend:'up', icon:'📦' },
  { label:'Network Members', value:'124', change:'+8', trend:'up', icon:'✦' },
]

const RECENT_EVENTS = [
  { event:'1960 — The Musical', tickets:412, revenue:'₦8.24M', status:'On Sale' },
  { event:'Echoes of the Motherland', tickets:0, revenue:'₦0', status:'Coming Soon' },
  { event:'Drums of Sankofa', tickets:2000, revenue:'₦40M', status:'Past' },
]

const RECENT_BOOKINGS = [
  { type:'Studio', name:'H.ART Visual Studio', client:'Ada Okafor', date:'Jun 28', status:'confirmed' },
  { type:'Rental', name:'RED Komodo Kit', client:'Emeka Films', date:'Jul 5', status:'pending' },
  { type:'Studio', name:'Audio Studio', client:'Sade Music', date:'Jul 2', status:'confirmed' },
]

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-1">Admin Overview</h1>
        <p className="text-white/40 text-sm">Platform-wide metrics and operations.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {STATS.map(s => (
          <div key={s.label} className="stat-card">
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{s.icon}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{s.change}</span>
            </div>
            <p className="font-display text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-white/30 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Events performance */}
        <div className="card">
          <h3 className="font-display text-lg font-bold text-white mb-4">Productions & Events</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-4 text-[0.65rem] font-bold uppercase tracking-wider text-white/25 pb-2 border-b border-hap-border">
              <span className="col-span-2">Event</span><span className="text-right">Tickets</span><span className="text-right">Status</span>
            </div>
            {RECENT_EVENTS.map(e => (
              <div key={e.event} className="grid grid-cols-4 text-sm items-center">
                <span className="col-span-2 text-white/70 truncate">{e.event}</span>
                <span className="text-right text-gold font-bold">{e.tickets.toLocaleString()}</span>
                <span className={`text-right text-xs font-medium ${e.status==='On Sale'?'text-green-400':e.status==='Past'?'text-white/25':'text-yellow-400'}`}>{e.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent bookings */}
        <div className="card">
          <h3 className="font-display text-lg font-bold text-white mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {RECENT_BOOKINGS.map((b, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-hap-surface2 border border-hap-border rounded-xl">
                <span className="text-lg">{b.type==='Studio'?'🎙️':'📦'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/70 truncate">{b.name}</p>
                  <p className="text-xs text-white/30">{b.client} · {b.date}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${b.status==='confirmed'?'bg-green-500/10 text-green-400':'bg-yellow-500/10 text-yellow-400'}`}>{b.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
