import { useState } from 'react'
import { Link } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'
import { PRICING, DIVISIONS } from '../../data/pricing'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const fmt = n => n >= 1000000 ? `₦${(n/1000000).toFixed(1)}M` : `₦${(n/1000).toFixed(0)}K`
const range = (min, max) => min && max ? `${fmt(min)} – ${fmt(max)}` : min ? `From ${fmt(min)}` : 'Custom pricing'

export default function Pricing() {
  const [active, setActive] = useState('all')

  const sections = [
    {
      id: 'tickets', division: 'Stories', icon: '🎭', title: 'Event Tickets',
      content: (
        <div className="space-y-3">
          {PRICING.tickets.tiers.map(t => (
            <div key={t.name} className="flex items-start gap-4 p-4 bg-hap-surface2 border border-hap-border rounded-xl">
              <div className="flex-1">
                <p className="font-semibold text-white">{t.name}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {t.perks.map(p => <span key={p} className="text-[0.65rem] px-2 py-0.5 rounded-full bg-hap-surface3 border border-hap-border text-white/40">{p}</span>)}
                </div>
              </div>
              <span className="text-gold font-bold text-sm flex-shrink-0">{range(t.min, t.max)}</span>
            </div>
          ))}
          <div className="mt-4 p-4 bg-gold/5 border border-gold/20 rounded-xl">
            <p className="text-xs font-bold text-gold mb-2">External Event Promotion Fees</p>
            <div className="space-y-1 text-xs text-white/50">
              <div className="flex justify-between"><span>Basic Event Listing</span><span className="text-white/70">₦20,000</span></div>
              <div className="flex justify-between"><span>Featured Placement</span><span className="text-white/70">{range(PRICING.tickets.commission.featured.min, PRICING.tickets.commission.featured.max)}</span></div>
              <div className="flex justify-between"><span>Full Marketing Package</span><span className="text-white/70">From {fmt(PRICING.tickets.commission.fullPackage)}</span></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'studios', division: 'Spaces', icon: '🎥', title: 'H.ART Studios',
      content: (
        <div className="space-y-5">
          {[
            { label: 'Visual / Content Studio', data: PRICING.visualStudio },
            { label: 'Photography Studio', data: PRICING.photographyStudio },
            { label: 'Rehearsal Space', data: PRICING.rehearsalSpace },
          ].map(({ label, data }) => (
            <div key={label}>
              <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">{label}</p>
              <div className="space-y-2">
                {data.rates.map(r => (
                  <div key={r.name} className="flex items-center justify-between p-3 bg-hap-surface2 border border-hap-border rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-white">{r.name}</p>
                      <p className="text-xs text-white/30">{r.includes?.join(' · ')}</p>
                    </div>
                    <span className="text-gold font-bold text-sm">{range(r.min, r.max)}</span>
                  </div>
                ))}
                {'addOns' in data && data.addOns.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {data.addOns.map(a => (
                      <div key={a.name} className="flex items-center gap-2 text-xs px-3 py-1.5 bg-hap-surface3 border border-hap-border rounded-xl">
                        <span className="text-white/40">+ {a.name}</span>
                        <span className="text-gold font-bold">From ₦{a.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'audio', division: 'Sound', icon: '🎙️', title: 'H.ART Audio',
      content: (
        <div className="space-y-5">
          {[
            { label: 'Recording Studio', data: PRICING.audioRecording.rates },
            { label: 'Mixing & Mastering', data: PRICING.mixingMastering.rates },
            { label: 'Sound Design', data: PRICING.soundDesign.rates },
            { label: 'Film Scoring & Composition', data: PRICING.filmScoring.rates },
          ].map(({ label, data }) => (
            <div key={label}>
              <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">{label}</p>
              <div className="space-y-2">
                {data.map(r => (
                  <div key={r.name} className="flex items-center justify-between p-3 bg-hap-surface2 border border-hap-border rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-white">{r.name}</p>
                      <p className="text-xs text-white/30">{Array.isArray(r.includes) ? r.includes.join(' · ') : r.includes}</p>
                    </div>
                    <span className="text-gold font-bold text-sm">{range(r.min, r.max)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'rentals', division: 'Spaces', icon: '📦', title: 'Equipment Rentals',
      content: (
        <div className="space-y-2">
          {PRICING.equipmentRental.categories.map(c => (
            <div key={c.name} className="flex items-center justify-between p-3 bg-hap-surface2 border border-hap-border rounded-xl">
              <div>
                <p className="text-sm font-medium text-white">{c.name}</p>
                {c.includes && <p className="text-xs text-white/30">{c.includes.join(' · ')}</p>}
              </div>
              <span className="text-gold font-bold text-sm">From ₦{c.from.toLocaleString()}/{c.unit}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'costumes', division: 'Experiences', icon: '👗', title: 'Costume House',
      content: (
        <div className="space-y-2">
          {PRICING.costumeRental.tiers.map(t => (
            <div key={t.name} className="flex items-start justify-between p-3 bg-hap-surface2 border border-hap-border rounded-xl gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{t.name}</p>
                <p className="text-xs text-white/30">{t.examples.join(', ')}</p>
              </div>
              <span className="text-gold font-bold text-sm flex-shrink-0">
                {t.unit === 'custom' ? 'Custom pricing' : `${range(t.min, t.max)}/${t.unit}`}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'talent', division: 'People', icon: '✦', title: 'Creative Talent Booking',
      content: (
        <div>
          <div className="p-4 bg-gold/5 border border-gold/20 rounded-xl mb-4">
            <p className="text-sm font-semibold text-gold mb-1">Commission Model</p>
            <p className="text-xs text-white/50">HERIT earns <strong className="text-white">{PRICING.talentBooking.commissionRange.min}%–{PRICING.talentBooking.commissionRange.max}%</strong> on completed talent bookings through the platform.</p>
          </div>
          <div className="space-y-2">
            {PRICING.talentBooking.examples.map(e => (
              <div key={e.role} className="flex items-center justify-between p-3 bg-hap-surface2 border border-hap-border rounded-xl text-sm">
                <span className="text-white/60">{e.role} booking</span>
                <div className="text-right">
                  <p className="text-white/70">₦{e.fee.toLocaleString()}</p>
                  <p className="text-xs text-gold">HERIT: {e.heritCommission}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'agency', division: 'Brands', icon: '📣', title: 'Creative Agency',
      content: (
        <div className="grid sm:grid-cols-2 gap-3">
          {PRICING.creativeAgency.packages.map(p => (
            <div key={p.name} className={`shimmer-card p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${p.highlight ? 'border-gold bg-gold/5 hover:shadow-gold scale-[1.02]' : 'border-hap-border bg-hap-surface2 hover:border-gold/30'}`}>
              {p.highlight && (
                <div className="flex justify-center mb-3">
                  <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-widest bg-gold text-hap-bg px-3 py-1.5 rounded-full animate-glow-pulse shadow-gold">★ Most Popular</span>
                </div>
              )}
              <h4 className="font-display font-bold text-white mb-1">{p.name}</h4>
              <div className="mb-3">
                <span className="text-gold font-bold text-lg">₦{p.price.toLocaleString()}</span>
                <span className="text-white/30 text-xs">/{p.period}</span>
                {p.startingFrom && <span className="text-white/30 text-xs"> starting from</span>}
              </div>
              <ul className="space-y-1">
                {p.includes.map(i => <li key={i} className="text-xs text-white/40 flex gap-1.5"><span className="text-gold/50">▸</span>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'academy', division: 'Experiences', icon: '🎓', title: 'H.ART Academy',
      content: (
        <div className="space-y-2">
          {PRICING.academy.tiers.map(t => (
            <div key={t.name} className="flex items-start justify-between p-3 bg-hap-surface2 border border-hap-border rounded-xl gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{t.name}</p>
                <p className="text-xs text-white/30">{t.includes.join(' · ')}</p>
              </div>
              <span className="text-gold font-bold text-sm flex-shrink-0">{range(t.min, t.max)}</span>
            </div>
          ))}
          <div className="mt-3 p-3 bg-hap-surface3 border border-hap-border rounded-xl text-xs text-white/30 text-center">Coming Soon — launching Q1 2027</div>
        </div>
      ),
    },
    {
      id: 'membership', division: 'Brands', icon: '⭐', title: 'Membership Plans',
      content: (
        <div className="grid sm:grid-cols-2 gap-3">
          {PRICING.membership.plans.map(p => (
            <div key={p.name} className="p-4 bg-hap-surface2 border border-hap-border rounded-2xl">
              <p className="font-bold text-white mb-1">{p.name}</p>
              <p className="text-gold font-bold text-xl mb-3">₦{p.price.toLocaleString()}<span className="text-white/30 text-xs font-normal">/{p.period}</span></p>
              <ul className="space-y-1">
                {p.benefits.map(b => <li key={b} className="text-xs text-white/40 flex gap-1.5"><span className="text-gold/50">▸</span>{b}</li>)}
              </ul>
            </div>
          ))}
          <div className="sm:col-span-2 p-3 bg-hap-surface3 border border-hap-border rounded-xl text-xs text-white/30 text-center">Membership plans launching soon — join the waitlist</div>
        </div>
      ),
    },
  ]

  useScrollReveal()
  const visible = active === 'all' ? sections : sections.filter(s => s.division === active)

  return (
    <PublicLayout>
      {/* Hero */}
      <div className="relative py-20 px-6 text-center border-b border-hap-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gold/4 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-3 animate-scale-in">Pricing</p>
          <h1 className="font-display text-5xl font-bold mb-4">
            <span className="block animate-reveal delay-200" style={{ animationFillMode:'both' }}>Transparent,</span>
            <span className="block animate-reveal delay-400 text-gold-animate" style={{ animationFillMode:'both' }}>Flexible Pricing</span>
          </h1>
          <p className="text-white/40 text-base leading-relaxed mb-6 animate-reveal delay-500" style={{ animationFillMode:'both' }}>From single studio sessions to full creative campaigns — every service, clearly priced.</p>
          <Link to="/contact" className="ripple-btn inline-block border border-gold text-gold hover:bg-gold hover:text-hap-bg font-bold px-8 py-3 rounded-2xl text-sm transition-all hover:shadow-gold hover:scale-105 no-underline animate-reveal delay-600" style={{ animationFillMode:'both' }}>Get a Custom Quote</Link>
        </div>
      </div>

      {/* Division filter */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          <button onClick={() => setActive('all')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 ${active==='all'?'bg-gold text-hap-bg shadow-gold':'bg-hap-surface border border-hap-border text-white/40 hover:text-white hover:border-gold/30'}`}>All Services</button>
          {DIVISIONS.map(d => (
            <button key={d.key} onClick={() => setActive(d.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 ${active===d.key?'bg-gold text-hap-bg shadow-gold':'bg-hap-surface border border-hap-border text-white/40 hover:text-white hover:border-gold/30'}`}>
              <span>{d.icon}</span>{d.label}
            </button>
          ))}
        </div>

        {/* Revenue model overview */}
        {active === 'all' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {DIVISIONS.map((d, i) => (
              <div key={d.key} data-reveal className={`delay-${(i % 3 + 1) * 100} shimmer-card flex items-center gap-4 p-4 bg-hap-surface border border-hap-border rounded-2xl hover:border-gold/30 hover:-translate-y-1 hover:shadow-gold transition-all duration-300 cursor-pointer group`} onClick={() => setActive(d.key)}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" style={{ background: `${d.color}22`, border: `1px solid ${d.color}33` }}>{d.icon}</div>
                <div>
                  <p className="font-display font-bold text-white group-hover:text-gold transition-colors">{d.label}</p>
                  <p className="text-xs text-white/35">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pricing sections */}
        <div className="space-y-10">
          {visible.map((s, i) => (
            <div key={s.id} id={s.id} data-reveal className={`delay-${(i % 4 + 1) * 100}`}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl hover:scale-125 hover:rotate-6 transition-transform duration-300 cursor-default">{s.icon}</span>
                <div>
                  <p className="text-[0.6rem] uppercase tracking-widest text-white/25 font-bold">{s.division}</p>
                  <h2 className="font-display text-xl font-bold text-white">{s.title}</h2>
                </div>
              </div>
              {s.content}
            </div>
          ))}
        </div>

        {/* Payment rules */}
        <div className="mt-16 shimmer-card card" data-reveal>
          <h3 className="font-display text-xl font-bold text-white mb-4">Payment Terms & Policies</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon:'💳', title:'Payment Methods', body: PRICING.paymentRules.paymentMethods.join(' · ') },
              { icon:'🔐', title:'Booking Deposit', body: `${PRICING.paymentRules.deposit}% deposit required to secure any booking` },
              { icon:'📅', title:'Balance Due', body: PRICING.paymentRules.balanceDue },
              { icon:'↩️', title:'Refund Policy', body: PRICING.paymentRules.refundPolicy },
            ].map((item, i) => (
              <div key={item.title} data-reveal className={`delay-${(i+1)*100} p-4 bg-hap-surface2 border border-hap-border rounded-xl hover:border-gold/25 hover:-translate-y-0.5 transition-all duration-200`}>
                <span className="text-2xl mb-2 block hover:scale-125 transition-transform duration-200 cursor-default">{item.icon}</span>
                <p className="font-semibold text-white text-sm mb-1">{item.title}</p>
                <p className="text-xs text-white/40 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center" data-reveal>
          <p className="text-white/40 text-sm mb-4">Need something custom? All prices are negotiable for large productions.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact" className="ripple-btn inline-block bg-gold hover:bg-gold-hover text-hap-bg font-bold px-8 py-3.5 rounded-2xl text-sm transition-all hover:shadow-gold hover:scale-105 no-underline">Request Custom Quote</Link>
            <Link to="/signup" className="ripple-btn inline-block border border-hap-border text-white/60 hover:text-white hover:border-gold/40 px-8 py-3.5 rounded-2xl text-sm transition-all hover:scale-105 no-underline">Create Account</Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
