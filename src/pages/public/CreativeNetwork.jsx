import { useState } from 'react'
import { Link } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'
import { CREATIVES, CATEGORIES } from '../../data/creatives'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function CreativeNetwork() {
  const [search, setSearch]   = useState('')
  const [cat, setCat]         = useState('All')
  const [onlyAvail, setAvail] = useState(false)

  const filtered = CREATIVES.filter(c =>
    (cat === 'All' || c.category === cat) &&
    (!onlyAvail || c.available) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) ||
     c.category.toLowerCase().includes(search.toLowerCase()) ||
     c.skills.some(s => s.toLowerCase().includes(search.toLowerCase())))
  )

  useScrollReveal()
  return (
    <PublicLayout>
      {/* Hero */}
      <div className="relative py-20 px-6 text-center border-b border-hap-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold/4 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-amber-900/8 rounded-full blur-3xl pointer-events-none animate-float-d1" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-3 animate-scale-in">H.ART Creative Network</p>
          <h1 className="font-display text-5xl font-bold mb-4">
            <span className="block animate-reveal delay-200" style={{ animationFillMode:'both' }}>Discover Exceptional</span>
            <span className="block animate-reveal delay-400 text-gold-animate" style={{ animationFillMode:'both' }}>African Talent</span>
          </h1>
          <p className="text-white/40 text-base leading-relaxed mb-8 animate-reveal delay-500" style={{ animationFillMode:'both' }}>Connect with vetted actors, directors, composers, dancers, writers and more from across the continent.</p>
          <Link to="/network/register" className="ripple-btn inline-block border border-gold text-gold hover:bg-gold hover:text-hap-bg font-bold px-8 py-3 rounded-2xl text-sm transition-all hover:shadow-gold hover:scale-105 no-underline animate-reveal delay-600" style={{ animationFillMode:'both' }}>
            Join as a Creative
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, role or skill…" className="input pl-9" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['All', ...CATEGORIES.slice(0,8)].map(c => (
              <button key={c} onClick={()=>setCat(c)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${cat===c ? 'bg-gold text-hap-bg' : 'bg-hap-surface border border-hap-border text-white/40 hover:text-white'}`}>{c}</button>
            ))}
          </div>
          <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap">
            <input type="checkbox" checked={onlyAvail} onChange={e=>setAvail(e.target.checked)} className="accent-gold" />
            <span className="text-xs text-white/40">Available only</span>
          </label>
        </div>

        {/* Grid */}
        <p className="text-xs text-white/25 mb-5">{filtered.length} creatives found</p>
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/25">No creatives match your search.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c, i) => (
              <Link key={c.id} to={`/network/${c.id}`} data-reveal className={`delay-${(i % 3 + 1) * 100} shimmer-card group card no-underline hover:border-gold/25 hover:-translate-y-2 hover:shadow-gold transition-all duration-300`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-hap-bg text-lg flex-shrink-0" style={{ background: `linear-gradient(135deg, ${c.color}99, ${c.color})` }}>
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <p className="font-semibold text-white group-hover:text-gold transition-colors truncate">{c.name}</p>
                      {c.verified && <span className="text-gold text-xs flex-shrink-0" title="HERIT Verified">✦</span>}
                    </div>
                    <p className="text-xs text-white/40">{c.category}</p>
                    <p className="text-xs text-white/25">{c.location} · {c.experience}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${c.available ? 'bg-green-400' : 'bg-white/15'}`} />
                </div>
                <p className="text-xs text-white/40 leading-relaxed mb-4 line-clamp-2">{c.bio}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {c.skills.slice(0,3).map(sk => <span key={sk} className="text-[0.65rem] px-2 py-0.5 rounded-full bg-hap-surface3 text-white/35 border border-hap-border">{sk}</span>)}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-hap-border">
                  <span className="text-xs text-white/30">{c.rate}</span>
                  <span className={`text-xs font-medium ${c.available ? 'text-green-400' : 'text-white/25'}`}>{c.available ? '● Available' : '○ Unavailable'}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  )
}
