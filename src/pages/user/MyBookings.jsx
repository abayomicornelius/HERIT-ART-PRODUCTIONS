import { useState } from 'react'
import UserLayout from '../../components/layout/UserLayout'

const BOOKINGS = [
  { id:'BK-001', type:'studio', name:'H.ART Visual Studio', pkg:'Full Day (8hrs)', date:'Jun 28, 2026', time:'9:00 AM', status:'confirmed', amount:200000, ref:'HAP-STU-9921' },
  { id:'BK-002', type:'rental', name:'RED Komodo 6K Camera Kit', pkg:'3-day rental', date:'Jul 5–7, 2026', time:'Pickup 9:00 AM', status:'pending', amount:240000, ref:'HAP-RNT-4432' },
  { id:'BK-003', type:'studio', name:'H.ART Audio Studio', pkg:'Recording Session (4hrs)', date:'May 10, 2026', time:'2:00 PM', status:'completed', amount:80000, ref:'HAP-STU-7701' },
]

const STATUS_STYLES = {
  confirmed: 'bg-green-500/10 text-green-400 border border-green-500/20',
  pending: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  completed: 'bg-white/5 text-white/30 border border-hap-border',
  cancelled: 'bg-red-500/10 text-red-400 border border-red-500/20',
}

export default function MyBookings() {
  const [tab, setTab] = useState('all')
  const filtered = tab === 'all' ? BOOKINGS : BOOKINGS.filter(b => b.type === tab || b.status === tab)

  return (
    <UserLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-1">My Bookings</h1>
        <p className="text-white/40 text-sm">Studio reservations and equipment rentals.</p>
      </div>

      <div className="flex gap-2 mb-6">
        {['all','studio','rental'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`tab-item capitalize ${tab===t?'active':''}`}>{t}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card text-center py-16 text-white/25">No bookings found.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map(b => (
            <div key={b.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-hap-surface2 border border-hap-border rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {b.type === 'studio' ? '🎙️' : '📦'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-white">{b.name}</h3>
                      <span className={`text-[0.65rem] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLES[b.status]}`}>{b.status}</span>
                    </div>
                    <p className="text-sm text-white/40">{b.pkg}</p>
                    <p className="text-xs text-white/30">{b.date} · {b.time}</p>
                    <p className="text-xs text-white/20 font-mono mt-1">{b.ref}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-gold font-bold">₦{b.amount.toLocaleString()}</p>
                  {b.status === 'pending' && (
                    <button className="mt-2 text-xs border border-red-500/30 text-red-400/70 hover:text-red-400 px-3 py-1 rounded-lg transition-all">Cancel</button>
                  )}
                  {b.status === 'completed' && (
                    <button className="mt-2 text-xs border border-gold/30 text-gold/70 hover:text-gold px-3 py-1 rounded-lg transition-all">Book Again</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </UserLayout>
  )
}
