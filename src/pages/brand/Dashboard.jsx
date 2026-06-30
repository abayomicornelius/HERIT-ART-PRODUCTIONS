import { Link, useNavigate } from 'react-router-dom'
import BrandLayout from '../../components/layout/BrandLayout'
import Badge from '../../components/ui/Badge'
import { MOCK_PROJECTS, SUBSCRIPTION_PLANS } from '../../data/mockData'
import { useAuth } from '../../context/AuthContext'

function fmtDate(s) { return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }

const statusVariant = { Pending: 'warning', 'In Progress': 'info', Completed: 'success' }

export default function BrandDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const projects = MOCK_PROJECTS
  const active   = projects.filter(p => p.status === 'In Progress').length
  const pending  = projects.filter(p => p.status === 'Pending').length
  const done     = projects.filter(p => p.status === 'Completed').length
  const plan     = SUBSCRIPTION_PLANS.find(p => p.id === user?.plan)

  return (
    <BrandLayout
      title={`Welcome back${user?.name ? `, ${user.name.split(' ')[0]}` : ''} 👋`}
      subtitle="Here's a summary of your content projects"
      actions={
        <Link to="/brand/projects/new"
          className="bg-gold hover:bg-gold-hover text-hap-bg text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:shadow-gold hover:-translate-y-0.5 flex items-center gap-2">
          <span className="text-lg leading-none">+</span> Create Project
        </Link>
      }>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Projects',   value: active, icon: '🎬', color: 'bg-blue-400/10 text-blue-400',   change: '+1 this week' },
          { label: 'Pending Review',    value: pending, icon: '⏳', color: 'bg-amber-400/10 text-amber-400', change: 'Awaiting start' },
          { label: 'Completed',         value: done,   icon: '✅', color: 'bg-green-500/10 text-green-400',  change: 'All time' },
          { label: 'Total Projects',    value: projects.length, icon: '📁', color: 'bg-gold/10 text-gold', change: 'All time' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3 ${s.color}`}>{s.icon}</div>
            <p className="text-[0.7rem] text-white/30 font-bold uppercase tracking-widest mb-1">{s.label}</p>
            <p className="font-display text-3xl font-bold text-white mb-1">{s.value}</p>
            <p className="text-xs text-white/25">{s.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent projects */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-white">Recent Projects</h3>
            <Link to="/brand/projects" className="text-xs text-gold hover:text-gold-hover transition-colors">View all →</Link>
          </div>
          <div className="space-y-3">
            {projects.slice(0, 4).map(p => (
              <Link key={p.id} to={`/brand/projects/${p.id}`}
                className="flex items-center gap-4 p-4 bg-hap-surface2 rounded-xl hover:bg-hap-surface3 border border-hap-border hover:border-hap-borderl transition-all no-underline group">
                <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-lg flex-shrink-0">🎬</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm truncate group-hover:text-gold transition-colors">{p.name}</p>
                  <p className="text-xs text-white/30 mt-0.5">{p.contentType} · Due {fmtDate(p.deadline)}</p>
                </div>
                <Badge variant={statusVariant[p.status]}>{p.status}</Badge>
              </Link>
            ))}
          </div>
          {projects.length === 0 && (
            <div className="text-center py-12">
              <span className="text-4xl block mb-3 opacity-30">📂</span>
              <p className="text-white/30 text-sm">No projects yet</p>
              <Link to="/brand/projects/new" className="text-gold text-sm mt-2 inline-block hover:underline">Create your first project</Link>
            </div>
          )}
        </div>

        {/* Sidebar widgets */}
        <div className="space-y-5">
          {/* Subscription */}
          <div className="card">
            <h3 className="font-semibold text-white mb-4">Subscription</h3>
            {plan ? (
              <>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-white/60">{plan.name} Plan</span>
                  <Badge variant="success">Active</Badge>
                </div>
                <p className="font-display text-2xl font-bold text-gold mb-1">{plan.price}<span className="text-xs font-sans text-white/30 font-normal">/mo</span></p>
                <div className="mt-4 pt-4 border-t border-hap-border">
                  <div className="flex items-center justify-between text-xs text-white/30 mb-2">
                    <span>Projects used</span><span>{active}/{plan.id === 'starter' ? 2 : plan.id === 'growth' ? 5 : '∞'}</span>
                  </div>
                  <div className="h-1.5 bg-hap-surface3 rounded-full overflow-hidden">
                    <div className="h-full bg-gold-h rounded-full" style={{ width: `${Math.min((active / (plan.id === 'starter' ? 2 : 5)) * 100, 100)}%` }} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-white/40 mb-4">No active subscription. Choose a plan to unlock full access.</p>
                <Link to="/brand/subscription" className="block text-center bg-gold hover:bg-gold-hover text-hap-bg font-bold py-2.5 rounded-xl text-sm transition-all hover:shadow-gold">
                  Choose Plan
                </Link>
              </>
            )}
          </div>

          {/* Quick actions */}
          <div className="card">
            <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'New Project Brief', to: '/brand/projects/new', icon: '✚' },
                { label: 'View Team', to: '/brand/team', icon: '👥' },
                { label: 'Manage Subscription', to: '/brand/subscription', icon: '💳' },
              ].map(a => (
                <Link key={a.label} to={a.to}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-hap-surface2 border border-hap-border hover:border-hap-borderl transition-all no-underline">
                  <span className="text-base">{a.icon}</span>
                  <span className="text-sm text-white/60 hover:text-white transition-colors">{a.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrandLayout>
  )
}
