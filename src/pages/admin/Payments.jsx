import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Badge from '../../components/ui/Badge'

const ALL_PAYMENTS = [
  { id:'PAY-1001', ref:'HAP-882741', user:'Ada Okonkwo', type:'Tickets', description:'2x Premium — 1960 The Musical', amount:50000, method:'Paystack', status:'success', date:'2026-06-20' },
  { id:'PAY-1002', ref:'HAP-STU-9921', user:'Emeka Films Ltd', type:'Studio Booking', description:'H.ART Visual Studio — Full Day', amount:200000, method:'Flutterwave', status:'success', date:'2026-06-15' },
  { id:'PAY-1003', ref:'HAP-119023', user:'Ada Okonkwo', type:'Tickets', description:'1x Regular — Echoes of the Motherland', amount:10000, method:'Paystack', status:'success', date:'2026-06-10' },
  { id:'PAY-1004', ref:'HAP-RNT-4432', user:'CineVision Productions', type:'Equipment Rental', description:'RED Komodo 6K — 3 days', amount:120000, method:'Bank Transfer', status:'pending', date:'2026-06-08' },
  { id:'PAY-1005', ref:'HAP-AUD-7701', user:'Sade Okonkwo', type:'Audio Services', description:'H.ART Audio Studio — Recording Session', amount:80000, method:'Paystack', status:'success', date:'2026-06-05' },
  { id:'PAY-1006', ref:'HAP-COS-2211', user:'Amaka Productions', type:'Costume Rental', description:'Yoruba Royal Regalia — 3 days', amount:60000, method:'Flutterwave', status:'success', date:'2026-06-01' },
  { id:'PAY-1007', ref:'HAP-PRJ-8831', user:'FreshBrew Agency', type:'Creative Project', description:'Brand Video Campaign Package', amount:850000, method:'Bank Transfer', status:'success', date:'2026-05-28' },
  { id:'PAY-1008', ref:'HAP-TKT-5543', user:'Kofi Mensah', type:'Tickets', description:'1x VIP — Drums of Sankofa', amount:40000, method:'Paystack', status:'success', date:'2026-05-15' },
  { id:'PAY-1009', ref:'HAP-STU-3312', user:'Taiwo Dance', type:'Studio Booking', description:'Rehearsal Space — Dance Studio (4hrs)', amount:50000, method:'Paystack', status:'refunded', date:'2026-05-10' },
  { id:'PAY-1010', ref:'HAP-NET-6612', user:'Story Inc', type:'Creative Project', description:'Photographer Day Rate', amount:75000, method:'Paystack', status:'success', date:'2026-05-05' },
]

const PAYMENT_TYPES = ['All Types', 'Tickets', 'Studio Booking', 'Equipment Rental', 'Costume Rental', 'Audio Services', 'Creative Project']
const METHOD_ICONS = { Paystack:'💳', Flutterwave:'🦋', 'Bank Transfer':'🏦' }

export default function AdminPayments() {
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = ALL_PAYMENTS.filter(p =>
    (typeFilter === 'All Types' || p.type === typeFilter) &&
    (statusFilter === 'all' || p.status === statusFilter) &&
    (p.user.toLowerCase().includes(search.toLowerCase()) ||
     p.ref.toLowerCase().includes(search.toLowerCase()) ||
     p.description.toLowerCase().includes(search.toLowerCase()))
  )

  const totalRevenue = ALL_PAYMENTS.filter(p=>p.status==='success').reduce((s,p)=>s+p.amount,0)
  const pendingAmt   = ALL_PAYMENTS.filter(p=>p.status==='pending').reduce((s,p)=>s+p.amount,0)
  const refundedAmt  = ALL_PAYMENTS.filter(p=>p.status==='refunded').reduce((s,p)=>s+p.amount,0)

  // Revenue by type
  const byType = PAYMENT_TYPES.slice(1).map(t => ({
    type: t,
    total: ALL_PAYMENTS.filter(p=>p.type===t && p.status==='success').reduce((s,p)=>s+p.amount,0),
  })).filter(x=>x.total>0).sort((a,b)=>b.total-a.total)
  const maxTypeTotal = byType[0]?.total || 1

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-1">Payment Management</h1>
          <p className="text-white/40 text-sm">All platform transactions and revenue tracking.</p>
        </div>
        <button className="text-xs border border-hap-border text-white/40 hover:text-white px-5 py-2.5 rounded-xl transition-all">Export CSV</button>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="stat-card">
          <p className="text-xs text-white/30 mb-1">Total Revenue (Confirmed)</p>
          <p className="font-display text-2xl font-bold text-gold">₦{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs text-white/30 mb-1">Pending Payments</p>
          <p className="font-display text-2xl font-bold text-yellow-400">₦{pendingAmt.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs text-white/30 mb-1">Refunded</p>
          <p className="font-display text-2xl font-bold text-red-400">₦{refundedAmt.toLocaleString()}</p>
        </div>
      </div>

      {/* Revenue by service type */}
      <div className="card mb-8">
        <h3 className="font-display text-base font-bold text-white mb-5">Revenue by Service Type</h3>
        <div className="space-y-3">
          {byType.map(b => (
            <div key={b.type}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-white/60">{b.type}</span>
                <span className="text-gold font-bold">₦{b.total.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-hap-surface3 rounded-full overflow-hidden">
                <div className="h-full bg-gold rounded-full transition-all" style={{ width:`${(b.total/maxTypeTotal)*100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search user, ref or description…" className="input pl-9" />
        </div>
        <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} className="input max-w-xs">
          {PAYMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <div className="flex gap-2">
          {['all','success','pending','refunded'].map(s => (
            <button key={s} onClick={()=>setStatusFilter(s)} className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${statusFilter===s?'bg-gold text-hap-bg':'bg-hap-surface border border-hap-border text-white/40 hover:text-white'}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Transactions table */}
      <div className="card overflow-hidden p-0">
        <table className="tbl w-full">
          <thead>
            <tr><th>Reference</th><th>User</th><th>Service</th><th>Description</th><th>Method</th><th>Date</th><th>Amount</th><th>Status</th></tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td className="font-mono text-xs text-white/35">{p.ref}</td>
                <td className="text-white/60">{p.user}</td>
                <td><span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-hap-surface3 text-white/40 border border-hap-border">{p.type}</span></td>
                <td className="text-white/50 max-w-[180px] truncate">{p.description}</td>
                <td><span className="flex items-center gap-1 text-xs text-white/40">{METHOD_ICONS[p.method]} {p.method}</span></td>
                <td className="text-white/40 text-xs">{new Date(p.date).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</td>
                <td className="text-gold font-bold">₦{p.amount.toLocaleString()}</td>
                <td><Badge variant={p.status==='success'?'success':p.status==='pending'?'warning':'error'}>{p.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center py-10 text-white/25 text-sm">No transactions found.</p>}
        <div className="p-4 border-t border-hap-border flex justify-between items-center">
          <p className="text-xs text-white/25">{filtered.length} transactions</p>
          <p className="text-xs text-white/40">Filtered total: <span className="text-gold font-bold">₦{filtered.filter(p=>p.status==='success').reduce((s,p)=>s+p.amount,0).toLocaleString()}</span></p>
        </div>
      </div>
    </AdminLayout>
  )
}
