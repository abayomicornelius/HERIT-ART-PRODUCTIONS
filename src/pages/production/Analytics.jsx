import ProductionLayout from '../../components/layout/ProductionLayout'
import { MOCK_PROJECTS, MOCK_BRANDS } from '../../data/mockData'

const MONTHLY = [
  { month: 'Jan', count: 4 }, { month: 'Feb', count: 6 }, { month: 'Mar', count: 5 },
  { month: 'Apr', count: 8 }, { month: 'May', count: 7 }, { month: 'Jun', count: 10 },
]
const maxCount = Math.max(...MONTHLY.map(m => m.count))

const TOP_BRANDS = [
  { name: 'Zara Lagos',    projects: 12, revenue: '₦4,200,000' },
  { name: 'TechFlow Inc.', projects: 8,  revenue: '₦1,200,000' },
  { name: 'Bloom Beauty',  projects: 7,  revenue: '₦7,000,000' },
  { name: 'Urban Eats',    projects: 5,  revenue: '₦750,000'   },
  { name: 'NovaTech',      projects: 3,  revenue: '₦450,000'   },
]

export default function Analytics() {
  const completed = MOCK_PROJECTS.filter(p => p.status === 'Completed').length
  const active    = MOCK_PROJECTS.filter(p => p.status === 'In Progress').length
  const totalBrands = MOCK_BRANDS.length
  const activeBrands = MOCK_BRANDS.filter(b => b.status === 'Active').length

  return (
    <ProductionLayout title="Analytics" subtitle="Platform performance and revenue insights">

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Revenue',       value: '₦13.6M',   icon: '💰', color: 'bg-gold/10 text-gold',         sub: '+18% this month' },
          { label: 'Projects Completed',  value: completed,  icon: '✅', color: 'bg-green-500/10 text-green-400', sub: 'All time' },
          { label: 'Active Brands',       value: `${activeBrands}/${totalBrands}`, icon: '🏢', color: 'bg-blue-400/10 text-blue-400', sub: `${totalBrands - activeBrands} inactive` },
          { label: 'Avg. Delivery Time',  value: '4.2 days', icon: '⏱',  color: 'bg-purple-400/10 text-purple-400', sub: 'Down from 5.1d' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3 ${s.color}`}>{s.icon}</div>
            <p className="text-[0.7rem] text-white/30 font-bold uppercase tracking-widest mb-1">{s.label}</p>
            <p className="font-display text-3xl font-bold text-white mb-1">{s.value}</p>
            <p className="text-xs text-white/25">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Bar chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-white">Content Requests / Month</h3>
            <span className="text-xs text-white/30 bg-hap-surface2 px-3 py-1 rounded-full border border-hap-border">2026</span>
          </div>
          <div className="flex items-end gap-3 h-40">
            {MONTHLY.map(m => {
              const pct = (m.count / maxCount) * 100
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-gold font-semibold">{m.count}</span>
                  <div className="w-full rounded-t-lg bg-gold/20 hover:bg-gold/40 transition-all cursor-default relative group" style={{ height: `${pct}%`, minHeight: '8px' }}>
                    <div className="w-full h-full rounded-t-lg bg-gold-h opacity-80" />
                  </div>
                  <span className="text-[0.65rem] text-white/30">{m.month}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Status breakdown */}
        <div className="card">
          <h3 className="font-semibold text-white mb-6">Project Status Breakdown</h3>
          <div className="space-y-4">
            {[
              { label: 'Completed', count: completed, color: 'bg-green-500', total: MOCK_PROJECTS.length },
              { label: 'In Progress', count: active, color: 'bg-blue-400', total: MOCK_PROJECTS.length },
              { label: 'Pending', count: MOCK_PROJECTS.filter(p=>p.status==='Pending').length, color: 'bg-amber-400', total: MOCK_PROJECTS.length },
            ].map(({ label, count, color, total }) => {
              const pct = total ? Math.round((count / total) * 100) : 0
              return (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-white/70">{label}</span>
                    <span className="text-sm font-semibold text-white">{count} <span className="text-white/30 font-normal text-xs">({pct}%)</span></span>
                  </div>
                  <div className="h-2 bg-hap-surface3 rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 pt-5 border-t border-hap-border grid grid-cols-2 gap-3">
            <div className="bg-hap-surface2 rounded-xl p-3 text-center border border-hap-border">
              <p className="font-display text-2xl font-bold text-white">{MOCK_PROJECTS.length}</p>
              <p className="text-xs text-white/30 mt-0.5">Total Projects</p>
            </div>
            <div className="bg-hap-surface2 rounded-xl p-3 text-center border border-hap-border">
              <p className="font-display text-2xl font-bold text-gold">94%</p>
              <p className="text-xs text-white/30 mt-0.5">On-time Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top brands */}
      <div className="card">
        <h3 className="font-semibold text-white mb-5">Top 5 Brands by Project Volume</h3>
        <table className="tbl w-full">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Brand</th>
              <th>Total Projects</th>
              <th>Volume</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {TOP_BRANDS.map((b, i) => (
              <tr key={b.name}>
                <td>
                  <span className={`w-7 h-7 inline-flex items-center justify-center rounded-full text-xs font-bold ${i === 0 ? 'bg-gold/20 text-gold' : i === 1 ? 'bg-white/10 text-white/50' : 'bg-hap-surface3 text-white/30'}`}>
                    {i + 1}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-gold-grad rounded-lg flex items-center justify-center text-[0.6rem] font-bold text-hap-bg">
                      {b.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
                    </div>
                    <span className="text-white font-medium text-sm">{b.name}</span>
                  </div>
                </td>
                <td className="text-white/70">{b.projects}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 max-w-[100px] h-1.5 bg-hap-surface3 rounded-full overflow-hidden">
                      <div className="h-full bg-gold-h rounded-full" style={{ width: `${(b.projects / TOP_BRANDS[0].projects) * 100}%` }} />
                    </div>
                  </div>
                </td>
                <td className="text-gold font-semibold">{b.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProductionLayout>
  )
}
