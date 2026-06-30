import { useState } from 'react'
import PublicLayout from '../../components/layout/PublicLayout'
import Modal from '../../components/ui/Modal'
import { COSTUMES, COSTUME_CATEGORIES } from '../../data/costumes'
import { useToast } from '../../context/ToastContext'

export default function Costumes() {
  const toast = useToast()
  const [cat, setCat] = useState('All')
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ name:'', email:'', phone:'', size:'', startDate:'', endDate:'', notes:'' })
  const [loading, setLoading] = useState(false)

  const items = COSTUMES.filter(c => cat === 'All' || c.category === cat)

  const days = selected && form.startDate && form.endDate
    ? Math.max(1, Math.ceil((new Date(form.endDate) - new Date(form.startDate)) / 86400000))
    : 1

  function submit() {
    if (!form.name || !form.email || !form.startDate || !form.endDate) { toast.error('Please fill in all required fields'); return }
    setLoading(true)
    setTimeout(() => {
      toast.success('Costume rental request submitted! We\'ll confirm availability within 24 hours.')
      setSelected(null)
      setLoading(false)
      setForm({ name:'', email:'', phone:'', size:'', startDate:'', endDate:'', notes:'' })
    }, 900)
  }

  return (
    <PublicLayout>
      {/* Hero */}
      <div className="relative py-20 px-6 text-center border-b border-hap-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-3">H.ART Costume House</p>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Africa's Story, Dressed to Life</h1>
          <p className="text-white/40 text-base leading-relaxed">Authentic period costumes, traditional attire, theatrical wardrobes and fashion pieces — for productions, shoots and events.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', ...COSTUME_CATEGORIES].map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${cat===c ? 'bg-gold text-hap-bg' : 'bg-hap-surface border border-hap-border text-white/40 hover:text-white'}`}>{c}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map(item => (
            <div key={item.id} className="card hover:border-gold/20 transition-all group">
              <div className="h-36 rounded-xl mb-4 flex items-center justify-center text-6xl" style={{ background: `linear-gradient(145deg, ${item.color}22, ${item.color}33)` }}>
                {item.icon}
              </div>
              <span className="text-[0.6rem] uppercase tracking-widest text-white/25 font-bold">{item.category}</span>
              <h3 className="font-semibold text-white mt-1 mb-1 text-sm leading-tight group-hover:text-gold transition-colors">{item.name}</h3>
              <p className="text-xs text-white/35 leading-relaxed mb-3 line-clamp-2">{item.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {item.sizes.map(s => <span key={s} className="text-[0.6rem] px-1.5 py-0.5 rounded bg-hap-surface3 text-white/30 border border-hap-border">{s}</span>)}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-hap-border">
                <div>
                  <span className="text-gold font-bold text-sm">₦{item.pricePerDay.toLocaleString()}</span>
                  <span className="text-white/25 text-xs">/day</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${item.available ? 'text-green-400' : 'text-red-400/70'}`}>{item.available ? '● Avail.' : '○ Booked'}</span>
                  <button onClick={() => setSelected(item)} disabled={!item.available}
                    className="text-xs bg-gold hover:bg-gold-hover text-hap-bg font-bold px-3 py-1.5 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                    Rent
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <Modal open={!!selected} onClose={() => setSelected(null)} title={`Rent: ${selected.name}`}
          footer={
            <>
              <button onClick={() => setSelected(null)} className="text-sm text-white/40 hover:text-white px-4 py-2 rounded-xl">Cancel</button>
              <button onClick={submit} disabled={loading} className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-6 py-2.5 rounded-xl text-sm transition-all disabled:opacity-50 flex items-center gap-2">
                {loading && <span className="w-4 h-4 border-2 border-hap-bg/30 border-t-hap-bg rounded-full animate-spin-slow" />}
                {loading ? 'Submitting…' : 'Request Rental'}
              </button>
            </>
          }>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-hap-surface2 border border-hap-border rounded-xl">
              <span className="text-3xl">{selected.icon}</span>
              <div className="flex-1"><p className="font-semibold text-white text-sm">{selected.name}</p><p className="text-xs text-white/30">{selected.category}</p></div>
              <div className="text-right"><p className="text-gold font-bold text-sm">₦{selected.pricePerDay.toLocaleString()}/day</p><p className="text-xs text-white/25">Deposit: ₦{selected.deposit.toLocaleString()}</p></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-xs text-white/40 mb-1.5">Your Name *</label><input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} className="input" placeholder="Ada Okafor" /></div>
              <div><label className="block text-xs text-white/40 mb-1.5">Email *</label><input type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} className="input" placeholder="you@email.com" /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-xs text-white/40 mb-1.5">Phone</label><input value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} className="input" placeholder="+234 800 000 0000" /></div>
              <div><label className="block text-xs text-white/40 mb-1.5">Size Needed</label>
                <select value={form.size} onChange={e=>setForm(p=>({...p,size:e.target.value}))} className="input">
                  <option value="">Select size</option>
                  {selected.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-xs text-white/40 mb-1.5">Pickup Date *</label><input type="date" value={form.startDate} onChange={e=>setForm(p=>({...p,startDate:e.target.value}))} className="input" /></div>
              <div><label className="block text-xs text-white/40 mb-1.5">Return Date *</label><input type="date" value={form.endDate} onChange={e=>setForm(p=>({...p,endDate:e.target.value}))} className="input" /></div>
            </div>
            {form.startDate && form.endDate && (
              <div className="flex justify-between p-3 bg-gold/10 border border-gold/20 rounded-xl text-sm">
                <span className="text-white/50">{days} day{days>1?'s':''}</span>
                <span className="text-gold font-bold">₦{(selected.pricePerDay*days).toLocaleString()}</span>
              </div>
            )}
            <div><label className="block text-xs text-white/40 mb-1.5">Production Notes</label><textarea value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} rows={2} className="input" placeholder="Production name, intended use…" /></div>
          </div>
        </Modal>
      )}
    </PublicLayout>
  )
}
