import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'
import Modal from '../../components/ui/Modal'
import { PRODUCTIONS } from '../../data/productions'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

const fmt = s => new Date(s).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

const STEPS = ['Select Tickets', 'Your Details', 'Payment', 'Confirmation']

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const toast = useToast()
  const p = PRODUCTIONS.find(x => x.id === id) || PRODUCTIONS[0]

  const [step, setStep] = useState(0)
  const [qty, setQty] = useState({})
  const [selectedDate, setSelectedDate] = useState(p.schedule[0]?.date || '')
  const [info, setInfo] = useState({ name: user?.name || '', email: user?.email || '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [orderRef, setOrderRef] = useState('')

  const total = Object.entries(qty).reduce((sum, [cat, n]) => sum + n * (p.ticketPrices.find(t=>t.category===cat)?.price||0), 0)
  const hasTickets = Object.values(qty).some(v => v > 0)

  function nextStep() {
    if (step === 0 && !hasTickets) { toast.error('Please select at least one ticket'); return }
    if (step === 1 && (!info.name || !info.email)) { toast.error('Please fill in your name and email'); return }
    if (step === 2) {
      setLoading(true)
      setTimeout(() => {
        setOrderRef('HAP-' + Date.now().toString().slice(-6))
        setStep(3)
        setLoading(false)
      }, 1200)
      return
    }
    setStep(s => Math.min(s + 1, 3))
  }

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Event header */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-start">
          <div className="w-full md:w-48 h-56 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(145deg, ${p.color}55, ${p.color}99)` }}>
            <p className="font-display text-7xl font-black text-white/30">H</p>
          </div>
          <div>
            <span className="text-xs bg-gold text-hap-bg font-bold px-3 py-1 rounded-full uppercase tracking-wider">{p.category}</span>
            <h1 className="font-display text-4xl font-bold text-white mt-3 mb-2">{p.title}</h1>
            <p className="text-white/50 text-sm leading-relaxed mb-3 max-w-xl">{p.description}</p>
            <div className="flex flex-wrap gap-4 text-xs text-white/40">
              <span>📅 {fmt(p.date)}</span>
              <span>📍 {p.venue}</span>
              <span>🎭 Directed by {p.director}</span>
            </div>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step ? 'bg-green-500/20 border border-green-500 text-green-400'
                  : i === step ? 'bg-gold border-2 border-gold text-hap-bg'
                  : 'bg-hap-surface3 border border-hap-border text-white/25'
                }`}>{i < step ? '✓' : i + 1}</div>
                <span className={`text-[0.65rem] mt-1.5 font-medium text-center hidden sm:block ${i === step ? 'text-gold' : 'text-white/25'}`}>{label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-2 ${i < step ? 'bg-green-500/30' : 'bg-hap-border'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 0 — Select Tickets */}
            {step === 0 && (
              <div className="animate-slide-up space-y-4">
                <h3 className="font-display text-2xl font-bold text-white mb-2">Select Tickets</h3>
                {p.schedule.length > 1 && (
                  <div className="mb-5">
                    <label className="block text-xs text-white/40 mb-1.5">Choose Date & Time</label>
                    <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="input">
                      {p.schedule.map(s => <option key={s.date} value={s.date}>{fmt(s.date)} — {s.time}</option>)}
                    </select>
                  </div>
                )}
                {p.ticketPrices.map(t => (
                  <div key={t.category} className={`flex items-center gap-4 p-5 rounded-2xl border transition-all ${(qty[t.category]||0) > 0 ? 'border-gold bg-gold/5' : 'border-hap-border bg-hap-surface'}`}>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{t.category}</p>
                      <p className="text-xs text-white/30">{t.available} tickets remaining</p>
                    </div>
                    <div className="text-gold font-bold">₦{t.price.toLocaleString()}</div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setQty(q => ({ ...q, [t.category]: Math.max(0, (q[t.category]||0) - 1) }))} className="w-8 h-8 rounded-lg bg-hap-surface3 text-white/60 hover:text-white font-bold">−</button>
                      <span className="w-6 text-center text-white font-bold">{qty[t.category] || 0}</span>
                      <button onClick={() => setQty(q => ({ ...q, [t.category]: Math.min(t.available, (q[t.category]||0) + 1) }))} className="w-8 h-8 rounded-lg bg-hap-surface3 text-white/60 hover:text-white font-bold">+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 1 — Personal Info */}
            {step === 1 && (
              <div className="animate-slide-up space-y-4">
                <h3 className="font-display text-2xl font-bold text-white mb-2">Your Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="block text-xs text-white/40 mb-1.5">Full Name *</label><input value={info.name} onChange={e=>setInfo(p=>({...p,name:e.target.value}))} placeholder="Ada Okafor" className="input" /></div>
                  <div><label className="block text-xs text-white/40 mb-1.5">Email Address *</label><input type="email" value={info.email} onChange={e=>setInfo(p=>({...p,email:e.target.value}))} placeholder="you@email.com" className="input" /></div>
                </div>
                <div><label className="block text-xs text-white/40 mb-1.5">Phone Number</label><input value={info.phone} onChange={e=>setInfo(p=>({...p,phone:e.target.value}))} placeholder="+234 800 000 0000" className="input" /></div>
                <p className="text-xs text-white/25">Your digital tickets and QR code will be sent to your email address.</p>
              </div>
            )}

            {/* Step 2 — Payment */}
            {step === 2 && (
              <div className="animate-slide-up space-y-4">
                <h3 className="font-display text-2xl font-bold text-white mb-2">Payment</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[{ id:'paystack', name:'Paystack', icon:'💳', desc:'Cards, bank transfer, USSD'}, {id:'flutterwave',name:'Flutterwave',icon:'🦋',desc:'Cards & mobile money'}].map(g => (
                    <div key={g.id} className="flex items-center gap-3 p-4 rounded-xl border border-hap-border bg-hap-surface hover:border-gold/30 transition-all cursor-pointer">
                      <span className="text-2xl">{g.icon}</span>
                      <div><p className="font-semibold text-white text-sm">{g.name}</p><p className="text-xs text-white/30">{g.desc}</p></div>
                    </div>
                  ))}
                </div>
                <div className="bg-hap-surface2 border border-hap-border rounded-xl p-4">
                  <p className="text-xs text-white/30 mb-2">You'll be redirected to the secure payment gateway.</p>
                  <p className="text-sm text-white/60">Total: <span className="text-gold font-bold text-lg">₦{total.toLocaleString()}</span></p>
                </div>
              </div>
            )}

            {/* Step 3 — Confirmation */}
            {step === 3 && (
              <div className="animate-slide-up text-center py-8">
                <div className="w-20 h-20 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✓</div>
                <h3 className="font-display text-3xl font-bold text-white mb-2">Booking Confirmed!</h3>
                <p className="text-white/50 mb-2">Your tickets are on their way to <span className="text-white">{info.email}</span></p>
                <p className="text-xs text-white/30 mb-8">Order reference: <span className="text-gold font-mono font-bold">{orderRef}</span></p>
                {/* QR Code placeholder */}
                <div className="w-40 h-40 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <div className="grid grid-cols-5 gap-0.5 p-2">
                    {[...Array(25)].map((_, i) => <div key={i} className={`w-4 h-4 ${Math.random() > 0.5 ? 'bg-hap-bg' : 'bg-transparent'}`} />)}
                  </div>
                </div>
                <p className="text-xs text-white/30 mb-8">Show this QR code at the venue entrance.</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => toast.success('Ticket downloaded!')} className="bg-gold text-hap-bg font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-gold-hover transition-all">Download Ticket</button>
                  <button onClick={() => navigate('/dashboard/tickets')} className="border border-hap-border text-white/60 hover:text-white px-6 py-2.5 rounded-xl text-sm transition-all">View My Tickets</button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div>
            <div className="card sticky top-20">
              <h4 className="font-semibold text-white mb-4">Order Summary</h4>
              <div className="space-y-2 mb-4">
                {Object.entries(qty).filter(([,n]) => n > 0).map(([cat, n]) => {
                  const price = p.ticketPrices.find(t=>t.category===cat)?.price||0
                  return <div key={cat} className="flex justify-between text-sm"><span className="text-white/60">{cat} × {n}</span><span className="text-white">₦{(price*n).toLocaleString()}</span></div>
                })}
              </div>
              <div className="border-t border-hap-border pt-3 flex justify-between font-bold">
                <span className="text-white/60">Total</span>
                <span className="text-gold">₦{total.toLocaleString()}</span>
              </div>
              {step < 3 && (
                <button onClick={nextStep} disabled={loading}
                  className="mt-5 w-full bg-gold hover:bg-gold-hover text-hap-bg font-bold py-3 rounded-xl text-sm transition-all hover:shadow-gold disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading && <span className="w-4 h-4 border-2 border-hap-bg/30 border-t-hap-bg rounded-full animate-spin-slow" />}
                  {step === 2 ? (loading ? 'Processing…' : `Pay ₦${total.toLocaleString()}`) : 'Continue →'}
                </button>
              )}
              {step > 0 && step < 3 && <button onClick={() => setStep(s=>s-1)} className="mt-2 w-full text-xs text-white/25 hover:text-white py-2 transition-colors">← Back</button>}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
