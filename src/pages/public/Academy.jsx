import { useState } from 'react'
import { Link } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'
import { PRICING } from '../../data/pricing'
import { useToast } from '../../context/ToastContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const WORKSHOPS = [
  { id:1, icon:'🎭', category:'Theatre', title:'Acting for Stage & Screen', instructor:'Amaka Osei', date:'Aug 5, 2026', duration:'2 days', price:80000, spots:12, enrolled:8, level:'Intermediate' },
  { id:2, icon:'🎬', category:'Film', title:'Cinematography Masterclass', instructor:'Emeka Uche', date:'Aug 19, 2026', duration:'1 day', price:60000, spots:10, enrolled:6, level:'All Levels' },
  { id:3, icon:'🎵', category:'Music', title:'Film Scoring & Composition', instructor:'Sade Okonkwo', date:'Sep 3, 2026', duration:'3 days', price:150000, spots:8, enrolled:3, level:'Advanced' },
  { id:4, icon:'✍️', category:'Writing', title:'Scriptwriting for African Narratives', instructor:'Ngozi Okafor', date:'Sep 17, 2026', duration:'2 days', price:70000, spots:15, enrolled:10, level:'Beginner' },
  { id:5, icon:'💃', category:'Dance', title:'Contemporary African Movement', instructor:'Taiwo Adeyemi', date:'Oct 1, 2026', duration:'1 day', price:35000, spots:20, enrolled:12, level:'All Levels' },
  { id:6, icon:'📸', category:'Photography', title:'Brand Photography & Visual Storytelling', instructor:'Kofi Mensah', date:'Oct 15, 2026', duration:'1 day', price:55000, spots:12, enrolled:5, level:'Intermediate' },
]

const LEVEL_COLORS = { Beginner:'text-green-400', Intermediate:'text-gold', Advanced:'text-purple-400', 'All Levels':'text-blue-400' }

export default function Academy() {
  const toast = useToast()
  const [cat, setCat] = useState('All')
  const categories = ['All', ...new Set(WORKSHOPS.map(w => w.category))]
  const filtered = cat === 'All' ? WORKSHOPS : WORKSHOPS.filter(w => w.category === cat)

  function enrol(w) {
    toast.success(`Enrolled in "${w.title}"! Check your email for details.`)
  }

  useScrollReveal()
  return (
    <PublicLayout>
      {/* Hero */}
      <div className="relative py-24 px-6 text-center border-b border-hap-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-900/8 rounded-full blur-3xl pointer-events-none animate-float-d2" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-3 animate-scale-in">H.ART Academy</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
            <span className="block animate-reveal delay-200" style={{ animationFillMode:'both' }}>Learn From</span>
            <span className="block animate-reveal delay-400 text-gold-animate" style={{ animationFillMode:'both' }}>the Best</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed mb-3 animate-reveal delay-500" style={{ animationFillMode:'both' }}>Masterclasses, workshops and professional courses led by Africa's top creative professionals.</p>
          <p className="inline-flex items-center gap-2 text-xs bg-gold/10 border border-gold/25 text-gold/80 px-4 py-2 rounded-full mb-8 animate-glow-pulse animate-reveal delay-600" style={{ animationFillMode:'both' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-glow-pulse-fast" />
            Launching Q1 2027 — Register your interest now
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-reveal delay-700" style={{ animationFillMode:'both' }}>
            <button onClick={() => toast.success('You\'re on the waitlist! We\'ll notify you when Academy launches.')} className="ripple-btn bg-gold hover:bg-gold-hover text-hap-bg font-bold px-10 py-4 rounded-2xl text-base transition-all hover:shadow-gold hover:scale-105">
              Join the Waitlist
            </button>
            <a href="#workshops" className="ripple-btn border border-hap-border text-white/60 hover:text-white hover:border-gold/40 px-10 py-4 rounded-2xl text-base transition-all hover:scale-105">
              Browse Workshops
            </a>
          </div>
        </div>
      </div>

      {/* Pricing tiers */}
      <div className="max-w-5xl mx-auto px-6 py-16 border-b border-hap-border">
        <div className="text-center mb-10" data-reveal>
          <h2 className="font-display text-3xl font-bold text-white mb-2">Learning Formats</h2>
          <p className="text-white/40 text-sm">From single sessions to full professional certifications.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {PRICING.academy.tiers.map((t, i) => (
            <div key={t.name} data-reveal className={`delay-${(i+1)*100} shimmer-card card text-center hover:-translate-y-2 hover:shadow-gold transition-all duration-300 ${i === 1 ? 'border-gold/30 bg-gold/3' : 'hover:border-gold/20'}`}>
              <div className="text-3xl mb-3">{['📚','🎓','🏆'][i]}</div>
              <h3 className="font-display text-lg font-bold text-white mb-1">{t.name}</h3>
              <p className="text-gold font-bold text-xl mb-3">
                {t.min && t.max ? `₦${t.min.toLocaleString()} – ₦${t.max.toLocaleString()}` : `From ₦${t.min?.toLocaleString()}`}
              </p>
              <ul className="space-y-1.5 text-left">
                {t.includes.map(inc => <li key={inc} className="text-xs text-white/40 flex gap-2"><span className="text-gold/50 flex-shrink-0">▸</span>{inc}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming workshops */}
      <div id="workshops" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-white mb-1">Upcoming Workshops</h2>
            <p className="text-white/40 text-sm">Preview of sessions launching with the Academy.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${cat===c?'bg-gold text-hap-bg':'bg-hap-surface border border-hap-border text-white/40 hover:text-white'}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((w, i) => {
            const spotsLeft = w.spots - w.enrolled
            return (
              <div key={w.id} data-reveal className={`delay-${(i % 3 + 1) * 100} shimmer-card card hover:border-gold/20 hover:-translate-y-2 hover:shadow-gold transition-all duration-300 group`}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">{w.icon}</span>
                  <span className={`text-[0.6rem] font-bold uppercase tracking-widest ${LEVEL_COLORS[w.level]}`}>{w.level}</span>
                </div>
                <p className="text-[0.6rem] uppercase tracking-widest text-white/25 font-bold mb-1">{w.category}</p>
                <h3 className="font-display font-bold text-white text-base mb-1 group-hover:text-gold transition-colors leading-tight">{w.title}</h3>
                <p className="text-xs text-white/35 mb-4">with <span className="text-white/55">{w.instructor}</span></p>

                <div className="flex flex-wrap gap-2 mb-4 text-xs text-white/40">
                  <span>📅 {w.date}</span>
                  <span>⏱ {w.duration}</span>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/30">{w.enrolled} enrolled</span>
                    <span className={spotsLeft <= 3 ? 'text-red-400 font-bold' : 'text-white/30'}>{spotsLeft} spots left</span>
                  </div>
                  <div className="h-1.5 bg-hap-surface3 rounded-full overflow-hidden">
                    <div className="h-full bg-gold rounded-full" style={{ width:`${(w.enrolled/w.spots)*100}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-hap-border">
                  <span className="text-gold font-bold">₦{w.price.toLocaleString()}</span>
                  <button onClick={() => enrol(w)}
                    className="bg-gold hover:bg-gold-hover text-hap-bg text-xs font-bold px-4 py-2 rounded-xl transition-all hover:shadow-gold">
                    Enrol Now
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Why Academy */}
      <div className="bg-hap-surface border-t border-hap-border py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-white mb-2">Why H.ART Academy?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon:'👨‍🎨', title:'Industry Professionals', desc:'Learn directly from working creatives at the top of their field.' },
              { icon:'🏛️', title:'World-Class Facilities', desc:'All sessions held in our state-of-the-art studios and spaces.' },
              { icon:'🌍', title:'African Perspective', desc:'Curriculum rooted in African creative traditions and contemporary practice.' },
              { icon:'🤝', title:'Network Access', desc:'Connect with fellow creatives and join the H.ART professional community.' },
            ].map(f => (
              <div key={f.title} className="card text-center">
                <span className="text-3xl mb-3 block">{f.icon}</span>
                <h4 className="font-semibold text-white mb-1 text-sm">{f.title}</h4>
                <p className="text-xs text-white/35 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
