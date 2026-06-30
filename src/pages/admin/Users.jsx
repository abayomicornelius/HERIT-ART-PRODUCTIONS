import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import { useToast } from '../../context/ToastContext'

const MOCK_USERS = [
  { id:'usr-001', name:'Ada Okonkwo', email:'ada@email.com', phone:'+234 803 000 0001', type:'audience', joined:'2026-05-10', status:'active', spent:260000, tickets:3, bookings:1 },
  { id:'usr-002', name:'Emeka Films Ltd', email:'emeka@emekafilms.com', phone:'+234 803 000 0002', type:'brand', joined:'2026-04-20', status:'active', spent:580000, tickets:0, bookings:4 },
  { id:'usr-003', name:'Sade Okonkwo', email:'sade@music.com', phone:'+234 803 000 0003', type:'creative', joined:'2026-03-15', status:'active', spent:80000, tickets:1, bookings:2 },
  { id:'usr-004', name:'Kofi Mensah', email:'kofi@acting.com', phone:'+233 244 000 004', type:'creative', joined:'2026-02-28', status:'active', spent:10000, tickets:1, bookings:0 },
  { id:'usr-005', name:'FreshBrew Agency', email:'hello@freshbrew.ng', phone:'+234 803 000 0005', type:'brand', joined:'2026-06-01', status:'pending', spent:0, tickets:0, bookings:0 },
  { id:'usr-006', name:'Ngozi Okafor', email:'ngozi@writing.com', phone:'+234 803 000 0006', type:'creative', joined:'2026-01-10', status:'suspended', spent:0, tickets:2, bookings:1 },
  { id:'usr-007', name:'CineVision Productions', email:'info@cinevision.ng', phone:'+234 803 000 0007', type:'brand', joined:'2026-05-25', status:'active', spent:395000, tickets:0, bookings:3 },
  { id:'usr-008', name:'Taiwo Adeyemi', email:'taiwo@dance.com', phone:'+234 803 000 0008', type:'creative', joined:'2026-04-05', status:'active', spent:25000, tickets:1, bookings:1 },
]

const TYPE_COLORS = { audience:'info', brand:'gold', creative:'warning', admin:'error' }
const STATUS_COLORS = { active:'success', pending:'warning', suspended:'error' }

export default function AdminUsers() {
  const toast = useToast()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [viewing, setViewing] = useState(null)
  const [users, setUsers] = useState(MOCK_USERS)

  const filtered = users.filter(u =>
    (typeFilter === 'all' || u.type === typeFilter) &&
    (statusFilter === 'all' || u.status === statusFilter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) ||
     u.email.toLowerCase().includes(search.toLowerCase()))
  )

  function setStatus(id, status) {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u))
    const labels = { active:'activated', suspended:'suspended', pending:'set to pending' }
    toast.success(`User ${labels[status] || status}`)
    setViewing(v => v ? { ...v, status } : null)
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-1">User Management</h1>
        <p className="text-white/40 text-sm">View, manage and moderate all platform accounts.</p>
      </div>

      {/* Summary */}
      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        {[
          { label:'Total Users', value: users.length, color:'text-white' },
          { label:'Audience', value: users.filter(u=>u.type==='audience').length, color:'text-blue-400' },
          { label:'Brands', value: users.filter(u=>u.type==='brand').length, color:'text-gold' },
          { label:'Creatives', value: users.filter(u=>u.type==='creative').length, color:'text-yellow-400' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <p className={`font-display text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-white/30 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or email…" className="input pl-9" />
        </div>
        <div className="flex gap-2">
          {['all','audience','brand','creative'].map(t => (
            <button key={t} onClick={()=>setTypeFilter(t)} className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${typeFilter===t?'bg-gold text-hap-bg':'bg-hap-surface border border-hap-border text-white/40 hover:text-white'}`}>{t}</button>
          ))}
        </div>
        <div className="flex gap-2">
          {['all','active','pending','suspended'].map(s => (
            <button key={s} onClick={()=>setStatusFilter(s)} className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${statusFilter===s?'bg-hap-surface2 border border-gold/30 text-gold':'bg-hap-surface border border-hap-border text-white/40 hover:text-white'}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden p-0">
        <table className="tbl w-full">
          <thead>
            <tr><th>User</th><th>Type</th><th>Joined</th><th>Spent</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-xs font-bold text-gold flex-shrink-0">{u.name[0]}</div>
                    <div>
                      <p className="font-medium text-white text-sm">{u.name}</p>
                      <p className="text-xs text-white/30">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td><Badge variant={TYPE_COLORS[u.type] || 'muted'}>{u.type}</Badge></td>
                <td className="text-white/40 text-xs">{new Date(u.joined).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</td>
                <td className="text-gold font-bold">₦{u.spent.toLocaleString()}</td>
                <td><Badge variant={STATUS_COLORS[u.status] || 'muted'}>{u.status}</Badge></td>
                <td>
                  <div className="flex gap-1.5">
                    <button onClick={() => setViewing(u)} className="text-xs border border-hap-border text-white/40 hover:text-white px-2.5 py-1 rounded-lg transition-all">View</button>
                    {u.status !== 'suspended' ? (
                      <button onClick={() => setStatus(u.id,'suspended')} className="text-xs bg-red-500/10 text-red-400/70 border border-red-500/20 hover:text-red-400 px-2.5 py-1 rounded-lg transition-all">Suspend</button>
                    ) : (
                      <button onClick={() => setStatus(u.id,'active')} className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-lg transition-all">Activate</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center py-10 text-white/25 text-sm">No users match your filter.</p>}
      </div>

      {/* User detail modal */}
      {viewing && (
        <Modal open={!!viewing} onClose={() => setViewing(null)} title="User Details"
          footer={
            <div className="flex items-center gap-2">
              {viewing.status !== 'suspended'
                ? <button onClick={() => setStatus(viewing.id,'suspended')} className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl">Suspend Account</button>
                : <button onClick={() => setStatus(viewing.id,'active')} className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-2 rounded-xl">Activate Account</button>
              }
              <button onClick={() => setViewing(null)} className="text-sm text-white/40 hover:text-white px-4 py-2 rounded-xl ml-auto">Close</button>
            </div>
          }>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-hap-surface2 border border-hap-border rounded-xl">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-2xl font-bold text-gold">{viewing.name[0]}</div>
              <div>
                <p className="font-semibold text-white">{viewing.name}</p>
                <p className="text-xs text-white/40">{viewing.email}</p>
                <p className="text-xs text-white/30">{viewing.phone}</p>
              </div>
              <div className="ml-auto">
                <Badge variant={STATUS_COLORS[viewing.status]}>{viewing.status}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[['Account Type', viewing.type],['Total Spent','₦'+viewing.spent.toLocaleString()],['Joined', new Date(viewing.joined).toLocaleDateString('en-GB',{month:'short',year:'numeric'})]].map(([l,v]) => (
                <div key={l} className="bg-hap-surface2 border border-hap-border rounded-xl p-3 text-center">
                  <p className="text-xs text-white/25 mb-1">{l}</p>
                  <p className="font-bold text-white text-sm capitalize">{v}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[['Tickets Purchased', viewing.tickets],['Bookings Made', viewing.bookings]].map(([l,v]) => (
                <div key={l} className="bg-hap-surface2 border border-hap-border rounded-xl p-3 text-center">
                  <p className="text-xs text-white/25 mb-1">{l}</p>
                  <p className="font-bold text-gold text-xl">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  )
}
