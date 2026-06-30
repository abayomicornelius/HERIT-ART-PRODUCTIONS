import AdminLayout from '../../components/layout/AdminLayout'

const MONTHLY = [
  { month:'Jan', tickets:320000, studio:180000, rentals:85000, projects:450000 },
  { month:'Feb', tickets:510000, studio:220000, rentals:110000, projects:380000 },
  { month:'Mar', tickets:480000, studio:310000, rentals:95000, projects:520000 },
  { month:'Apr', tickets:890000, studio:260000, rentals:140000, projects:610000 },
  { month:'May', tickets:720000, studio:340000, rentals:120000, projects:740000 },
  { month:'Jun', tickets:1240000, studio:420000, rentals:195000, projects:890000 },
]
const maxTotal = Math.max(...MONTHLY.map(m => m.tickets + m.studio + m.rentals + m.projects))

const TOP_EVENTS = [
  { name:'1960 — The Musical', tickets:412, revenue:8240000, pct:82 },
  { name:'Drums of Sankofa', tickets:2000, revenue:40000000, pct:100 },
  { name:'Echoes of the Motherland', tickets:0, revenue:0, pct:0 },
]
const TOP_STUDIOS = [
  { name:'H.ART Visual Studio', bookings:34, revenue:5800000 },
  { name:'H.ART Audio Studio', bookings:28, revenue:3200000 },
  { name:'Rehearsal Space', bookings:25, revenue:900000 },
]
const TOP_CREATIVES = [
  { name:'Amaka Osei', category:'Director', bookings:8, rating:'5.0' },
  { name:'Emeka Uche', category:'Cinematographer', bookings:12, rating:'4.9' },
  { name:'Sade Okonkwo', category:'Composer', bookings:6, rating:'5.0' },
  { name:'Kofi Mensah', category:'Actor', bookings:15, rating:'4.8' },
]

const fmt = n => n >= 1000000 ? `₦${(n/1000000).toFixed(1)}M` : `₦${(n/1000).toFixed(0)}K`

export default function Analytics() {
  const totalRevenue = MONTHLY.reduce((s, m) => s + m.tickets + m.studio + m.rentals + m.projects, 0)

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-1">Analytics</h1>
        <p className="text-white/40 text-sm">Revenue, audience and business performance data.</p>
      </div>

      {/* Total revenue */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label:'Total Revenue (YTD)', value: fmt(totalRevenue), icon:'💰', color:'text-gold' },
          { label:'Ticket Revenue', value: fmt(MONTHLY.reduce((s,m)=>s+m.tickets,0)), icon:'🎟️', color:'text-gold' },
          { label:'Studio Revenue', value: fmt(MONTHLY.reduce((s,m)=>s+m.studio,0)), icon:'🎙️', color:'text-purple-400' },
          { label:'Projects Revenue', value: fmt(MONTHLY.reduce((s,m)=>s+m.projects,0)), icon:'📁', color:'text-blue-400' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <span className="text-2xl mb-3 block">{s.icon}</span>
            <p className={`font-display text-2xl font-bold mb-0.5 ${s.color}`}>{s.value}</p>
            <p className="text-xs text-white/30">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Monthly chart */}
      <div className="card mb-8">
        <h3 className="font-display text-lg font-bold text-white mb-6">Monthly Revenue Breakdown</h3>
        <div className="flex items-end gap-2 h-40">
          {MONTHLY.map(m => {
            const total = m.tickets + m.studio + m.rentals + m.projects
            const pct = (total / maxTotal) * 100
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                <p className="text-[0.6rem] text-white/30">{fmt(total)}</p>
                <div className="w-full flex flex-col justify-end rounded-t-lg overflow-hidden" style={{ height:`${(pct/100)*120}px` }}>
                  <div style={{ height:`${(m.projects/total)*100}%` }} className="bg-blue-500/60 w-full" />
                  <div style={{ height:`${(m.rentals/total)*100}%` }} className="bg-green-500/60 w-full" />
                  <div style={{ height:`${(m.studio/total)*100}%` }} className="bg-purple-500/60 w-full" />
                  <div style={{ height:`${(m.tickets/total)*100}%` }} className="bg-gold/80 w-full" />
                </div>
                <p className="text-[0.6rem] text-white/30">{m.month}</p>
              </div>
            )
          })}
        </div>
        <div className="flex gap-4 mt-4 justify-center text-xs text-white/40">
          {[['🟡','Tickets'],['🟣','Studio'],['🟢','Rentals'],['🔵','Projects']].map(([c,l])=>(
            <span key={l} className="flex items-center gap-1">{c} {l}</span>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top events */}
        <div className="card">
          <h3 className="font-display text-base font-bold text-white mb-4">Top Events by Revenue</h3>
          <div className="space-y-4">
            {TOP_EVENTS.map(e => (
              <div key={e.name}>
                <div className="flex justify-between text-xs mb-1"><span className="text-white/60 truncate pr-2">{e.name}</span><span className="text-gold font-bold flex-shrink-0">{fmt(e.revenue)}</span></div>
                <div className="h-1.5 bg-hap-surface3 rounded-full overflow-hidden"><div className="h-full bg-gold rounded-full" style={{ width:`${e.pct}%` }} /></div>
                <p className="text-[0.6rem] text-white/20 mt-0.5">{e.tickets.toLocaleString()} tickets sold</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top studios */}
        <div className="card">
          <h3 className="font-display text-base font-bold text-white mb-4">Studio Performance</h3>
          <div className="space-y-3">
            {TOP_STUDIOS.map(s => (
              <div key={s.name} className="flex items-center gap-3 p-3 bg-hap-surface2 border border-hap-border rounded-xl">
                <span className="text-lg flex-shrink-0">🎙️</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/70 truncate">{s.name}</p>
                  <p className="text-xs text-white/30">{s.bookings} bookings</p>
                </div>
                <span className="text-gold font-bold text-xs flex-shrink-0">{fmt(s.revenue)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top creatives */}
        <div className="card">
          <h3 className="font-display text-base font-bold text-white mb-4">Top Creatives</h3>
          <div className="space-y-3">
            {TOP_CREATIVES.map(c => (
              <div key={c.name} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-xs font-bold text-gold flex-shrink-0">{c.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/70 truncate">{c.name}</p>
                  <p className="text-xs text-white/30">{c.category} · {c.bookings} bookings</p>
                </div>
                <span className="text-xs text-gold font-bold">★ {c.rating}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audience analytics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {[
          { label:'Registered Users', value:'1,842', sub:'↑ 124 this month', color:'text-white' },
          { label:'Ticket Buyers', value:'1,248', sub:'↑ 31% vs last month', color:'text-gold' },
          { label:'Returning Customers', value:'68%', sub:'Retention rate', color:'text-green-400' },
          { label:'Creative Network', value:'124', sub:'8 pending approval', color:'text-purple-400' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <p className={`font-display text-2xl font-bold mb-0.5 ${s.color}`}>{s.value}</p>
            <p className="text-xs text-white/30">{s.label}</p>
            <p className="text-[0.65rem] text-white/20 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
