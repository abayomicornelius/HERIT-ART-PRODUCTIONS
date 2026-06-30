import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductionLayout from '../../components/layout/ProductionLayout'
import Badge from '../../components/ui/Badge'
import { MOCK_PROJECTS, MOCK_TEAM } from '../../data/mockData'
import { useToast } from '../../context/ToastContext'

const statusVariant = { Pending: 'warning', 'In Progress': 'info', Completed: 'success' }
function fmtDate(s) { return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }

export default function ProdProjects() {
  const toast = useToast()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [projects, setProjects] = useState(MOCK_PROJECTS)

  const statuses = ['All', 'Pending', 'In Progress', 'Completed']

  const filtered = projects.filter(p => {
    const ms = filter === 'All' || p.status === filter
    const mq = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
    return ms && mq
  })

  function assign(id, assignee) {
    setProjects(prev => prev.map(p => {
      if (p.id !== id) return p
      return { ...p, assignee, status: p.status === 'Pending' ? 'In Progress' : p.status }
    }))
    toast.success(`Assigned to ${assignee}. Status updated to In Progress.`)
  }

  return (
    <ProductionLayout title="All Projects" subtitle="Manage and track all content requests">

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects or brands…" className="input pl-9" />
        </div>
        <div className="flex items-center gap-1 bg-hap-surface border border-hap-border rounded-xl p-1">
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === s ? 'bg-gold text-hap-bg' : 'text-white/40 hover:text-white'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="tbl w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Project</th>
              <th>Type</th>
              <th>Deadline</th>
              <th>Assigned</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td className="font-mono text-xs text-white/30">{p.id}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-gold-grad rounded-lg flex items-center justify-center text-[0.6rem] font-bold text-hap-bg">
                      {p.brand.split(' ').map(w=>w[0]).join('').slice(0,2)}
                    </div>
                    <span className="text-sm text-white font-medium">{p.brand}</span>
                  </div>
                </td>
                <td className="text-white/70 font-medium max-w-[180px] truncate">{p.name}</td>
                <td className="text-xs text-white/40 max-w-[140px]">{p.contentType.split(' ').slice(0,3).join(' ')}</td>
                <td className="text-xs text-white/40">{fmtDate(p.deadline)}</td>
                <td>
                  <select value={p.assignee || ''} onChange={e => assign(p.id, e.target.value)}
                    className="bg-hap-surface2 border border-hap-border text-white/60 text-xs rounded-lg px-2.5 py-1.5 outline-none hover:border-hap-borderl transition-colors cursor-pointer">
                    <option value="">Unassigned</option>
                    {MOCK_TEAM.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                  </select>
                </td>
                <td><Badge variant={statusVariant[p.status]}>{p.status}</Badge></td>
                <td>
                  <Link to={`/production/projects/${p.id}`} className="text-xs text-gold hover:text-gold-hover font-medium no-underline transition-colors">
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-white/25 text-sm">No projects match your filters.</div>
        )}
      </div>
    </ProductionLayout>
  )
}
