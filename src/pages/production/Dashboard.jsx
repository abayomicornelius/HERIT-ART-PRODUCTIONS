import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductionLayout from '../../components/layout/ProductionLayout'
import Badge from '../../components/ui/Badge'
import { MOCK_PROJECTS, MOCK_BRANDS } from '../../data/mockData'

const statusVariant = { Pending: 'warning', 'In Progress': 'info', Completed: 'success' }
function fmtDate(s) { return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }

export default function ProdDashboard() {
  const [search, setSearch] = useState('')
  const pending   = MOCK_PROJECTS.filter(p => p.status === 'Pending').length
  const inProg    = MOCK_PROJECTS.filter(p => p.status === 'In Progress').length
  const delivered = MOCK_PROJECTS.filter(p => p.status === 'Completed').length
  const filtered  = MOCK_PROJECTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))

  return (
    <ProductionLayout title="Production Dashboard" subtitle="Overview of all incoming content requests">

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'New Requests',  value: pending,   icon: '🆕', color: 'bg-amber-400/10 text-amber-400'  },
          { label: 'In Progress',   value: inProg,    icon: '⚙️', color: 'bg-blue-400/10 text-blue-400'   },
          { label: 'Delivered',     value: delivered, icon: '✅', color: 'bg-green-400/10 text-green-400' },
          { label: 'Active Brands', value: MOCK_BRANDS.filter(b => b.status === 'Active').length, icon: '🏢', color: 'bg-gold/10 text-gold' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3 ${s.color}`}>{s.icon}</div>
            <p className="text-[0.7rem] text-white/30 font-bold uppercase tracking-widest mb-1">{s.label}</p>
            <p className="font-display text-3xl font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-5">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by project or brand…" className="input pl-9" />
      </div>

      {/* Projects table */}
      <div className="card p-0 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-hap-border">
          <h3 className="font-semibold text-white">Recent Project Requests</h3>
        </div>
        <table className="tbl w-full">
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Brand</th>
              <th>Project Title</th>
              <th>Content Type</th>
              <th>Deadline</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td className="font-mono text-xs text-white/40">{p.id}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-gold-grad rounded-lg flex items-center justify-center text-[0.65rem] font-bold text-hap-bg">
                      {p.brand.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </div>
                    <span className="text-white font-medium text-sm">{p.brand}</span>
                  </div>
                </td>
                <td className="text-white/70 font-medium">{p.name}</td>
                <td className="text-xs text-white/40">{p.contentType}</td>
                <td className="text-xs text-white/40">{fmtDate(p.deadline)}</td>
                <td><Badge variant={statusVariant[p.status]}>{p.status}</Badge></td>
                <td>
                  <Link to={`/production/projects/${p.id}`} className="text-xs text-gold hover:text-gold-hover font-medium no-underline transition-colors">
                    Open →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-white/25 text-sm">No projects match your search.</div>
        )}
      </div>

      {/* Quick brand overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold text-white mb-4">Active Brands</h3>
          <div className="space-y-3">
            {MOCK_BRANDS.filter(b => b.status === 'Active').map(b => (
              <Link key={b.id} to="/production/brands"
                className="flex items-center gap-3 p-3 bg-hap-surface2 rounded-xl hover:bg-hap-surface3 border border-hap-border hover:border-hap-borderl transition-all no-underline">
                <div className="w-8 h-8 bg-gold-grad rounded-lg flex items-center justify-center text-xs font-bold text-hap-bg">
                  {b.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{b.name}</p>
                  <p className="text-xs text-white/30">{b.plan} Plan · {b.activeProjects} active projects</p>
                </div>
                <Badge variant="success" className="text-[0.6rem]">Active</Badge>
              </Link>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-white mb-4">Team Workload</h3>
          <div className="space-y-3">
            {[
              { name: 'Temi Adele',   projects: 4, pct: 80, role: 'Director' },
              { name: 'Emeka Uche',   projects: 5, pct: 100, role: 'Videographer' },
              { name: 'Kola Mensah',  projects: 3, pct: 60, role: 'Director' },
              { name: 'Sade Okonkwo', projects: 2, pct: 40, role: 'Editor' },
            ].map(m => (
              <div key={m.name} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gold-grad rounded-full flex items-center justify-center text-xs font-bold text-hap-bg flex-shrink-0">
                  {m.name.split(' ').map(w=>w[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-white">{m.name}</span>
                    <span className="text-xs text-white/30">{m.projects} projects</span>
                  </div>
                  <div className="h-1.5 bg-hap-surface3 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${m.pct === 100 ? 'bg-red-500' : 'bg-gold-h'}`} style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProductionLayout>
  )
}
