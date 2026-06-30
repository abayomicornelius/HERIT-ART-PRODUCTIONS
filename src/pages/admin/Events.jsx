import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Badge from '../../components/ui/Badge'
import { PRODUCTIONS } from '../../data/productions'

const SALES = [
  { event:'1960 — The Musical', vip:12, premium:145, regular:255, total:412, revenue:8240000 },
  { event:'Echoes of the Motherland', vip:0, premium:0, regular:0, total:0, revenue:0 },
  { event:'Drums of Sankofa (Past)', vip:80, premium:600, regular:1320, total:2000, revenue:40000000 },
]

export default function AdminEvents() {
  const [tab, setTab] = useState('sales')

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl font-bold text-white mb-1">Events & Ticketing</h1><p className="text-white/40 text-sm">Manage event tickets, sales and access control.</p></div>
        <button className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-gold">+ Create Event</button>
      </div>

      <div className="flex gap-2 mb-6">
        {['sales','scan'].map(t => <button key={t} onClick={() => setTab(t)} className={`tab-item capitalize ${tab===t?'active':''}`}>{t === 'scan' ? 'Ticket Scanner' : 'Sales Overview'}</button>)}
      </div>

      {tab === 'sales' && (
        <div className="card overflow-hidden p-0">
          <div className="p-5 border-b border-hap-border">
            <h3 className="font-display text-lg font-bold text-white">Ticket Sales by Event</h3>
          </div>
          <table className="tbl w-full">
            <thead>
              <tr>
                <th>Event</th><th>VIP</th><th>Premium</th><th>Regular</th><th>Total</th><th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {SALES.map(s => (
                <tr key={s.event}>
                  <td className="font-medium text-white">{s.event}</td>
                  <td>{s.vip}</td>
                  <td>{s.premium}</td>
                  <td>{s.regular}</td>
                  <td className="text-gold font-bold">{s.total.toLocaleString()}</td>
                  <td className="text-gold font-bold">₦{(s.revenue/1000000).toFixed(1)}M</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'scan' && (
        <div className="max-w-sm mx-auto">
          <div className="card text-center py-10">
            <div className="w-20 h-20 border-2 border-dashed border-gold/30 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-5">📷</div>
            <h3 className="font-display text-xl font-bold text-white mb-2">QR Code Scanner</h3>
            <p className="text-sm text-white/35 mb-5">Use device camera to scan attendee tickets at the venue entrance.</p>
            <button className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-8 py-3 rounded-xl text-sm transition-all hover:shadow-gold">Activate Scanner</button>
            <p className="text-xs text-white/20 mt-4">Requires camera permission</p>
          </div>
          <div className="card mt-4">
            <h4 className="font-semibold text-white mb-3 text-sm">Manually Check Ticket</h4>
            <div className="flex gap-2">
              <input placeholder="Enter reference number…" className="input flex-1 text-sm" />
              <button className="bg-hap-surface2 border border-hap-border text-white/60 hover:text-white px-4 py-2 rounded-xl text-sm transition-all">Check</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
