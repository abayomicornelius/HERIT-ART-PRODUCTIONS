import { useState } from 'react'
import ProductionLayout from '../../components/layout/ProductionLayout'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import { MOCK_BRANDS, MOCK_PROJECTS } from '../../data/mockData'

function fmtDate(s) { return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
const planVariant = { Enterprise: 'gold', Growth: 'info', Starter: 'muted' }
const statusVariant = { Pending: 'warning', 'In Progress': 'info', Completed: 'success' }

export default function Brands() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = MOCK_BRANDS.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.contact.toLowerCase().includes(search.toLowerCase())
  )

  const brandProjects = selected
    ? MOCK_PROJECTS.filter(p => p.brand === selected.name)
    : []

  return (
    <ProductionLayout title="Brands" subtitle="All registered brand clients">

      {/* Search */}
      <div className="relative max-w-xs mb-5">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search brands…" className="input pl-9" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(b => (
          <button key={b.id} onClick={() => setSelected(b)} className="card text-left hover:border-gold/30 transition-all hover:-translate-y-0.5 cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-gold-grad rounded-xl flex items-center justify-center font-bold text-hap-bg text-sm flex-shrink-0">
                {b.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{b.name}</p>
                <p className="text-xs text-white/30 truncate">{b.contact}</p>
              </div>
              <Badge variant={b.status === 'Active' ? 'success' : 'muted'}>{b.status}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-hap-border">
              <div>
                <p className="text-[0.65rem] text-white/25 uppercase tracking-wider mb-0.5">Plan</p>
                <Badge variant={planVariant[b.plan] || 'muted'}>{b.plan}</Badge>
              </div>
              <div>
                <p className="text-[0.65rem] text-white/25 uppercase tracking-wider mb-0.5">Active Projects</p>
                <p className="font-display text-xl font-bold text-white">{b.activeProjects}</p>
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-16 text-white/25 text-sm">No brands match your search.</div>
        )}
      </div>

      {/* Brand detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name} size="lg">
        {selected && (
          <div className="space-y-5">
            {/* Profile */}
            <div className="flex items-center gap-4 pb-5 border-b border-hap-border">
              <div className="w-14 h-14 bg-gold-grad rounded-2xl flex items-center justify-center text-lg font-bold text-hap-bg">
                {selected.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{selected.name}</h3>
                <p className="text-sm text-white/40">{selected.contact}</p>
              </div>
              <div className="ml-auto flex gap-2">
                <Badge variant={planVariant[selected.plan] || 'muted'}>{selected.plan} Plan</Badge>
                <Badge variant={selected.status === 'Active' ? 'success' : 'muted'}>{selected.status}</Badge>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Active Projects', value: selected.activeProjects },
                { label: 'Total Delivered', value: brandProjects.filter(p=>p.status==='Completed').length },
                { label: 'Payment Status', value: 'Paid' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-hap-surface2 border border-hap-border rounded-xl p-3 text-center">
                  <p className="font-display text-2xl font-bold text-white mb-0.5">{value}</p>
                  <p className="text-[0.65rem] text-white/30 uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>

            {/* Content history */}
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm">Content History</h4>
              {brandProjects.length > 0 ? (
                <div className="space-y-2">
                  {brandProjects.map(p => (
                    <div key={p.id} className="flex items-center gap-3 p-3 bg-hap-surface2 rounded-xl border border-hap-border">
                      <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center text-sm">🎬</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{p.name}</p>
                        <p className="text-xs text-white/30">{fmtDate(p.created)}</p>
                      </div>
                      <Badge variant={statusVariant[p.status]}>{p.status}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/25 text-center py-6">No projects from this brand yet.</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </ProductionLayout>
  )
}
