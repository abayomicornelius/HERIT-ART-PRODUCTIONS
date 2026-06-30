import { useState } from 'react'
import UserLayout from '../../components/layout/UserLayout'
import Modal from '../../components/ui/Modal'

const TICKETS = [
  {
    id:'TKT-001', ref:'HAP-882741', event:'1960 — The Musical',
    date:'Oct 1, 2026', time:'7:00 PM', venue:'MUSON Centre, Lagos',
    category:'Premium', qty:2, price:25000,
    status:'upcoming',
  },
  {
    id:'TKT-002', ref:'HAP-119023', event:'Echoes of the Motherland',
    date:'Nov 15, 2026', time:'5:00 PM', venue:'Terra Kulture, Lagos',
    category:'Regular', qty:1, price:10000,
    status:'upcoming',
  },
  {
    id:'TKT-003', ref:'HAP-448812', event:'Drums of Sankofa',
    date:'Mar 10, 2026', time:'8:00 PM', venue:'EKO Hotel, Lagos',
    category:'VIP', qty:2, price:40000,
    status:'past',
  },
]

export default function MyTickets() {
  const [tab, setTab] = useState('upcoming')
  const [viewing, setViewing] = useState(null)
  const filtered = TICKETS.filter(t => t.status === tab)

  return (
    <UserLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-1">My Tickets</h1>
        <p className="text-white/40 text-sm">Your event tickets and booking history.</p>
      </div>

      <div className="flex gap-2 mb-6">
        {['upcoming','past'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`tab-item capitalize ${tab===t?'active':''}`}>{t}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card text-center py-16 text-white/25">No {tab} tickets found.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map(t => (
            <div key={t.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">🎭</div>
                  <div>
                    <h3 className="font-display font-bold text-white text-lg">{t.event}</h3>
                    <p className="text-sm text-white/40">{t.date} · {t.time}</p>
                    <p className="text-sm text-white/30">{t.venue}</p>
                    <div className="flex gap-3 mt-2 text-xs">
                      <span className="text-gold font-bold">{t.qty} × {t.category}</span>
                      <span className="text-white/25">₦{(t.price * t.qty).toLocaleString()}</span>
                      <span className="text-white/20 font-mono">{t.ref}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => setViewing(t)} className="text-xs border border-gold/30 text-gold hover:bg-gold/10 px-4 py-2 rounded-xl transition-all">
                    View QR Code
                  </button>
                  <button className="text-xs border border-hap-border text-white/40 hover:text-white px-4 py-2 rounded-xl transition-all">
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR Code modal */}
      {viewing && (
        <Modal open={!!viewing} onClose={() => setViewing(null)} title="Your Ticket">
          <div className="text-center">
            <p className="text-white/60 text-sm mb-1">{viewing.event}</p>
            <p className="text-xs text-white/30 mb-5">{viewing.date} · {viewing.venue}</p>
            {/* QR Code placeholder */}
            <div className="w-48 h-48 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <div className="grid grid-cols-6 gap-0.5 p-3">
                {[...Array(36)].map((_, i) => (
                  <div key={i} className={`w-5 h-5 ${[0,1,5,6,7,11,12,13,14,18,19,23,24,25,29,30,35].includes(i) ? 'bg-hap-bg' : 'bg-transparent'}`} />
                ))}
              </div>
            </div>
            <p className="font-mono text-xs text-gold mb-1">{viewing.ref}</p>
            <p className="text-[0.65rem] text-white/25 mb-5">{viewing.qty} × {viewing.category}</p>
            <button className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-6 py-2.5 rounded-xl text-sm transition-all hover:shadow-gold">
              Download Ticket PDF
            </button>
          </div>
        </Modal>
      )}
    </UserLayout>
  )
}
