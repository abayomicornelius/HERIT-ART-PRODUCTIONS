import { useState } from 'react'
import PublicLayout from '../../components/layout/PublicLayout'
import { useToast } from '../../context/ToastContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const REASONS = ['General Enquiry', 'Production Partnership', 'Studio Booking', 'Equipment Rental', 'Creative Network', 'Event Ticketing', 'Brand Services', 'Media & Press']

export default function Contact() {
  const toast = useToast()
  const [form, setForm] = useState({ name:'', email:'', phone:'', reason:'', message:'' })
  const [loading, setLoading] = useState(false)
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  function submit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { toast.error('Please fill in all required fields'); return }
    setLoading(true)
    setTimeout(() => { toast.success('Message sent! We\'ll be in touch within 24 hours.'); setForm({ name:'', email:'', phone:'', reason:'', message:'' }); setLoading(false) }, 900)
  }

  useScrollReveal()
  return (
    <PublicLayout>
      {/* Hero */}
      <div className="relative py-20 px-6 text-center border-b border-hap-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/4 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="relative z-10">
          <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-3 animate-scale-in">Contact Us</p>
          <h1 className="font-display text-5xl font-bold mb-4">
            <span className="block animate-reveal delay-200" style={{ animationFillMode:'both' }}>Let's Create</span>
            <span className="block animate-reveal delay-400 text-gold-animate" style={{ animationFillMode:'both' }}>Together</span>
          </h1>
          <p className="text-white/40 animate-reveal delay-500" style={{ animationFillMode:'both' }}>Reach out for productions, studio bookings, partnerships or general enquiries.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-10">
        {/* Info */}
        <div className="space-y-5">
          {[
            { icon: '📍', title: 'Our Location', lines: ['Lagos, Nigeria'] },
            { icon: '💬', title: 'WhatsApp', lines: ['+234 806 122 5812'], href: 'https://wa.me/2348061225812' },
            { icon: '✉️', title: 'Email', lines: ['hello@heritart.com', 'bookings@heritart.com'] },
            { icon: '🕐', title: 'Office Hours', lines: ['Monday – Friday: 9am – 6pm', 'Saturday: 10am – 2pm'] },
          ].map((item, i) => (
            <div key={item.title} data-reveal className={`delay-${(i+1)*100} shimmer-card card hover:-translate-y-1 hover:shadow-gold hover:border-gold/20 transition-all duration-300`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <p className="font-semibold text-white mb-1.5">{item.title}</p>
                  {item.lines.map(l => item.href
                    ? <a key={l} href={item.href} target="_blank" rel="noopener noreferrer" className="block text-sm text-gold hover:text-gold-hover no-underline transition-colors">{l}</a>
                    : <p key={l} className="text-sm text-white/40">{l}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Social */}
          <div data-reveal className="delay-500 shimmer-card card hover:-translate-y-1 hover:border-gold/20 hover:shadow-gold transition-all duration-300">
            <p className="font-semibold text-white mb-3">Follow Us</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label:'IG', href:'https://www.instagram.com/heritartproductions', title:'Instagram' },
                { label:'▶', href:'https://youtube.com/@herit_artproduction', title:'YouTube' },
                { label:'TT', href:'https://www.tiktok.com/@herit.art.production', title:'TikTok' },
                { label:'f', href:'https://www.facebook.com/heritartproductions', title:'Facebook' },
                { label:'𝕏', href:'https://x.com/art_herit55305', title:'X' },
                { label:'Th', href:'https://www.threads.com/@heritartproductions', title:'Threads' },
              ].map((s, i) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.title}
                  style={{ animationDelay: `${i * 0.05}s` }}
                  className="w-9 h-9 rounded-xl bg-hap-surface2 border border-hap-border flex items-center justify-center text-xs text-white/40 hover:text-gold hover:border-gold/30 hover:scale-125 hover:-translate-y-1 transition-all duration-200 no-underline font-bold">{s.label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2" data-reveal="left">
          <div className="shimmer-card card">
            <h2 className="font-display text-2xl font-bold text-white mb-6">Send Us a Message</h2>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-xs text-white/40 mb-1.5">Full Name *</label><input value={form.name} onChange={set('name')} placeholder="Ada Okafor" className="input" /></div>
                <div><label className="block text-xs text-white/40 mb-1.5">Email *</label><input type="email" value={form.email} onChange={set('email')} placeholder="ada@email.com" className="input" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-xs text-white/40 mb-1.5">Phone</label><input value={form.phone} onChange={set('phone')} placeholder="+234 800 000 0000" className="input" /></div>
                <div><label className="block text-xs text-white/40 mb-1.5">Subject</label>
                  <select value={form.reason} onChange={set('reason')} className="input">
                    <option value="">Select a topic…</option>
                    {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div><label className="block text-xs text-white/40 mb-1.5">Message *</label><textarea value={form.message} onChange={set('message')} rows={6} placeholder="Tell us how we can help you…" className="input" /></div>
              <button type="submit" disabled={loading} className="w-full bg-gold hover:bg-gold-hover text-hap-bg font-bold py-3.5 rounded-xl text-sm transition-all hover:shadow-gold disabled:opacity-50 flex items-center justify-center gap-2">
                {loading && <span className="w-4 h-4 border-2 border-hap-bg/30 border-t-hap-bg rounded-full animate-spin-slow" />}
                {loading ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
