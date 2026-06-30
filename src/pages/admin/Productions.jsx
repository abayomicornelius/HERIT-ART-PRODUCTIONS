import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Modal from '../../components/ui/Modal'
import Badge from '../../components/ui/Badge'
import { PRODUCTIONS } from '../../data/productions'
import { useToast } from '../../context/ToastContext'

export default function AdminProductions() {
  const toast = useToast()
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ title:'', category:'', date:'', venue:'', director:'' })
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  function save() {
    if (!form.title || !form.category) { toast.error('Title and category required'); return }
    toast.success('Production added!')
    setShowAdd(false)
    setForm({ title:'', category:'', date:'', venue:'', director:'' })
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl font-bold text-white mb-1">Productions</h1><p className="text-white/40 text-sm">Manage productions, cast, crew and ticketing.</p></div>
        <button onClick={() => setShowAdd(true)} className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-gold">+ Add Production</button>
      </div>

      <div className="space-y-4">
        {PRODUCTIONS.map(p => (
          <div key={p.id} className="card">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-hap-bg font-display font-black text-xl" style={{ background: `linear-gradient(135deg, ${p.color}99, ${p.color})` }}>H</div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg">{p.title}</h3>
                  <p className="text-xs text-white/40">{p.category} · {p.venue}</p>
                  <p className="text-xs text-white/25">{new Date(p.date).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })}</p>
                  <div className="flex gap-2 mt-2">
                    {p.tags?.slice(0,2).map(t => <span key={t} className="text-[0.6rem] px-2 py-0.5 rounded-full bg-hap-surface3 border border-hap-border text-white/30">{t}</span>)}
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <Badge variant={p.status==='Upcoming'?'warning':p.status==='Past'?'muted':'success'}>{p.status}</Badge>
                <div className="flex gap-2 mt-3">
                  <button className="text-xs border border-hap-border text-white/40 hover:text-white px-3 py-1.5 rounded-lg transition-all">Edit</button>
                  <button className="text-xs border border-hap-border text-white/40 hover:text-white px-3 py-1.5 rounded-lg transition-all">Tickets</button>
                </div>
              </div>
            </div>

            {/* Ticket summary */}
            <div className="mt-4 pt-4 border-t border-hap-border grid grid-cols-3 gap-3">
              {p.ticketPrices.map(t => (
                <div key={t.category} className="bg-hap-surface2 border border-hap-border rounded-xl p-3 text-center">
                  <p className="text-xs text-white/30">{t.category}</p>
                  <p className="text-gold font-bold text-sm">₦{t.price.toLocaleString()}</p>
                  <p className="text-[0.6rem] text-white/20">{t.available} avail.</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add Production"
        footer={
          <>
            <button onClick={() => setShowAdd(false)} className="text-sm text-white/40 hover:text-white px-4 py-2 rounded-xl">Cancel</button>
            <button onClick={save} className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-6 py-2.5 rounded-xl text-sm transition-all">Save Production</button>
          </>
        }>
        <div className="space-y-4">
          <div><label className="block text-xs text-white/40 mb-1.5">Title *</label><input value={form.title} onChange={set('title')} placeholder="Production title" className="input" /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-xs text-white/40 mb-1.5">Category *</label>
              <select value={form.category} onChange={set('category')} className="input">
                <option value="">Select…</option>
                {['Theatre','Film','Concert','Exhibition'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div><label className="block text-xs text-white/40 mb-1.5">Date</label><input type="date" value={form.date} onChange={set('date')} className="input" /></div>
          </div>
          <div><label className="block text-xs text-white/40 mb-1.5">Venue</label><input value={form.venue} onChange={set('venue')} placeholder="Venue name" className="input" /></div>
          <div><label className="block text-xs text-white/40 mb-1.5">Director</label><input value={form.director} onChange={set('director')} placeholder="Director name" className="input" /></div>
        </div>
      </Modal>
    </AdminLayout>
  )
}
