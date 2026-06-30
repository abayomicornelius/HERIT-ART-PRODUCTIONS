import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Badge from '../../components/ui/Badge'
import Modal from '../../components/ui/Modal'
import { COSTUMES, COSTUME_CATEGORIES } from '../../data/costumes'
import { useToast } from '../../context/ToastContext'

const RENTAL_REQUESTS = [
  { item:'Nigerian Independence Era Suit', client:'Nneka Productions', dates:'Jul 8–10, 2026', days:3, amount:45000, status:'pending' },
  { item:'Yoruba Royal Regalia (Female)', client:'Silverline Films', dates:'Jul 15, 2026', days:1, amount:20000, status:'approved' },
  { item:'Masquerade Costume (Egungun)', client:'Stage Arts Lagos', dates:'Jun 25–27, 2026', days:3, amount:90000, status:'returned' },
]

export default function AdminCostumes() {
  const toast = useToast()
  const [tab, setTab] = useState('inventory')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ name:'', category:'', sizes:'', pricePerDay:'', deposit:'', description:'' })
  const set = k => e => setForm(p=>({...p,[k]:e.target.value}))

  function save() {
    if (!form.name || !form.category) { toast.error('Name and category required'); return }
    toast.success('Costume item added!')
    setShowAdd(false)
    setForm({ name:'', category:'', sizes:'', pricePerDay:'', deposit:'', description:'' })
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-1">Costume House</h1>
          <p className="text-white/40 text-sm">Manage costume inventory, rentals and requests.</p>
        </div>
        <button onClick={()=>setShowAdd(true)} className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-gold">+ Add Costume</button>
      </div>

      <div className="flex gap-2 mb-6">
        {['inventory','requests'].map(t => (
          <button key={t} onClick={()=>setTab(t)} className={`tab-item capitalize ${tab===t?'active':''}`}>{t === 'requests' ? 'Rental Requests' : 'Inventory'}</button>
        ))}
      </div>

      {tab === 'inventory' && (
        <div className="card overflow-hidden p-0">
          <table className="tbl w-full">
            <thead><tr><th>Costume</th><th>Category</th><th>Sizes</th><th>Day Rate</th><th>Deposit</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {COSTUMES.map(c => (
                <tr key={c.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{c.icon}</span>
                      <div>
                        <p className="font-medium text-white text-sm">{c.name}</p>
                        <p className="text-xs text-white/30 line-clamp-1">{c.description}</p>
                      </div>
                    </div>
                  </td>
                  <td>{c.category}</td>
                  <td className="text-white/40 text-xs">{c.sizes.join(', ')}</td>
                  <td className="text-gold font-bold">₦{c.pricePerDay.toLocaleString()}</td>
                  <td>₦{c.deposit.toLocaleString()}</td>
                  <td><Badge variant={c.available?'success':'error'}>{c.available?'Available':'Rented'}</Badge></td>
                  <td>
                    <div className="flex gap-1">
                      <button className="text-xs border border-hap-border text-white/40 hover:text-white px-2 py-1 rounded-lg">Edit</button>
                      <button onClick={()=>toast.success('Status updated!')} className="text-xs border border-hap-border text-white/40 hover:text-white px-2 py-1 rounded-lg">{c.available?'Mark Rented':'Mark Avail.'}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'requests' && (
        <div className="card overflow-hidden p-0">
          <table className="tbl w-full">
            <thead><tr><th>Costume</th><th>Client</th><th>Dates</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {RENTAL_REQUESTS.map((r, i) => (
                <tr key={i}>
                  <td className="font-medium text-white text-sm">{r.item}</td>
                  <td className="text-white/60">{r.client}</td>
                  <td className="text-white/40 text-xs">{r.dates}</td>
                  <td className="text-gold font-bold">₦{r.amount.toLocaleString()}</td>
                  <td><Badge variant={r.status==='approved'?'success':r.status==='returned'?'muted':'warning'}>{r.status}</Badge></td>
                  <td>
                    {r.status === 'pending' && (
                      <div className="flex gap-1">
                        <button onClick={()=>toast.success('Rental approved!')} className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded-lg">Approve</button>
                        <button onClick={()=>toast.error('Rental declined.')} className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded-lg">Decline</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={showAdd} onClose={()=>setShowAdd(false)} title="Add Costume Item"
        footer={
          <>
            <button onClick={()=>setShowAdd(false)} className="text-sm text-white/40 hover:text-white px-4 py-2 rounded-xl">Cancel</button>
            <button onClick={save} className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-6 py-2.5 rounded-xl text-sm">Save Item</button>
          </>
        }>
        <div className="space-y-4">
          <div><label className="block text-xs text-white/40 mb-1.5">Costume Name *</label><input value={form.name} onChange={set('name')} placeholder="e.g. Yoruba Royal Regalia" className="input" /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-xs text-white/40 mb-1.5">Category *</label>
              <select value={form.category} onChange={set('category')} className="input">
                <option value="">Select…</option>
                {COSTUME_CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div><label className="block text-xs text-white/40 mb-1.5">Available Sizes</label><input value={form.sizes} onChange={set('sizes')} placeholder="S, M, L, XL" className="input" /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-xs text-white/40 mb-1.5">Price Per Day (₦)</label><input type="number" value={form.pricePerDay} onChange={set('pricePerDay')} placeholder="15000" className="input" /></div>
            <div><label className="block text-xs text-white/40 mb-1.5">Deposit Amount (₦)</label><input type="number" value={form.deposit} onChange={set('deposit')} placeholder="50000" className="input" /></div>
          </div>
          <div><label className="block text-xs text-white/40 mb-1.5">Description</label><textarea value={form.description} onChange={set('description')} rows={3} className="input" placeholder="Describe the costume…" /></div>
        </div>
      </Modal>
    </AdminLayout>
  )
}
