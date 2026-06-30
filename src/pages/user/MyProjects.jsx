import { Link } from 'react-router-dom'
import UserLayout from '../../components/layout/UserLayout'
import Badge from '../../components/ui/Badge'
import { MOCK_PROJECTS } from '../../data/mockData'

export default function MyProjects() {
  return (
    <UserLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-1">My Projects</h1>
          <p className="text-white/40 text-sm">Content and creative service projects.</p>
        </div>
        <Link to="/services" className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-gold no-underline">
          + New Project
        </Link>
      </div>

      {MOCK_PROJECTS.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-white/25 mb-4">No projects yet.</p>
          <Link to="/services" className="text-sm text-gold hover:underline">Explore Creative Services →</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {MOCK_PROJECTS.map(p => (
            <div key={p.id} className="card hover:border-gold/20 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-hap-surface2 border border-hap-border rounded-xl flex items-center justify-center text-xl flex-shrink-0">📁</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-white">{p.title || p.name}</h3>
                    <Badge variant={/complete/i.test(p.status) ? 'success' : /review/i.test(p.status) ? 'warning' : /progress/i.test(p.status) ? 'info' : 'muted'}>
                      {p.status || '—'}
                    </Badge>
                  </div>
                  <p className="text-xs text-white/35 mb-2">{p.contentType || p.type} · {p.platform || 'Multiple platforms'}</p>
                  <div className="w-full h-1.5 bg-hap-surface3 rounded-full overflow-hidden">
                    <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${p.progress || 0}%` }} />
                  </div>
                  <p className="text-[0.65rem] text-white/20 mt-1">{p.progress || 0}% complete</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </UserLayout>
  )
}
