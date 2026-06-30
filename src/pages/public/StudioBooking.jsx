import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'
import { STUDIOS, STUDIO_SERVICES } from '../../data/studios'
import { useToast } from '../../context/ToastContext'

const STEPS = ['Select Studio', 'Date & Time', 'Package', 'Your Details', 'Confirm']
const TODAY = new Date().toISOString().split('T')[0]

export default function StudioBooking() {
  const navigate = useNavigate()
  const toast = useToast()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    studio: '', service: '', date: '', time: '', pkg: '',
    name: '', email: '', phone: '', notes: '',
  })
  const set = k => v => setForm(p => ({ ...p, [k]: v }))
  const setE = k => e => set(k)(e.target.value)

  const studio = STUDIOS.find(s => s.id === form.studio)

  function validate() {
    if (step === 0 && !form.studio) { toast.error('Please select a studio'); return false }
    if (step === 1 && (!form.date || !form.time)) { toast.error('Select a date and time'); return false }
    if (step === 2 && !form.pkg) { toast.error('Please choose a package'); return false }
    if (step === 3 && (!form.name || !form.email)) { toast.error('Fill in your name and email'); return false }
    return true
  }

  function next() { if (validate()) setStep(s => Math.min(s + 1, 4)) }

  function confirm() {
    setLoading(true)
    setTimeout(() => {
      toast.success('Booking confirmed! Check your email for details.')
      navigate('/dashboard/bookings')
    }, 1000)
  }

  const pct = Math.round(((step + 1) / STEPS.length) * 100)

  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">H.ART Studios</p>
          <h1 className="font-display text-4xl font-bold text-white mb-2">Book a Studio</h1>
          <p className="text-white/40 text-sm">Reserve your creative space in a few simple steps.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[0.7rem] font-bold flex-shrink-0 transition-all ${
                i < step ? 'bg-green-500/20 border border-green-500 text-green-400'
                : i === step ? 'bg-gold border-2 border-gold text-hap-bg'
                : 'bg-hap-surface3 border border-hap-border text-white/25'
              }`}>{i < step ? '✓' : i + 1}</div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-green-500/30' : 'bg-hap-border'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[0.6rem] text-white/25 mb-8 px-0">
          {STEPS.map((l, i) => <span key={l} className={`${i === step ? 'text-gold' : ''}`}>{l}</span>)}
        </div>
        <div className="h-1 bg-hap-surface3 rounded-full overflow-hidden mb-8">
          <div className="h-full bg-gold-h rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>

        <div className="card animate-slide-up">
          {/* Step 0 — Select Studio */}
          {step === 0 && (
            <div className="space-y-3">
              <h3 className="font-display text-xl font-bold text-white mb-5">Choose a Studio Space</h3>
              {STUDIOS.map(s => (
                <label key={s.id} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${form.studio === s.id ? 'border-gold bg-gold/5' : 'border-hap-border hover:border-hap-borderl'}`}>
                  <input type="radio" name="studio" value={s.id} checked={form.studio === s.id} onChange={setE('studio')} className="accent-gold" />
                  <span className="text-2xl">{s.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{s.name}</p>
                    <p className="text-xs text-white/40">{s.subtitle}</p>
                  </div>
                  <span className="text-xs text-gold">From ₦{s.packages[0].price.toLocaleString()}</span>
                </label>
              ))}
              <div className="mt-4">
                <label className="block text-xs text-white/40 mb-1.5">Service Type</label>
                <select value={form.service} onChange={setE('service')} className="input">
                  <option value="">Select service type</option>
                  {STUDIO_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Step 1 — Date & Time */}
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="font-display text-xl font-bold text-white mb-5">Choose Date & Time</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-xs text-white/40 mb-1.5">Preferred Date *</label><input type="date" value={form.date} onChange={setE('date')} min={TODAY} className="input" /></div>
                <div>
                  <label className="block text-xs text-white/40 mb-1.5">Start Time *</label>
                  <select value={form.time} onChange={setE('time')} className="input">
                    <option value="">Select time</option>
                    {['08:00','10:00','12:00','14:00','16:00','18:00','20:00'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 text-sm text-gold/80">
                <p>📅 Studio availability is confirmed after booking. Our team will reach out within 2 hours.</p>
              </div>
            </div>
          )}

          {/* Step 2 — Package */}
          {step === 2 && studio && (
            <div className="space-y-3">
              <h3 className="font-display text-xl font-bold text-white mb-5">Select Package</h3>
              {studio.packages.map(pkg => (
                <label key={pkg.name} className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${form.pkg === pkg.name ? 'border-gold bg-gold/5' : 'border-hap-border hover:border-hap-borderl'}`}>
                  <input type="radio" name="pkg" value={pkg.name} checked={form.pkg === pkg.name} onChange={setE('pkg')} className="accent-gold mt-1" />
                  <div className="flex-1">
                    <p className="font-semibold text-white">{pkg.name}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {pkg.includes.map(inc => <span key={inc} className="text-[0.65rem] px-2 py-0.5 rounded-full bg-hap-surface3 text-white/40 border border-hap-border">{inc}</span>)}
                    </div>
                  </div>
                  <span className="text-gold font-bold">₦{pkg.price.toLocaleString()}</span>
                </label>
              ))}
              <div className="pt-4">
                <label className="block text-xs text-white/40 mb-1.5">Additional Services (optional)</label>
                <textarea placeholder="Any additional equipment, crew or special requirements…" rows={3} className="input" onChange={setE('notes')} />
              </div>
            </div>
          )}

          {/* Step 3 — Details */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-white mb-5">Your Contact Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-xs text-white/40 mb-1.5">Full Name *</label><input value={form.name} onChange={setE('name')} placeholder="Ada Okafor" className="input" /></div>
                <div><label className="block text-xs text-white/40 mb-1.5">Email *</label><input type="email" value={form.email} onChange={setE('email')} placeholder="you@email.com" className="input" /></div>
              </div>
              <div><label className="block text-xs text-white/40 mb-1.5">Phone Number</label><input value={form.phone} onChange={setE('phone')} placeholder="+234 800 000 0000" className="input" /></div>
              <div><label className="block text-xs text-white/40 mb-1.5">Project Notes</label><textarea value={form.notes} onChange={setE('notes')} rows={3} placeholder="Tell us about your project…" className="input" /></div>
            </div>
          )}

          {/* Step 4 — Confirm */}
          {step === 4 && studio && (
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-white mb-5">Confirm Booking</h3>
              <div className="bg-hap-surface2 border border-hap-border rounded-2xl p-5 space-y-2">
                {[
                  ['Studio', studio.name],
                  ['Service', form.service || 'General Use'],
                  ['Date', form.date],
                  ['Time', form.time],
                  ['Package', form.pkg],
                  ['Name', form.name],
                  ['Email', form.email],
                ].map(([label, value]) => (
                  <div key={label} className="info-row">
                    <span className="text-xs text-white/30 font-bold uppercase tracking-wider w-24 flex-shrink-0">{label}</span>
                    <span className="text-sm text-white/70">{value || '—'}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center p-4 bg-gold/10 border border-gold/20 rounded-xl">
                <span className="text-white/60">Total</span>
                <span className="text-gold font-bold text-xl">₦{(studio.packages.find(p=>p.name===form.pkg)?.price||0).toLocaleString()}</span>
              </div>
              <p className="text-xs text-white/25">50% deposit required to confirm booking. Balance due on the day.</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-hap-border">
            <button onClick={() => setStep(s => Math.max(s-1, 0))} disabled={step === 0} className="text-sm text-white/40 hover:text-white transition-colors disabled:opacity-20">← Back</button>
            {step < 4 ? (
              <button onClick={next} className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-8 py-2.5 rounded-xl text-sm transition-all hover:shadow-gold">Continue →</button>
            ) : (
              <button onClick={confirm} disabled={loading} className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-8 py-2.5 rounded-xl text-sm transition-all hover:shadow-gold disabled:opacity-50 flex items-center gap-2">
                {loading && <span className="w-4 h-4 border-2 border-hap-bg/30 border-t-hap-bg rounded-full animate-spin-slow" />}
                {loading ? 'Confirming…' : '✓ Confirm & Pay Deposit'}
              </button>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
