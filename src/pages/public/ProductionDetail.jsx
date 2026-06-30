import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'
import StarRating from '../../components/ui/StarRating'
import { PRODUCTIONS } from '../../data/productions'
import { getReviews } from '../../data/reviews'

const fmt = s => new Date(s).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })

export default function ProductionDetail() {
  const { id } = useParams()
  const p = PRODUCTIONS.find(x => x.id === id) || PRODUCTIONS[0]
  const reviews = getReviews('production', p.id)
  const avgRating = reviews.length ? (reviews.reduce((s,r)=>s+r.rating,0)/reviews.length).toFixed(1) : null
  const [tab, setTab] = useState('overview')
  const [selectedDate, setSelectedDate] = useState(p.schedule[0]?.date || '')
  const [qty, setQty] = useState({})

  const fmtMoney = n => `₦${n.toLocaleString()}`

  return (
    <PublicLayout>
      {/* Hero banner */}
      <div className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden" style={{ background: `linear-gradient(145deg, ${p.color}55, ${p.color}99)` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-hap-bg via-hap-bg/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <p className="font-display text-[20rem] font-black text-white leading-none select-none">H</p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 w-full">
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${p.status === 'Upcoming' ? 'bg-gold text-hap-bg' : 'bg-white/20 text-white'}`}>{p.status}</span>
            <span className="text-xs text-white/50 uppercase tracking-wider">{p.category}</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-2">{p.title}</h1>
          <p className="text-white/60 text-base">{p.venue} · {fmt(p.date)}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex border-b border-hap-border mb-8">
              {['overview', 'cast & crew', 'schedule', 'gallery'].map(t => (
                <button key={t} onClick={() => setTab(t)} className={`tab-item capitalize ${tab === t ? 'active' : ''}`}>{t}</button>
              ))}
            </div>

            {tab === 'overview' && (
              <div className="animate-slide-up space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">About This Production</h3>
                  <p className="text-white/60 leading-relaxed">{p.description}</p>
                  {p.story && <p className="text-white/50 leading-relaxed mt-4">{p.story}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    ['Director', p.director],
                    ['Producer', p.producer],
                    ['Category', p.category],
                    ['Venue', p.venue],
                  ].map(([label, val]) => (
                    <div key={label} className="bg-hap-surface border border-hap-border rounded-xl p-4">
                      <p className="text-xs text-white/30 uppercase tracking-wider mb-1">{label}</p>
                      <p className="text-white font-medium">{val}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(t => (
                    <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-gold/10 text-gold border border-gold/25">{t}</span>
                  ))}
                </div>
              </div>
            )}

            {tab === 'cast & crew' && (
              <div className="animate-slide-up">
                {p.cast.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {p.cast.map(c => (
                      <div key={c.name} className="flex items-center gap-4 bg-hap-surface border border-hap-border rounded-xl p-4">
                        <div className="w-12 h-12 bg-gold-grad rounded-full flex items-center justify-center text-sm font-bold text-hap-bg flex-shrink-0">
                          {c.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{c.name}</p>
                          <p className="text-sm text-white/40">{c.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-white/25">Cast list coming soon.</div>
                )}
              </div>
            )}

            {tab === 'schedule' && (
              <div className="animate-slide-up">
                {p.schedule.length > 0 ? (
                  <div className="space-y-3">
                    {p.schedule.map((s, i) => (
                      <div key={i} className="flex items-center gap-4 bg-hap-surface border border-hap-border rounded-xl p-4 hover:border-gold/30 transition-all">
                        <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <p className="text-xs font-bold text-gold text-center leading-tight">{new Date(s.date).toLocaleDateString('en',{month:'short'})}<br/>{new Date(s.date).getDate()}</p>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-white">{fmt(s.date)}</p>
                          <p className="text-sm text-white/40">{p.venue} · {s.time}</p>
                        </div>
                        {p.status === 'Upcoming' && (
                          <Link to={`/events/${p.id}`} className="text-xs bg-gold text-hap-bg font-bold px-4 py-2 rounded-xl hover:bg-gold-hover transition-all no-underline">
                            Tickets
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-white/25">Schedule will be announced soon.</div>
                )}
              </div>
            )}

            {tab === 'gallery' && (
              <div className="animate-slide-up">
                <div className="grid grid-cols-3 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-square rounded-xl flex items-center justify-center" style={{ background: `${p.color}33` }}>
                      <span className="font-display text-4xl font-black text-white/20">H</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/25 text-center mt-4">Production photos will be added soon.</p>
              </div>
            )}
          </div>

          {/* Ticket sidebar */}
          <div className="space-y-5">
            {p.status === 'Upcoming' && p.ticketPrices.length > 0 && (
              <div className="card sticky top-20">
                <h4 className="font-semibold text-white mb-4">Get Tickets</h4>
                {p.schedule.length > 1 && (
                  <div className="mb-4">
                    <label className="block text-xs text-white/40 mb-1.5">Select Date</label>
                    <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="input text-sm">
                      {p.schedule.map(s => <option key={s.date} value={s.date}>{fmt(s.date)} — {s.time}</option>)}
                    </select>
                  </div>
                )}
                <div className="space-y-3 mb-5">
                  {p.ticketPrices.map(t => (
                    <div key={t.category} className="flex items-center justify-between p-3 bg-hap-surface2 rounded-xl border border-hap-border">
                      <div>
                        <p className="text-sm font-medium text-white">{t.category}</p>
                        <p className="text-xs text-white/30">{t.available} remaining</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gold font-bold text-sm">{`₦${t.price.toLocaleString()}`}</span>
                        <div className="flex items-center gap-1">
                          <button onClick={() => setQty(q => ({ ...q, [t.category]: Math.max(0, (q[t.category]||0) - 1) }))} className="w-7 h-7 rounded-lg bg-hap-surface3 text-white/60 hover:text-white text-sm font-bold transition-all">−</button>
                          <span className="w-6 text-center text-sm text-white">{qty[t.category] || 0}</span>
                          <button onClick={() => setQty(q => ({ ...q, [t.category]: Math.min(t.available, (q[t.category]||0) + 1) }))} className="w-7 h-7 rounded-lg bg-hap-surface3 text-white/60 hover:text-white text-sm font-bold transition-all">+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {Object.values(qty).some(v => v > 0) && (
                  <div className="text-sm text-white/50 mb-3 px-1">
                    Total: <span className="text-gold font-bold text-base">{`₦${Object.entries(qty).reduce((sum, [cat, n]) => sum + n * (p.ticketPrices.find(t=>t.category===cat)?.price||0), 0).toLocaleString()}`}</span>
                  </div>
                )}
                <Link to={`/events/${p.id}`}
                  className="block text-center bg-gold hover:bg-gold-hover text-hap-bg font-bold py-3.5 rounded-xl text-sm transition-all hover:shadow-gold no-underline">
                  Continue to Checkout →
                </Link>
                <p className="text-xs text-white/25 text-center mt-2">Secure payment via Paystack</p>
              </div>
            )}

            {p.status === 'Past' && (
              <div className="card text-center">
                <p className="text-3xl mb-3">🎭</p>
                <p className="font-semibold text-white mb-2">Past Production</p>
                <p className="text-sm text-white/40">This production has concluded. Check our upcoming shows.</p>
                <Link to="/productions" className="mt-4 block text-gold text-sm hover:underline no-underline">View Upcoming →</Link>
              </div>
            )}

            {/* Audience reviews */}
            {reviews.length > 0 && (
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white text-sm">Audience Reviews</h4>
                  {avgRating && <StarRating rating={avgRating} />}
                </div>
                <div className="space-y-3">
                  {reviews.map(r => (
                    <div key={r.id} className="pb-3 border-b border-hap-border last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-semibold text-white/70">{r.userName}</p>
                        <StarRating rating={r.rating} showNum={false} />
                      </div>
                      <p className="text-xs text-white/40 italic leading-relaxed">"{r.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
