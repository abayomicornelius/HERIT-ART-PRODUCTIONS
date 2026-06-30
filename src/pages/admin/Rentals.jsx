import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Badge from '../../components/ui/Badge'
import { RENTALS, RENTAL_CATEGORIES } from '../../data/rentals'

const RENTAL_REQUESTS = [
  { item:'RED Komodo 6K Camera Kit', client:'Emeka Films Ltd', dates:'Jul 5–7, 2026', days:3, amount:240000, status:'pending' },
  { item:'Full LED Studio Lighting', client:'Obi Creative Agency', dates:'Jul 10–11, 2026', days:2, amount:120000, status:'approved' },
  { item:'PA System (2000W)', client:'Events Plus', dates:'Jun 25, 2026', days:1, amount:50000, status:'returned' },
]

export default function AdminRentals() {
  const [tab, setTab] = useState('inventory')
  const [search, setSearch] = useState('')
  const filtered = RENTALS.filter(r => r.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl font-bold text-white mb-1">Equipment Rentals</h1><p className="text-white/40 text-sm">Manage inventory, availability and rental requests.</p></div>
        <button className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-gold">+ Add Item</button>
      </div>

      <div className="flex gap-2 mb-6">
        {['inventory','requests'].map(t => <button key={t} onClick={() => setTab(t)} className={`tab-item capitalize ${tab===t?'active':''}`}>{t === 'requests' ? 'Rental Requests' : 'Inventory'}</button>)}
      </div>

      {tab === 'inventory' && (
        <>
          <div className="relative mb-4 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search inventory…" className="input pl-9" />
          </div>
          <div className="card overflow-hidden p-0">
            <table className="tbl w-full">
              <thead><tr><th>Item</th><th>Category</th><th>Day Rate</th><th>Deposit</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td><div className="flex items-center gap-2"><span>{r.icon}</span><span className="font-medium text-white text-sm">{r.name}</span></div></td>
                    <td>{r.category}</td>
                    <td className="text-gold font-bold">₦{r.pricePerDay.toLocaleString()}</td>
                    <td>₦{r.deposit.toLocaleString()}</td>
                    <td><Badge variant={r.available?'success':'error'}>{r.available?'Available':'Booked'}</Badge></td>
                    <td>
                      <div className="flex gap-1">
                        <button className="text-xs border border-hap-border text-white/40 hover:text-white px-2 py-1 rounded-lg transition-all">Edit</button>
                        <button className="text-xs border border-hap-border text-white/40 hover:text-white px-2 py-1 rounded-lg transition-all">{r.available?'Mark Unavail.':'Mark Avail.'}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'requests' && (
        <div className="card overflow-hidden p-0">
          <table className="tbl w-full">
            <thead><tr><th>Item</th><th>Client</th><th>Dates</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {RENTAL_REQUESTS.map((r, i) => (
                <tr key={i}>
                  <td className="font-medium text-white text-sm">{r.item}</td>
                  <td>{r.client}</td>
                  <td>{r.dates}</td>
                  <td className="text-gold font-bold">₦{r.amount.toLocaleString()}</td>
                  <td><Badge variant={r.status==='approved'?'success':r.status==='returned'?'muted':'warning'}>{r.status}</Badge></td>
                  <td>
                    {r.status === 'pending' && (
                      <div className="flex gap-1">
                        <button className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded-lg">Approve</button>
                        <button className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded-lg">Decline</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  )
}
