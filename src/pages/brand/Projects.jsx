import { useState } from 'react'
import { Link } from 'react-router-dom'
import BrandLayout from '../../components/layout/BrandLayout'
import Badge from '../../components/ui/Badge'
import { MOCK_PROJECTS } from '../../data/mockData'

const statusVariant = { Pending: 'warning', 'In Progress': 'info', Completed: 'success' }
function fmtDate(s) { return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }

export default function Projects() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const statuses = ['All', 'Pending', 'In Progress', 'Completed']
  const filtered = MOCK_PROJECTS.filter(p => {
    const matchStatus = filter === 'All' || p.status === filter
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.contentType.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <BrandLayout title="Projects" subtitle="All your content project briefs"
      actions={
        <Link to="/brand/projects/new"
          className="bg-gold hover:bg-gold-hover text-hap-bg text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:shadow-gold flex items-center gap-2">
          <span className="text-lg leading-none">+</span> New Project
        </Link>
      }>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search projects…" className="input pl-9" />
        </div>
        <div className="flex items-center gap-1 bg-hap-surface border border-hap-border rounded-xl p-1">
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === s ? 'bg-gold text-hap-bg' : 'text-white/40 hover:text-white'
              }`}>{s}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <span className="text-5xl block mb-4 opacity-30">📂</span>
          <p className="font-display text-xl font-bold text-white mb-2">No projects found</p>
          <p className="text-white/30 text-sm mb-6">{search ? 'Try a different search term.' : 'Start by creating your first project brief.'}</p>
          <Link to="/brand/projects/new" className="inline-block bg-gold hover:bg-gold-hover text-hap-bg font-bold px-6 py-3 rounded-xl text-sm transition-all hover:shadow-gold">
            Create First Project
          </Link>
        </div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <table className="tbl w-full">
            <thead>
              <tr>
                <th>Project</th>
                <th>Content Type</th>
                <th>Date Issued</th>
                <th>Deadline</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center text-sm flex-shrink-0">🎬</div>
                      <span className="text-white font-medium text-sm">{p.name}</span>
                    </div>
                  </td>
                  <td className="text-white/50 text-xs">{p.contentType}</td>
                  <td className="text-white/40 text-xs">{fmtDate(p.created)}</td>
                  <td className="text-white/40 text-xs">{fmtDate(p.deadline)}</td>
                  <td><Badge variant={statusVariant[p.status]}>{p.status}</Badge></td>
                  <td>
                    <Link to={p.status === 'Completed' ? `/brand/projects/${p.id}/review` : `/brand/projects/${p.id}`}
                      className="text-xs text-gold hover:text-gold-hover font-medium transition-colors no-underline">
                      {p.status === 'Completed' ? 'View Content →' : 'View →'}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </BrandLayout>
  )
}
