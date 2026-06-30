import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import Modal from '../../components/ui/Modal'
import StarRating from '../../components/ui/StarRating'
import { AUDIO_SERVICES, AUDIO_CATEGORIES, PRODUCERS } from '../../data/audioServices'
import { getReviews } from '../../data/reviews'
import { useToast } from '../../context/ToastContext'

const TODAY = new Date().toISOString().split('T')[0]

export default function AudioServices() {
  const toast = useToast()
  const [cat, setCat] = useState('All')
  const [booking, setBooking] = useState(null)
  const [pkg, setPkg] = useState('')
  const [form, setForm] = useState({ name:'', email:'', phone:'', projectName:'', date:'', producer:'', notes:'' })
  const [loading, setLoading] = useState(false)

  const services = cat === 'All' ? AUDIO_SERVICES : AUDIO_SERVICES.filter(s => s.category === cat)
  const studioReviews = getReviews('studio', 'audio')
  const avgRating = studioReviews.length ? (studioReviews.reduce((a,r)=>a+r.rating,0)/studioReviews.length).toFixed(1) : '5.0'

  function submit() {
    if (!form.name || !form.email || !pkg) { toast.error('Fill in your details and select a package'); return }
    setLoading(true)
    setTimeout(() => { toast.success('Booking request sent! We\'ll confirm within 24 hours.'); setBooking(null); setLoading(false); setPkg(''); setForm({ name:'', email:'', phone:'', projectName:'', date:'', producer:'', notes:'' }) }, 900)
  }

  useScrollReveal()
  return (
    <PublicLayout>
      {/* Hero */}
      <div className="relative py-24 px-6 text-center border-b border-hap-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-800/12 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/4 rounded-full blur-3xl pointer-events-none animate-float-d1" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-3 animate-scale-in">H.ART Audio</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
            <span className="block animate-reveal delay-200" style={{ animationFillMode:'both' }}>Sound Built</span>
            <span className="block animate-reveal delay-400 text-gold-animate" style={{ animationFillMode:'both' }}>for Legacy</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed mb-6">Recording, mixing, mastering, film scoring, theatre music and sound design — from our world-class audio studio.</p>
          <div className="flex items-center justify-center gap-3 mb-8">
            <StarRating rating={avgRating} size="lg" />
            <span className="text-white/30 text-sm">{studioReviews.length} reviews</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {['All', ...AUDIO_CATEGORIES].map(c => (
            <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${cat===c ? 'bg-gold text-hap-bg' : 'bg-hap-surface border border-hap-border text-white/40 hover:text-white'}`}>{c}</button>
          ))}
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((s, i) => (
            <div key={s.id} data-reveal className={`delay-${(i % 3 + 1) * 100} shimmer-card glow-border card hover:border-gold/20 hover:-translate-y-2 hover:shadow-gold transition-all duration-300 group`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" style={{ background: `${s.color}22`, border: `1px solid ${s.color}33` }}>{s.icon}</div>
                <div>
                  <span className="text-[0.6rem] uppercase tracking-widest font-bold" style={{ color: s.color }}>{s.category}</span>
                  <h3 className="font-display font-bold text-white text-base group-hover:text-gold transition-colors">{s.name}</h3>
                </div>
              </div>
              <p className="text-sm text-white/40 leading-relaxed mb-4">{s.description}</p>
              <div className="space-y-2 mb-4">
                {s.packages.map(pkg => (
                  <div key={pkg.name} className="flex items-center justify-between p-2.5 bg-hap-surface2 border border-hap-border rounded-xl">
                    <div>
                      <p className="text-xs font-medium text-white">{pkg.name}</p>
                      <p className="text-[0.6rem] text-white/25">{pkg.includes.slice(0,2).join(' · ')}</p>
                    </div>
                    <span className="text-gold font-bold text-xs">₦{pkg.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { setBooking(s); setPkg('') }}
                className="w-full text-center border border-gold/30 text-gold hover:bg-gold hover:text-hap-bg font-bold py-2.5 rounded-xl text-sm transition-all hover:shadow-gold">
                Book This Service →
              </button>
            </div>
          ))}
        </div>

        {/* Producers */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">In-House Talent</p>
            <h2 className="font-display text-3xl font-bold text-white">Our Producers & Engineers</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {PRODUCERS.map(p => (
              <div key={p.id} className="card text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-hap-bg text-lg mx-auto mb-3" style={{ background: `linear-gradient(135deg, ${p.color}99, ${p.color})` }}>{p.avatar}</div>
                <h4 className="font-semibold text-white mb-0.5">{p.name}</h4>
                <p className="text-xs text-gold mb-1">{p.specialty}</p>
                <p className="text-xs text-white/25 mb-3">{p.experience}</p>
                <div className="space-y-1">
                  {p.credits.map(c => <p key={c} className="text-xs text-white/30">▸ {c}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        {studioReviews.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-6">What Clients Say</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {studioReviews.slice(0,4).map(r => (
                <div key={r.id} className="card">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-xs font-bold text-gold flex-shrink-0">{r.avatar}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm">{r.userName}</p>
                      <StarRating rating={r.rating} showNum={false} />
                    </div>
                    <span className="text-xs text-white/20">{new Date(r.date).toLocaleDateString('en-US',{month:'short',year:'numeric'})}</span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed italic">"{r.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking modal */}
      {booking && (
        <Modal open={!!booking} onClose={() => setBooking(null)} title={`Book: ${booking.name}`} size="lg"
          footer={
            <>
              <button onClick={() => setBooking(null)} className="text-sm text-white/40 hover:text-white px-4 py-2 rounded-xl">Cancel</button>
              <button onClick={submit} disabled={loading} className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-6 py-2.5 rounded-xl text-sm transition-all disabled:opacity-50 flex items-center gap-2">
                {loading && <span className="w-4 h-4 border-2 border-hap-bg/30 border-t-hap-bg rounded-full animate-spin-slow" />}
                {loading ? 'Sending…' : 'Request Booking'}
              </button>
            </>
          }>
          <div className="space-y-4">
            {/* Package selection */}
            <div>
              <label className="block text-xs text-white/40 mb-2">Select Package *</label>
              <div className="space-y-2">
                {booking.packages.map(p => (
                  <label key={p.name} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${pkg===p.name?'border-gold bg-gold/5':'border-hap-border hover:border-hap-borderl'}`}>
                    <input type="radio" name="pkg" value={p.name} checked={pkg===p.name} onChange={e=>setPkg(e.target.value)} className="accent-gold" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{p.name}</p>
                      <p className="text-xs text-white/30">{p.includes.join(' · ')}</p>
                    </div>
                    <span className="text-gold font-bold text-sm">₦{p.price.toLocaleString()}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-xs text-white/40 mb-1.5">Your Name *</label><input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} className="input" placeholder="Ada Okafor" /></div>
              <div><label className="block text-xs text-white/40 mb-1.5">Email *</label><input type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} className="input" placeholder="you@email.com" /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-xs text-white/40 mb-1.5">Artist / Project Name</label><input value={form.projectName} onChange={e=>setForm(p=>({...p,projectName:e.target.value}))} className="input" placeholder="Project or artist name" /></div>
              <div><label className="block text-xs text-white/40 mb-1.5">Preferred Date</label><input type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} min={TODAY} className="input" /></div>
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5">Preferred Producer / Engineer</label>
              <select value={form.producer} onChange={e=>setForm(p=>({...p,producer:e.target.value}))} className="input">
                <option value="">No preference</option>
                {PRODUCERS.map(p => <option key={p.id} value={p.name}>{p.name} — {p.specialty}</option>)}
              </select>
            </div>
            <div><label className="block text-xs text-white/40 mb-1.5">Notes</label><textarea value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} rows={3} className="input" placeholder="Any additional details about your project…" /></div>
          </div>
        </Modal>
      )}
    </PublicLayout>
  )
}
