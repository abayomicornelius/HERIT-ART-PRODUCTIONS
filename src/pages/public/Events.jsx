import { Link } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'
import { PRODUCTIONS } from '../../data/productions'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const fmt = s => new Date(s).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

export default function EventsList() {
  useScrollReveal()
  const upcoming = PRODUCTIONS.filter(p => p.status === 'Upcoming')
  const past     = PRODUCTIONS.filter(p => p.status === 'Past')

  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-3 animate-scale-in">Events & Tickets</p>
          <h1 className="font-display text-5xl font-bold mb-4">
            <span className="block animate-reveal delay-200" style={{ animationFillMode:'both' }}>Upcoming</span>
            <span className="block animate-reveal delay-400 text-gold-animate" style={{ animationFillMode:'both' }}>Events</span>
          </h1>
          <p className="text-white/40 max-w-lg mx-auto animate-reveal delay-500" style={{ animationFillMode:'both' }}>Secure your tickets to HERIT's upcoming productions, concerts and experiences.</p>
        </div>

        {/* Featured upcoming */}
        {upcoming.length > 0 && (
          <div className="space-y-5 mb-16">
            {upcoming.map((p, i) => (
              <div key={p.id} data-reveal className={`delay-${(i+1)*150} shimmer-card flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden border border-hap-border hover:border-gold/30 hover:shadow-gold transition-all duration-300 group`}>
                {/* Poster */}
                <div className="md:w-56 h-48 md:h-auto flex-shrink-0 flex items-center justify-center relative" style={{ background: `linear-gradient(145deg, ${p.color}55, ${p.color}99)` }}>
                  <p className="font-display text-7xl font-black text-white/30">H</p>
                  <span className="absolute top-3 left-3 text-[0.65rem] bg-gold text-hap-bg font-bold px-2.5 py-1 rounded-full">Upcoming</span>
                </div>
                {/* Info */}
                <div className="flex-1 bg-hap-surface p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-1">{p.category}</p>
                    <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{p.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-xl">{p.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-white/40">
                      <span>📅 {fmt(p.date)}</span>
                      <span>📍 {p.venue}</span>
                      {p.ticketPrices.length > 0 && <span>🎟 From ₦{p.ticketPrices[0].price.toLocaleString()}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-5">
                    <Link to={`/events/${p.id}`}
                      className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-6 py-2.5 rounded-xl text-sm transition-all hover:shadow-gold no-underline">
                      Get Tickets
                    </Link>
                    <Link to={`/productions/${p.id}`} className="text-sm text-white/40 hover:text-white transition-colors no-underline">
                      Learn more →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Past events */}
        {past.length > 0 && (
          <>
            <h2 className="font-display text-2xl font-bold text-white/50 mb-6" data-reveal>Past Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {past.map((p, i) => (
                <Link key={p.id} to={`/productions/${p.id}`} data-reveal className={`delay-${(i % 3 + 1) * 100} shimmer-card card group no-underline hover:border-gold/20 hover:-translate-y-1 hover:shadow-gold transition-all duration-300`}>
                  <p className="text-xs text-white/25 uppercase tracking-wider mb-1">{p.category}</p>
                  <h4 className="font-display font-bold text-white text-lg mb-1 group-hover:text-gold/70 transition-colors">{p.title}</h4>
                  <p className="text-xs text-white/30 mb-3">{p.venue} · {fmt(p.date)}</p>
                  <div className="flex flex-wrap gap-1">
                    {p.tags.map(t => <span key={t} className="text-[0.6rem] px-2 py-0.5 rounded-full bg-hap-surface3 text-white/30 border border-hap-border">{t}</span>)}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {upcoming.length === 0 && past.length === 0 && (
          <div className="text-center py-20 text-white/25">No events yet. Check back soon!</div>
        )}
      </div>
    </PublicLayout>
  )
}
