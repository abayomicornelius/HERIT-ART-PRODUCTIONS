import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Badge from '../../components/ui/Badge'
import { CREATIVES, CATEGORIES } from '../../data/creatives'
import { useToast } from '../../context/ToastContext'

const PENDING = [
  { id:'app-001', name:'Chike Nwosu', category:'Actor', location:'Abuja, Nigeria', submittedAt:'2 days ago', experience:'3–5 years' },
  { id:'app-002', name:'Adaeze Obi', category:'Dancer', location:'Port Harcourt', submittedAt:'5 days ago', experience:'6–10 years' },
  { id:'app-003', name:'Kwame Asante', category:'Cinematographer', location:'Accra, Ghana', submittedAt:'1 week ago', experience:'10+ years' },
]

export default function AdminCreatives() {
  const toast = useToast()
  const [tab, setTab] = useState('members')
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')

  const filtered = CREATIVES.filter(c =>
    (cat==='All' || c.category===cat) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  function approve(name) { toast.success(`${name}'s profile approved and published!`) }
  function reject(name) { toast.error(`${name}'s application rejected.`) }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl font-bold text-white mb-1">Creative Network</h1><p className="text-white/40 text-sm">Approve profiles, manage applications and network members.</p></div>
        <div className="flex items-center gap-2 text-xs">
          <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1.5 rounded-xl font-bold">{PENDING.length} Pending</span>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {['members','applications'].map(t => <button key={t} onClick={() => setTab(t)} className={`tab-item capitalize ${tab===t?'active':''}`}>{t}</button>)}
      </div>

      {tab === 'members' && (
        <>
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search creatives…" className="input pl-9" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['All', ...CATEGORIES.slice(0,5)].map(c => (
                <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${cat===c?'bg-gold text-hap-bg':'bg-hap-surface border border-hap-border text-white/40 hover:text-white'}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="card overflow-hidden p-0">
            <table className="tbl w-full">
              <thead><tr><th>Creative</th><th>Category</th><th>Location</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-hap-bg text-sm flex-shrink-0" style={{ background: `linear-gradient(135deg, ${c.color}99, ${c.color})` }}>{c.avatar}</div>
                        <div>
                          <p className="font-medium text-white text-sm">{c.name}</p>
                          {c.verified && <p className="text-[0.6rem] text-gold">✦ HERIT Verified</p>}
                        </div>
                      </div>
                    </td>
                    <td>{c.category}</td>
                    <td>{c.location}</td>
                    <td><Badge variant={c.available?'success':'muted'}>{c.available?'Available':'Unavailable'}</Badge></td>
                    <td>
                      <div className="flex gap-1">
                        <button className="text-xs border border-hap-border text-white/40 hover:text-white px-2 py-1 rounded-lg transition-all">View</button>
                        <button className="text-xs border border-hap-border text-white/40 hover:text-white px-2 py-1 rounded-lg transition-all">Message</button>
                        {c.verified && <button className="text-xs border border-red-500/20 text-red-400/60 hover:text-red-400 px-2 py-1 rounded-lg transition-all">Remove</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'applications' && (
        <div className="space-y-4">
          {PENDING.length === 0 ? (
            <div className="card text-center py-12 text-white/25">No pending applications.</div>
          ) : PENDING.map(a => (
            <div key={a.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-hap-surface2 border border-hap-border flex items-center justify-center font-bold text-white text-lg flex-shrink-0">{a.name[0]}</div>
                  <div>
                    <h3 className="font-semibold text-white">{a.name}</h3>
                    <p className="text-xs text-white/40">{a.category} · {a.location}</p>
                    <p className="text-xs text-white/25">{a.experience} experience · Applied {a.submittedAt}</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button className="text-xs border border-hap-border text-white/40 hover:text-white px-3 py-1.5 rounded-lg transition-all">View Profile</button>
                  <button onClick={() => approve(a.name)} className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 px-3 py-1.5 rounded-lg transition-all">Approve</button>
                  <button onClick={() => reject(a.name)} className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-all">Reject</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
