import { Link } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'
import { STUDIOS } from '../../data/studios'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function StudiosPage() {
  useScrollReveal()
  return (
    <PublicLayout>
      {/* Hero */}
      <div className="relative py-24 px-6 text-center overflow-hidden border-b border-hap-border">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-900/8 rounded-full blur-3xl pointer-events-none animate-float-d2" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-3 animate-scale-in">H.ART Studios</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
            <span className="block animate-reveal delay-200" style={{ animationFillMode:'both' }}>Create Without</span>
            <span className="block animate-reveal delay-400 text-gold-animate" style={{ animationFillMode:'both' }}>Limits</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed mb-8 animate-reveal delay-500" style={{ animationFillMode:'both' }}>World-class production spaces built for artists, musicians, filmmakers and storytellers across Africa.</p>
          <Link to="/studios/book" className="ripple-btn inline-block bg-gold hover:bg-gold-hover text-hap-bg font-bold px-10 py-4 rounded-2xl text-base transition-all hover:shadow-gold hover:scale-105 no-underline animate-reveal delay-600" style={{ animationFillMode:'both' }}>
            Book a Space Now
          </Link>
        </div>
      </div>

      {/* Studio spaces */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="space-y-20">
          {STUDIOS.map((s, i) => (
            <div key={s.id} data-reveal className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
              {/* Visual */}
              <div className={`shimmer-card rounded-3xl aspect-video flex items-center justify-center relative overflow-hidden border border-hap-border hover:border-gold/30 transition-all duration-300 group ${i % 2 === 1 ? 'md:col-start-2' : ''}`}
                style={{ background: `linear-gradient(145deg, ${s.color}22, ${s.color}55)` }}>
                <span className="text-[8rem] opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">{s.icon}</span>
                <div className="absolute bottom-6 left-6">
                  <p className="font-display text-2xl font-bold text-white">{s.name}</p>
                  <p className="text-white/40 text-sm">{s.subtitle}</p>
                </div>
              </div>
              {/* Info */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: s.color }}>{s.subtitle}</p>
                <h2 className="font-display text-3xl font-bold text-white mb-3">{s.name}</h2>
                <p className="text-white/50 leading-relaxed mb-6">{s.longDesc}</p>

                {/* Equipment */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">Available Equipment</p>
                  <div className="flex flex-wrap gap-2">
                    {s.equipment.map(e => (
                      <span key={e} className="text-xs px-3 py-1.5 rounded-full bg-hap-surface2 border border-hap-border text-white/50 hover:border-gold/40 hover:text-gold transition-all duration-200 cursor-default">{e}</span>
                    ))}
                  </div>
                </div>

                {/* Packages */}
                <div className="space-y-2 mb-6">
                  {s.packages.map(pkg => (
                    <div key={pkg.name} className="shimmer-card flex items-center justify-between p-3 bg-hap-surface border border-hap-border rounded-xl hover:border-gold/30 hover:-translate-y-0.5 hover:shadow-gold transition-all duration-200">
                      <div>
                        <p className="text-sm font-medium text-white">{pkg.name}</p>
                        <p className="text-xs text-white/30">{pkg.includes.slice(0,2).join(' · ')}</p>
                      </div>
                      <span className="text-gold font-bold text-sm">₦{pkg.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <Link to="/studios/book" className="ripple-btn inline-block bg-gold hover:bg-gold-hover text-hap-bg font-bold px-8 py-3 rounded-xl text-sm transition-all hover:shadow-gold hover:scale-105 no-underline">
                  Book {s.name} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  )
}
