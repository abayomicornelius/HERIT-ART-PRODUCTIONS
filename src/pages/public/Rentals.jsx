import { useState } from 'react'
import PublicLayout from '../../components/layout/PublicLayout'
import Modal from '../../components/ui/Modal'
import { RENTALS as RENTAL_ITEMS, RENTAL_CATEGORIES } from '../../data/rentals'
import { useToast } from '../../context/ToastContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const CAT_COLORS = { Equipment: '#c9a84c', Lighting: '#f59e0b', Costumes: '#ec4899', Props: '#7c3aed', 'Audio Gear': '#10b981' }

export default function Rentals() {
  const toast = useToast()
  const [cat, setCat] = useState('All')
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ name:'', email:'', phone:'', startDate:'', endDate:'', notes:'' })
  const [loading, setLoading] = useState(false)

  const items = RENTAL_ITEMS.filter(r => cat === 'All' || r.category === cat)

  function submit() {
    if (!form.name || !form.email || !form.startDate || !form.endDate) { toast.error('Please fill in all required fields'); return }
    setLoading(true)
    setTimeout(() => {
      toast.success('Rental request submitted! We\'ll confirm availability within 2 hours.')
      setSelected(null)
      setLoading(false)
    }, 900)
  }

  const days = selected && form.startDate && form.endDate
    ? Math.max(1, Math.ceil((new Date(form.endDate) - new Date(form.startDate)) / 86400000))
    : 1

  useScrollReveal()
  return (
    <PublicLayout>
      {/* Hero */}
      <div className="relative py-20 px-6 text-center border-b border-hap-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/4 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-3 animate-scale-in">Equipment Rentals</p>
          <h1 className="font-display text-5xl font-bold mb-4">
            <span className="block animate-reveal delay-200" style={{ animationFillMode:'both' }}>Professional Gear,</span>
            <span className="block animate-reveal delay-400 text-gold-animate" style={{ animationFillMode:'both' }}>On Demand</span>
          </h1>
          <p className="text-white/40 text-base leading-relaxed animate-reveal delay-500" style={{ animationFillMode:'both' }}>Cameras, lighting, sound, staging — world-class equipment for your next production or event.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', ...RENTAL_CATEGORIES].map(c => (
            <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${cat===c ? 'bg-gold text-hap-bg' : 'bg-hap-surface border border-hap-border text-white/40 hover:text-white'}`}>{c}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div key={item.id} data-reveal className={`delay-${(i % 3 + 1) * 100} shimmer-card card hover:border-gold/20 hover:-translate-y-2 hover:shadow-gold transition-all duration-300 group`}>
              <div className="h-40 rounded-xl mb-4 flex items-center justify-center text-7xl transition-transform duration-300 group-hover:scale-110" style={{ background: `linear-gradient(145deg, ${CAT_COLORS[item.category] || '#c9a84c'}22, ${CAT_COLORS[item.category] || '#c9a84c'}33)` }}>
                {item.icon}
              </div>
              <span className="text-[0.6rem] uppercase tracking-widest text-white/25 font-bold">{item.category}</span>
              <h3 className="font-semibold text-white mt-1 mb-1 group-hover:text-gold transition-colors">{item.name}</h3>
              <p className="text-xs text-white/35 leading-relaxed mb-4">{item.description}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {item.specs?.slice(0,3).map(s => <span key={s} className="text-[0.6rem] px-2 py-0.5 rounded-full bg-hap-surface3 text-white/30 border border-hap-border">{s}</span>)}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-hap-border">
                <div>
                  <span className="text-gold font-bold text-sm">₦{item.pricePerDay.toLocaleString()}</span>
                  <span className="text-white/25 text-xs">/day</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium ${item.available ? 'text-green-400' : 'text-red-400/70'}`}>{item.available ? '● Available' : '○ Booked'}</span>
                  <button onClick={() => setSelected(item)} disabled={!item.available}
                    className="bg-gold hover:bg-gold-hover text-hap-bg text-xs font-bold px-4 py-1.5 rounded-lg transition-all hover:shadow-gold disabled:opacity-30 disabled:cursor-not-allowed">
                    Rent
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rental modal */}
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
              <div><label className="block text-xs text-white/40 mb-1.5">Your Name *</label><input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Ada Okafor" className="input" /></div>
              <div><label className="block text-xs text-white/40 mb-1.5">Email *</label><input type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="you@email.com" className="input" /></div>
            </div>
            <div><label className="block text-xs text-white/40 mb-1.5">Phone Number</label><input value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} placeholder="+234 800 000 0000" className="input" /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-xs text-white/40 mb-1.5">Start Date *</label><input type="date" value={form.startDate} onChange={e=>setForm(p=>({...p,startDate:e.target.value}))} className="input" /></div>
              <div><label className="block text-xs text-white/40 mb-1.5">Return Date *</label><input type="date" value={form.endDate} onChange={e=>setForm(p=>({...p,endDate:e.target.value}))} className="input" /></div>
            </div>
            {form.startDate && form.endDate && (
              <div className="flex justify-between items-center p-3 bg-gold/10 border border-gold/20 rounded-xl text-sm">
                <span className="text-white/50">{days} day{days > 1 ? 's' : ''} rental</span>
                <span className="text-gold font-bold">₦{(selected.pricePerDay * days).toLocaleString()}</span>
              </div>
            )}
            <div><label className="block text-xs text-white/40 mb-1.5">Notes</label><textarea value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} rows={2} placeholder="Any special requirements…" className="input" /></div>
          </div>
        </Modal>
      )}
    </PublicLayout>
  )
}
