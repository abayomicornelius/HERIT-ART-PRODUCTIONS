import { useState } from 'react'
import { Link } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'
import { PRODUCTIONS } from '../../data/productions'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const HAP_LOGO = 'https://ugc.production.linktr.ee/9c73a313-ebff-44d8-af46-330a1db7d77e_B5D1DC04-F0C4-4B7E-B7A0-DC0C7C178B5F.png'

const fmt = s => new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

export default function ProductionsList() {
  useScrollReveal()
  const [filter, setFilter] = useState('All')
  const [status, setStatus] = useState('All')
  const cats = ['All', 'Theatre', 'Film', 'Concert', 'Dance']
  const statuses = ['All', 'Upcoming', 'Past']
  const filtered = PRODUCTIONS.filter(p =>
    (filter === 'All' || p.category === filter) &&
    (status === 'All' || p.status === status)
  )

  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-3 animate-scale-in">On Stage & Screen</p>
          <h1 className="font-display text-5xl font-bold mb-4">
            <span className="block animate-reveal delay-200" style={{ animationFillMode:'both' }}>Productions</span>
          </h1>
          <p className="text-white/40 max-w-lg mx-auto animate-reveal delay-400" style={{ animationFillMode:'both' }}>Original theatre, film, concerts and creative productions by HERIT ART PRODUCTIONS.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 justify-center">
          <div className="flex items-center gap-1 bg-hap-surface border border-hap-border rounded-xl p-1">
            {cats.map(c => <button key={c} onClick={() => setFilter(c)} className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === c ? 'bg-gold text-hap-bg' : 'text-white/40 hover:text-white'}`}>{c}</button>)}
          </div>
          <div className="flex items-center gap-1 bg-hap-surface border border-hap-border rounded-xl p-1">
            {statuses.map(s => <button key={s} onClick={() => setStatus(s)} className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${status === s ? 'bg-gold text-hap-bg' : 'text-white/40 hover:text-white'}`}>{s}</button>)}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/25">No productions match this filter.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <Link key={p.id} to={`/productions/${p.id}`} data-reveal className={`delay-${(i % 3 + 1) * 100} shimmer-card group block no-underline`}>
                <div className="rounded-2xl overflow-hidden border border-hap-border hover:border-gold/30 hover:-translate-y-2 hover:shadow-gold transition-all duration-300 bg-hap-surface">
                  <div className="aspect-[4/5] flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(145deg, ${p.color}44, ${p.color}88)` }}>
                    {p.image
                      ? <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover object-top" />
                      : <div className="text-center px-6">
                          <img src={HAP_LOGO} alt="HAP" className="w-14 h-14 rounded-full object-cover mx-auto mb-2 opacity-50" />
                          <p className="text-xs text-white/40 uppercase tracking-widest">{p.category}</p>
                        </div>
                    }
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`text-[0.65rem] font-bold px-2.5 py-1 rounded-full ${p.status === 'Upcoming' ? 'bg-gold text-hap-bg' : 'bg-black/40 text-white/60'}`}>{p.status}</span>
                    </div>
                    {p.tags.slice(0,1).map(t => (
                      <span key={t} className="absolute bottom-3 right-3 text-[0.6rem] bg-black/40 text-white/50 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-white/30 mb-1">{p.category} · {p.city}</p>
                    <h3 className="font-display font-bold text-white text-xl mb-1 group-hover:text-gold transition-colors leading-tight">{p.title}</h3>
                    <p className="text-xs text-white/40 mb-1">{p.venue}</p>
                    <p className="text-xs text-gold mb-4">{fmt(p.date)}</p>
                    <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">{p.description}</p>
                    {p.status === 'Upcoming' ? (
                      <div className="bg-gold hover:bg-gold-hover text-hap-bg font-bold py-2.5 rounded-xl text-xs text-center transition-all">Buy Tickets →</div>
                    ) : (
                      <div className="text-white/25 text-xs text-center py-2.5 border border-hap-border rounded-xl">View Production</div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  )
}
