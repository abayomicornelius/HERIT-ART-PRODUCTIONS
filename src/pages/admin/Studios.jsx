import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Badge from '../../components/ui/Badge'
import { STUDIOS } from '../../data/studios'

const BOOKINGS = [
  { studio:'H.ART Visual Studio', client:'Ada Okafor Films', pkg:'Full Day (8hrs)', date:'Jun 28, 2026', status:'confirmed', amount:200000 },
  { studio:'H.ART Audio Studio', client:'Sade Music Ltd', pkg:'Recording Session', date:'Jul 2, 2026', status:'confirmed', amount:80000 },
  { studio:'Rehearsal Space', client:'Arise Dance Company', pkg:'Dance Studio (2hrs)', date:'Jul 3, 2026', status:'pending', amount:25000 },
  { studio:'H.ART Visual Studio', client:'FreshBrew Agency', pkg:'Premium Day', date:'Jul 5, 2026', status:'pending', amount:350000 },
]

export default function AdminStudios() {
  const [tab, setTab] = useState('spaces')

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl font-bold text-white mb-1">H.ART Studios</h1><p className="text-white/40 text-sm">Manage studio spaces, packages and bookings.</p></div>
        <button className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-gold">+ Add Space</button>
      </div>

      <div className="flex gap-2 mb-6">
        {['spaces','bookings'].map(t => <button key={t} onClick={() => setTab(t)} className={`tab-item capitalize ${tab===t?'active':''}`}>{t}</button>)}
      </div>

      {tab === 'spaces' && (
        <div className="space-y-4">
          {STUDIOS.map(s => (
            <div key={s.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${s.color}22`, border: `1px solid ${s.color}33` }}>{s.icon}</div>
                  <div>
                    <h3 className="font-semibold text-white">{s.name}</h3>
                    <p className="text-xs text-white/40">{s.subtitle}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs text-gold">From ₦{s.packages[0].price.toLocaleString()}</span>
                      <span className="text-xs text-white/20">·</span>
                      <span className="text-xs text-white/30">{s.packages.length} packages</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs border border-hap-border text-white/40 hover:text-white px-3 py-1.5 rounded-lg transition-all">Edit</button>
                  <button className="text-xs border border-hap-border text-white/40 hover:text-white px-3 py-1.5 rounded-lg transition-all">Block Dates</button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-hap-border grid grid-cols-3 gap-2">
                {s.packages.map(pkg => (
                  <div key={pkg.name} className="bg-hap-surface2 border border-hap-border rounded-xl p-2 text-center">
                    <p className="text-[0.65rem] text-white/30">{pkg.name}</p>
                    <p className="text-gold font-bold text-sm">₦{pkg.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'bookings' && (
        <div className="card overflow-hidden p-0">
          <table className="tbl w-full">
            <thead><tr><th>Studio</th><th>Client</th><th>Package</th><th>Date</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {BOOKINGS.map((b, i) => (
                <tr key={i}>
                  <td className="font-medium text-white text-sm">{b.studio}</td>
                  <td>{b.client}</td>
                  <td>{b.pkg}</td>
                  <td>{b.date}</td>
                  <td className="text-gold font-bold">₦{b.amount.toLocaleString()}</td>
                  <td><Badge variant={b.status==='confirmed'?'success':'warning'}>{b.status}</Badge></td>
                  <td>
                    {b.status === 'pending' && (
                      <div className="flex gap-1">
                        <button className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded-lg">Confirm</button>
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
