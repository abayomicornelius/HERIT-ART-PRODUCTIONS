import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import PublicLayout from '../../components/layout/PublicLayout'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { PRODUCTIONS } from '../../data/productions'
import { STUDIOS } from '../../data/studios'
import { CREATIVES } from '../../data/creatives'
import { PRICING, DIVISIONS } from '../../data/pricing'

const HAP_LOGO    = 'https://ugc.production.linktr.ee/9c73a313-ebff-44d8-af46-330a1db7d77e_B5D1DC04-F0C4-4B7E-B7A0-DC0C7C178B5F.png'
const SHOWMAN_IMG = 'https://ugc.production.linktr.ee/e13f103f-ae98-43a0-84a3-5d050dfd71e7_651781318-17868970527580970-6600945857390022727-n.jpeg'

const fmt = s => new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const naira = n => `₦${n.toLocaleString()}`


// Ripple button effect
function useRipple(ref) {
  useEffect(() => {
    const el = ref.current; if (!el) return
    const handler = e => {
      const r = el.getBoundingClientRect()
      const d = Math.max(r.width, r.height)
      const span = document.createElement('span')
      span.className = 'ripple'
      span.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`
      el.appendChild(span)
      setTimeout(() => span.remove(), 700)
    }
    el.addEventListener('click', handler)
    return () => el.removeEventListener('click', handler)
  }, [ref])
}

// Gold particles
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 5,
  duration: Math.random() * 6 + 6,
  opacity: Math.random() * 0.5 + 0.3,
  bottom: Math.random() * 40,
}))

export default function Home() {
  useScrollReveal()
  const [mouse, setMouse] = useState({ x: 50, y: 40 })
  const heroRef = useRef(null)
  const ctaRef = useRef(null)
  useRipple(ctaRef)

  function onMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }

  return (
    <PublicLayout>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section ref={heroRef} onMouseMove={onMouseMove}
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

        {/* Mouse-following radial glow */}
        <div className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out"
          style={{ background: `radial-gradient(700px circle at ${mouse.x}% ${mouse.y}%, rgba(201,168,76,0.07), transparent 60%)` }} />

        {/* Static background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gold/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-red-900/8 rounded-full blur-3xl animate-float-d1" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-900/8 rounded-full blur-3xl animate-float-d2" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-gold/3 rounded-full blur-3xl animate-float-d3" />

          {/* Gold vertical lines */}
          <div className="absolute top-1/4 left-12 h-40 w-px bg-gradient-to-b from-transparent via-gold/25 to-transparent animate-float-d1" />
          <div className="absolute top-1/3 right-12 h-56 w-px bg-gradient-to-b from-transparent via-gold/15 to-transparent animate-float-d2" />

          {/* Rising gold particles */}
          {PARTICLES.map(p => (
            <div key={p.id} className="particle absolute"
              style={{
                width: p.size, height: p.size,
                left: `${p.left}%`, bottom: `${p.bottom}%`,
                opacity: p.opacity,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }} />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center pt-10">
          {/* Animated logo */}
          <div className="flex justify-center mb-8 animate-bounce-in">
            <div className="relative">
              {/* Pulsing outer glow */}
              <div className="absolute inset-0 rounded-full bg-gold/20 blur-2xl scale-150 animate-glow-pulse" />
              {/* Orbiting dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-3 h-3 rounded-full bg-gold animate-orbit"
                  style={{ boxShadow: '0 0 8px #c9a84c' }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-2 h-2 rounded-full bg-gold/60 animate-orbit-rev" />
              </div>
              <img src={HAP_LOGO} alt="HERIT ART PRODUCTIONS"
                className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-2 border-gold/50 animate-glow-pulse"
                style={{ animationDelay: '0.5s' }} />
            </div>
          </div>

          {/* Badge */}
          <div className="animate-scale-in delay-200 inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-5 py-2 text-gold text-xs font-bold tracking-widest uppercase mb-7 shimmer-card">
            <span className="w-2 h-2 bg-gold rounded-full animate-glow-pulse-fast" />
            Africa's Premier Creative Powerhouse
            <span className="w-2 h-2 bg-gold rounded-full animate-glow-pulse-fast" style={{ animationDelay:'0.4s' }} />
          </div>

          {/* Headline — each line animates in */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6">
            <span className="block animate-reveal delay-300" style={{ animationFillMode:'both' }}>Theatre. Film.</span>
            <span className="block animate-reveal delay-500 text-gold-animate" style={{ animationFillMode:'both' }}>
              Music &amp; Social Impact.
            </span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed mb-12 animate-reveal delay-600" style={{ animationFillMode:'both' }}>
            HERIT ART PRODUCTIONS is Africa's creative powerhouse — merging theatre, film, music and social impact into one extraordinary ecosystem.
          </p>

          {/* CTA grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto animate-reveal delay-700" style={{ animationFillMode:'both' }}>
            {[
              { label: 'Explore Productions', href: '/productions', icon: '🎭', primary: true  },
              { label: 'Book H.ART Studios',  href: '/studios',     icon: '🎙️', primary: false },
              { label: 'Buy Event Tickets',   href: '/events',      icon: '🎟️', primary: false },
              { label: 'Hire Services',       href: '/services',    icon: '🎬', primary: false },
            ].map((cta, i) => (
              <Link key={cta.label} to={cta.href}
                className={`ripple-btn tilt-card flex flex-col items-center gap-2 p-4 rounded-2xl border text-xs font-semibold transition-all no-underline ${
                  cta.primary
                    ? 'bg-gold text-hap-bg border-gold hover:bg-gold-hover hover:shadow-gold hover:scale-105'
                    : 'bg-hap-surface border-hap-borderl hover:border-gold/50 hover:bg-gold/5 hover:text-gold hover:scale-105 hover:-translate-y-1'
                }`} style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="text-2xl group-hover:animate-bounce">{cta.icon}</span>
                {cta.label}
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-20 pt-10 border-t border-hap-border grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-xl mx-auto">
            {[['6','Productions'],['7','Social Platforms'],['3','Upcoming Shows'],['∞','Stories to Tell']].map(([n, l], i) => (
              <div key={l} data-reveal className={`delay-${(i+1)*100}`}>
                <p className="font-display text-3xl sm:text-4xl font-bold text-gold-animate">{n}</p>
                <p className="text-xs text-white/30 mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Productions ──────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div data-reveal><SectionHeader eyebrow="On Stage & Screen" title="Featured Productions" sub="Our latest and upcoming shows, films and experiences." link="/productions" linkLabel="All Productions" /></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTIONS.map((p, i) => (
              <Link key={p.id} to={`/productions/${p.id}`} className="group block no-underline"
                data-reveal style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="rounded-2xl overflow-hidden border border-hap-border hover:border-gold/30 transition-all hover:-translate-y-1 bg-hap-surface">
                  {/* Poster */}
                  <div className="aspect-[3/4] flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(145deg, ${p.color}33, ${p.color}66)` }}>
                    {p.image
                      ? <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                      : <div className="text-center">
                          <img src={HAP_LOGO} alt="HAP" className="w-16 h-16 rounded-full object-cover mx-auto mb-2 opacity-60" />
                          <p className="text-xs text-white/40 uppercase tracking-widest">{p.category}</p>
                        </div>
                    }
                    <div className="absolute top-3 left-3">
                      <span className={`text-[0.65rem] font-bold px-2.5 py-1 rounded-full ${p.status === 'Upcoming' ? 'bg-gold text-hap-bg' : 'bg-white/10 text-white/60'}`}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-white/30 mb-1">{p.category} · {p.city}</p>
                    <h3 className="font-display font-bold text-white text-lg mb-1 group-hover:text-gold transition-colors">{p.title}</h3>
                    <p className="text-xs text-white/40 mb-4">{fmt(p.date)} · {p.venue}</p>
                    {p.status === 'Upcoming' ? (
                      <div className="bg-gold hover:bg-gold-hover text-hap-bg font-bold py-2.5 rounded-xl text-xs text-center transition-all">
                        Buy Tickets
                      </div>
                    ) : (
                      <div className="text-white/30 text-xs text-center py-2.5">Past Production</div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── H.ART Studios ────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-hap-surface/30 border-y border-hap-border">
        <div className="max-w-7xl mx-auto">
          <div data-reveal><SectionHeader eyebrow="H.ART Studios" title="World-Class Creative Spaces" sub="Professional studios built for artists, filmmakers, musicians and storytellers." link="/studios" linkLabel="Explore Studios" /></div>
          <div className="grid md:grid-cols-3 gap-5">
            {STUDIOS.map((s, i) => (
              <div key={s.id} data-reveal className={`delay-${(i+1)*100} shimmer-card glow-border card hover:border-gold/20 hover:-translate-y-2 hover:shadow-gold transition-all duration-300`}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 border border-hap-borderl transition-transform duration-300 hover:scale-110 hover:rotate-3"
                  style={{ background: `${s.color}20` }}>
                  {s.icon}
                </div>
                <h4 className="font-display font-bold text-white text-lg mb-1">{s.name}</h4>
                <p className="text-xs text-white/30 mb-3">{s.subtitle}</p>
                <p className="text-sm text-white/50 leading-relaxed mb-5">{s.description}</p>
                <Link to="/studios/book" className="block text-center bg-hap-surface2 border border-hap-border hover:border-gold/30 hover:text-gold text-white/60 font-semibold py-2.5 rounded-xl text-xs transition-all no-underline">
                  Book Now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Creative Network ─────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div data-reveal><SectionHeader eyebrow="H.ART Creative Network" title="Discover Exceptional Talent" sub="Connect with actors, directors, composers, dancers and more." link="/network" linkLabel="Browse All Creatives" /></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CREATIVES.slice(0, 6).map((c, i) => (
              <Link key={c.id} to={`/network/${c.id}`} data-reveal className={`delay-${(i % 3 + 1) * 100} group shimmer-card card no-underline hover:border-gold/20 hover:-translate-y-1 hover:shadow-gold transition-all duration-300`}>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-hap-bg text-lg flex-shrink-0" style={{ background: `linear-gradient(135deg, ${c.color}99, ${c.color})` }}>
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-semibold text-white group-hover:text-gold transition-colors">{c.name}</p>
                      {c.verified && <span className="text-gold text-xs" title="Verified">✦</span>}
                    </div>
                    <p className="text-xs text-white/40">{c.category} · {c.location}</p>
                    <p className="text-xs text-white/25 mt-0.5">{c.experience} experience</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${c.available ? 'bg-green-400' : 'bg-white/20'}`} title={c.available ? 'Available' : 'Unavailable'} />
                </div>
                <div className="flex flex-wrap gap-1 mt-4">
                  {c.skills.slice(0, 3).map(sk => (
                    <span key={sk} className="text-[0.65rem] px-2 py-0.5 rounded-full bg-hap-surface3 text-white/40 border border-hap-border">{sk}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Everything We Offer ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-hap-surface/30 border-y border-hap-border">
        <div className="max-w-7xl mx-auto">
          <div data-reveal><SectionHeader eyebrow="One Platform" title="Everything Under One Roof" sub="Eight distinct services — one creative ecosystem built for Africa." link="/pricing" linkLabel="View All Pricing" /></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ALL_SERVICES.map((s, i) => (
              <Link key={s.label} to={s.href} data-reveal className={`delay-${(i % 4 + 1) * 100} group shimmer-card glow-border card no-underline hover:border-gold/20 hover:-translate-y-2 hover:shadow-gold transition-all duration-300`}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl block group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300">{s.icon}</span>
                  <span className={`text-[0.55rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${DIVISION_COLORS[s.division]}`}>{s.division}</span>
                </div>
                <h5 className="font-semibold text-white mb-1 group-hover:text-gold transition-colors text-sm">{s.label}</h5>
                <p className="text-xs text-white/35 leading-relaxed mb-4">{s.desc}</p>
                <p className="text-gold font-bold text-sm">{s.from}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Creative Agency Plans ─────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal><SectionHeader eyebrow="Creative Agency" title="We Produce Your Brand's Story" sub="From social media content to full commercial productions — pick the plan that grows with your brand." link="/services" linkLabel="View All Services" /></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {PRICING.creativeAgency.packages.map((p, i) => (
              <div key={p.name} data-reveal className={`delay-${(i+1)*100} relative shimmer-card rounded-2xl border p-6 transition-all duration-300 ${p.highlight ? 'border-gold bg-gold/5 hover:-translate-y-3 hover:shadow-gold scale-[1.02]' : 'border-hap-border bg-hap-surface hover:-translate-y-2 hover:shadow-gold'}`}>
                {p.highlight && (
                  <div className="flex justify-center mb-4">
                    <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest bg-gold text-hap-bg px-4 py-1.5 rounded-full animate-glow-pulse whitespace-nowrap shadow-gold">
                      ★ Most Popular
                    </span>
                  </div>
                )}
                <h5 className="font-display font-bold text-white mb-3">{p.name}</h5>
                <div className="mb-4">
                  <span className="text-gold font-bold text-2xl">{naira(p.price)}</span>
                  <span className="text-white/30 text-xs">/{p.period}</span>
                  {p.startingFrom && <span className="text-white/30 text-xs"> from</span>}
                </div>
                <ul className="space-y-2 mb-5">
                  {p.includes.map(i => (
                    <li key={i} className="text-xs text-white/40 flex gap-2">
                      <span className="text-gold/50 flex-shrink-0 mt-0.5">▸</span>{i}
                    </li>
                  ))}
                </ul>
                <Link to="/services" className={`block text-center text-xs font-bold py-2.5 rounded-xl transition-all no-underline ${p.highlight ? 'bg-gold hover:bg-gold-hover text-hap-bg' : 'border border-hap-borderl text-white/50 hover:text-gold hover:border-gold/30'}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-white/25">All prices negotiable for large productions · Custom quotes available</p>
        </div>
      </section>

      {/* ── Pricing Highlights ───────────────────────────────────────── */}
      <section className="py-20 px-6 bg-hap-surface/30 border-y border-hap-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-2">Transparent Pricing</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Every Budget Welcome</h2>
              <p className="text-white/40 mt-2 text-sm">No surprises. Clear rates for every service we offer.</p>
            </div>
            <Link to="/pricing" className="text-sm text-gold hover:text-gold-hover transition-colors no-underline whitespace-nowrap">Full Pricing Guide →</Link>
          </div>

          {/* Pricing spotlight grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRICE_HIGHLIGHTS.map((h, i) => (
              <Link key={h.title} to={h.href} data-reveal className={`delay-${(i+1)*100} group shimmer-card relative rounded-2xl border border-hap-border bg-hap-surface p-6 no-underline hover:border-gold/25 hover:-translate-y-2 hover:shadow-gold transition-all duration-300 overflow-hidden`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: `radial-gradient(ellipse at top left, ${h.glow}08, transparent 60%)` }} />
                <div className="relative z-10">
                  <span className="text-3xl block mb-3">{h.icon}</span>
                  <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1">{h.category}</p>
                  <h5 className="font-display font-bold text-white text-base mb-1 group-hover:text-gold transition-colors">{h.title}</h5>
                  <p className="text-xs text-white/35 mb-5 leading-relaxed">{h.desc}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-gold font-bold text-xl">{h.from}</span>
                    <span className="text-white/30 text-xs mb-0.5">{h.unit}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Ticket tiers callout */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {PRICING.tickets.tiers.map(t => (
              <div key={t.name} className="rounded-2xl border border-hap-border bg-hap-surface p-5 text-center hover:border-gold/20 transition-all">
                <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-2">{t.name} Ticket</p>
                <p className="text-gold font-bold text-lg">{naira(t.min)} – {naira(t.max)}</p>
                <p className="text-[0.65rem] text-white/25 mt-2">{t.perks[0]}{t.perks[1] ? ` · ${t.perks[1]}` : ''}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-white/20 mt-4">Ticket prices vary per production · Always includes platform booking confirmation</p>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div data-reveal><SectionHeader eyebrow="What They Say" title="Trusted by Audiences & Brands" /></div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} data-reveal className={`delay-${(i+1)*150} shimmer-card card hover:border-gold/20 hover:-translate-y-1 hover:shadow-gold transition-all duration-300`}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gold text-sm inline-block hover:scale-150 hover:rotate-12 transition-transform duration-200 cursor-default"
                      style={{ animationDelay: `${i * 0.1}s` }}>★</span>
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-hap-border">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-hap-bg flex-shrink-0" style={{ background: t.color }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/30">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Watch Our Work ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-hap-surface/30 border-y border-hap-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-2">Production Archive</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Watch Our Work</h2>
              <p className="text-white/40 mt-2 text-sm">Behind the scenes, full productions, trailers and highlights on our YouTube channel.</p>
            </div>
            <a href="https://youtube.com/@herit_artproduction" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border border-hap-border hover:border-red-500/50 text-white/50 hover:text-red-400 px-4 py-2.5 rounded-xl text-sm font-medium transition-all no-underline whitespace-nowrap">
              <span className="text-base">▶</span> YouTube Channel →
            </a>
          </div>

          {/* Production archive cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {YOUTUBE_ARCHIVE.map((v, i) => (
              <a key={v.title} href="https://youtube.com/@herit_artproduction" target="_blank" rel="noopener noreferrer"
                data-reveal className={`delay-${(i % 3 + 1) * 100} group relative rounded-2xl overflow-hidden border border-hap-border hover:border-gold/30 transition-all duration-300 no-underline hover:-translate-y-2 hover:shadow-gold`}>
                {/* Thumbnail */}
                <div className="aspect-video relative overflow-hidden" style={{ background: `linear-gradient(145deg, ${v.color}44, ${v.color}88)` }}>
                  {v.img
                    ? <img src={v.img} alt={v.title} className="absolute inset-0 w-full h-full object-cover object-top" />
                    : <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                        <div>
                          <img src={HAP_LOGO} alt="HAP" className="w-10 h-10 rounded-full object-cover mx-auto mb-2 opacity-50" />
                          <p className="font-display text-lg font-bold text-white/80 leading-tight">{v.title}</p>
                          <p className="text-xs text-white/40 mt-1">{v.type}</p>
                        </div>
                      </div>
                  }
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all">
                    <div className="w-14 h-14 rounded-full bg-white/20 group-hover:bg-white/90 border-2 border-white/40 group-hover:border-white flex items-center justify-center transition-all scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100">
                      <span className="text-hap-bg text-xl ml-1">▶</span>
                    </div>
                  </div>
                  {/* Archive tag */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[0.6rem] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-black/60 text-white/80 backdrop-blur">{v.year}</span>
                  </div>
                </div>
                <div className="p-4 bg-hap-surface">
                  <p className="font-semibold text-white text-sm group-hover:text-gold transition-colors">{v.title}</p>
                  <p className="text-xs text-white/35 mt-0.5">{v.type} · {v.year}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Social follow row */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-hap-border">
            <p className="text-sm text-white/30">Follow us on</p>
            {[
              { label:'Instagram', icon:'IG', href:'https://www.instagram.com/heritartproductions', color:'text-pink-400 border-pink-400/20 hover:border-pink-400/50' },
              { label:'YouTube', icon:'▶', href:'https://youtube.com/@herit_artproduction', color:'text-red-400 border-red-400/20 hover:border-red-400/50' },
              { label:'TikTok', icon:'TT', href:'https://www.tiktok.com/@herit.art.production', color:'text-white/60 border-white/10 hover:border-white/30' },
              { label:'Facebook', icon:'f', href:'https://www.facebook.com/heritartproductions', color:'text-blue-400 border-blue-400/20 hover:border-blue-400/50' },
              { label:'X / Twitter', icon:'𝕏', href:'https://x.com/art_herit55305', color:'text-white/60 border-white/10 hover:border-white/30' },
              { label:'Threads', icon:'Th', href:'https://www.threads.com/@heritartproductions', color:'text-white/60 border-white/10 hover:border-white/30' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all no-underline ${s.color}`}>
                <span>{s.icon}</span>{s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto" data-reveal>
          <div className="relative bg-gradient-to-br from-hap-surface to-hap-surface2 border border-gold/25 rounded-3xl p-14 text-center overflow-hidden glow-border shimmer-card">
            {/* Animated background orbs inside CTA */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-3xl animate-float" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-gold/4 rounded-full blur-2xl animate-float-d1" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-xl animate-float-d2" />
            </div>
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gold/30 blur-xl animate-glow-pulse" />
                  <img src={HAP_LOGO} alt="HERIT ART PRODUCTIONS"
                    className="relative w-20 h-20 rounded-2xl object-cover shadow-gold animate-bounce-in" />
                </div>
              </div>
              <h2 className="font-display text-4xl font-bold mb-4">HERIT becomes your creative home.</h2>
              <p className="text-white/40 mb-10 text-base leading-relaxed">Whether you want entertainment, want to create, need talent, need production, or want to collaborate — HERIT is where it begins.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/signup" className="ripple-btn bg-gold hover:bg-gold-hover text-hap-bg font-bold px-8 py-3.5 rounded-2xl text-sm transition-all hover:shadow-gold hover:scale-105 no-underline">
                  Join HERIT — Free
                </Link>
                <Link to="/contact" className="ripple-btn border border-hap-borderl text-white/60 hover:text-white hover:border-gold/40 font-semibold px-8 py-3.5 rounded-2xl text-sm transition-all hover:scale-105 no-underline">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

function SectionHeader({ eyebrow, title, sub, link, linkLabel }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
      <div>
        {eyebrow && <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-2">{eyebrow}</p>}
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">{title}</h2>
        {sub && <p className="text-white/40 mt-2 text-sm max-w-xl">{sub}</p>}
      </div>
      {link && <Link to={link} className="text-sm text-gold hover:text-gold-hover transition-colors no-underline whitespace-nowrap">{linkLabel} →</Link>}
    </div>
  )
}

const YOUTUBE_ARCHIVE = [
  { title: 'LEGENDS: THE MUSICAL', type: 'Musical',  year: '2026', color: '#c9a84c', img: null },
  { title: 'THE GREATEST SHOWMAN', type: 'Musical',  year: '2026', color: '#8B1A1A', img: SHOWMAN_IMG },
  { title: 'ZYNARA',               type: 'Theatre',  year: '2025', color: '#4A2060', img: null },
  { title: 'THE NIGHT BEFORE',     type: 'Theatre',  year: '2025', color: '#1a3a5c', img: null },
  { title: 'Ajagun-Nla',           type: 'Theatre',  year: '2025', color: '#5c3a1a', img: null },
  { title: 'The Lion King (LASU WAY)', type: 'Musical', year: '2024', color: '#2D5016', img: null },
]

const DIVISION_COLORS = {
  Stories:     'text-yellow-400/70 border-yellow-400/20 bg-yellow-400/5',
  Spaces:      'text-purple-400/70 border-purple-400/20 bg-purple-400/5',
  Sound:       'text-green-400/70 border-green-400/20 bg-green-400/5',
  People:      'text-amber-400/70 border-amber-400/20 bg-amber-400/5',
  Brands:      'text-pink-400/70 border-pink-400/20 bg-pink-400/5',
  Experiences: 'text-indigo-400/70 border-indigo-400/20 bg-indigo-400/5',
}

const ALL_SERVICES = [
  { icon:'🎭', label:'Theatre & Productions',  href:'/productions', division:'Stories',     desc:'Live stage shows, film screenings and immersive experiences.',      from:'From ₦10,000 / ticket' },
  { icon:'🎟️', label:'Events & Ticketing',      href:'/events',      division:'Stories',     desc:'Third-party events listed and sold through the HERIT platform.',   from:'From ₦20,000 listing' },
  { icon:'🎥', label:'H.ART Studios',           href:'/studios',     division:'Spaces',      desc:'Visual, photography and rehearsal spaces in Lagos.',                from:'From ₦5,000 / hr' },
  { icon:'🎙️', label:'H.ART Audio',             href:'/audio',       division:'Sound',       desc:'Recording, mixing, mastering, sound design and film scoring.',     from:'From ₦10,000 / hr' },
  { icon:'📦', label:'Equipment Rentals',       href:'/rentals',     division:'Spaces',      desc:'Cameras, lighting, audio gear and full production packages.',      from:'From ₦15,000 / day' },
  { icon:'👗', label:'Costume House',            href:'/costumes',    division:'Experiences', desc:'Basic, premium and full production costume packages.',              from:'From ₦10,000 / day' },
  { icon:'✦',  label:'Creative Network',         href:'/network',     division:'People',      desc:'Book actors, directors, cinematographers and more.',               from:'10–20% commission' },
  { icon:'📣', label:'Creative Agency',          href:'/services',    division:'Brands',      desc:'Brand content, campaigns, corporate media and commercials.',       from:'From ₦150,000 / mo' },
]

const PRICE_HIGHLIGHTS = [
  { icon:'🎙️', category:'Sound', title:'Recording Studio', desc:'Professional recording with engineer included. Artist packages available.', from:'₦10,000', unit:'/ hour', href:'/audio', glow:'#10b981' },
  { icon:'🎥', category:'Spaces', title:'Content Studio', desc:'Fully equipped visual studio for video and photo shoots.', from:'₦15,000', unit:'/ hour', href:'/studios', glow:'#7c3aed' },
  { icon:'👗', category:'Experiences', title:'Costume Rentals', desc:'Wide range of costumes for theatre, film and events.', from:'₦10,000', unit:'/ day', href:'/costumes', glow:'#8b5cf6' },
  { icon:'📦', category:'Spaces', title:'Equipment Hire', desc:'Full production gear — cameras, lighting and audio packages.', from:'₦15,000', unit:'/ day', href:'/rentals', glow:'#7c3aed' },
  { icon:'🎓', category:'Experiences', title:'H.ART Academy', desc:'Masterclasses and workshops taught by working professionals.', from:'₦10,000', unit:'/ class', href:'/academy', glow:'#8b5cf6' },
  { icon:'🎵', category:'Sound', title:'Film Scoring', desc:'Original scores for short films, feature films and theatre.', from:'₦200,000', unit:'/ project', href:'/audio', glow:'#10b981' },
]

const TESTIMONIALS = [
  { name: 'Chioma Adeyemi', role: 'Audience Member', avatar: 'CA', color: '#c9a84c', quote: '1960 was unlike any theatre experience I have had in Lagos. Raw, powerful and deeply Nigerian. I wept and danced in the same hour.' },
  { name: 'Zara Lagos Brand', role: 'Brand Client', avatar: 'ZL', color: '#7c3aed', quote: 'HERIT produced our entire summer campaign — concept to delivery. The quality and professionalism exceeded our expectations completely.' },
  { name: 'Emeka Obi', role: 'Creative Professional', avatar: 'EO', color: '#059669', quote: 'Being part of the HERIT Creative Network has opened doors I could not have opened on my own. Three productions in one year.' },
]
