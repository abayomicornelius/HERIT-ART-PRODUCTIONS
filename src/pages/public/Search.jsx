import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'
import { PRODUCTIONS } from '../../data/productions'
import { STUDIOS } from '../../data/studios'
import { CREATIVES } from '../../data/creatives'
import { RENTALS } from '../../data/rentals'
import { COSTUMES } from '../../data/costumes'

const SECTIONS = [
  {
    key: 'productions',
    label: 'Productions & Events',
    icon: '🎭',
    search: (q) => PRODUCTIONS.filter(p =>
      p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.venue.toLowerCase().includes(q)
    ),
    render: (item) => ({
      title: item.title,
      sub: `${item.category} · ${item.venue}`,
      to: `/productions/${item.id}`,
      color: item.color,
      badge: item.status,
    }),
  },
  {
    key: 'creatives',
    label: 'Creative Professionals',
    icon: '✦',
    search: (q) => CREATIVES.filter(c =>
      c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) ||
      c.skills.some(s => s.toLowerCase().includes(q))
    ),
    render: (item) => ({
      title: item.name,
      sub: `${item.category} · ${item.location}`,
      to: `/network/${item.id}`,
      color: item.color,
      badge: item.available ? 'Available' : 'Unavailable',
    }),
  },
  {
    key: 'studios',
    label: 'Studio Spaces',
    icon: '🎙️',
    search: (q) => STUDIOS.filter(s =>
      s.name.toLowerCase().includes(q) || s.subtitle.toLowerCase().includes(q)
    ),
    render: (item) => ({
      title: item.name,
      sub: item.subtitle,
      to: '/studios/book',
      color: item.color,
      badge: `From ₦${item.packages[0].price.toLocaleString()}`,
    }),
  },
  {
    key: 'rentals',
    label: 'Equipment Rentals',
    icon: '📦',
    search: (q) => RENTALS.filter(r =>
      r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
    ),
    render: (item) => ({
      title: item.name,
      sub: `${item.category} · ₦${item.pricePerDay.toLocaleString()}/day`,
      to: '/rentals',
      color: '#c9a84c',
      badge: item.available ? 'Available' : 'Booked',
    }),
  },
  {
    key: 'costumes',
    label: 'Costumes',
    icon: '👗',
    search: (q) => COSTUMES.filter(c =>
      c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q))
    ),
    render: (item) => ({
      title: item.name,
      sub: `${item.category} · ₦${item.pricePerDay.toLocaleString()}/day`,
      to: '/costumes',
      color: item.color,
      badge: item.available ? 'Available' : 'Booked',
    }),
  },
]

export default function Search() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [results, setResults] = useState({})

  useEffect(() => {
    const q = query.toLowerCase().trim()
    if (q.length < 2) { setResults({}); return }
    const r = {}
    SECTIONS.forEach(s => { r[s.key] = s.search(q) })
    setResults(r)
    setParams({ q: query }, { replace: true })
  }, [query])

  const totalCount = Object.values(results).reduce((sum, arr) => sum + arr.length, 0)

  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">Global Search</p>
          <h1 className="font-display text-4xl font-bold text-white mb-6">Search HERIT</h1>
          <div className="relative max-w-xl mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 text-lg">🔍</span>
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search productions, creatives, studios, rentals, costumes…"
              className="input pl-11 py-4 text-base"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">✕</button>
            )}
          </div>
        </div>

        {query.length >= 2 && (
          <p className="text-xs text-white/25 mb-6">{totalCount} result{totalCount !== 1 ? 's' : ''} for "<span className="text-white/50">{query}</span>"</p>
        )}

        {query.length < 2 ? (
          <div className="text-center py-12 text-white/20">
            <p className="text-4xl mb-4">🔍</p>
            <p>Start typing to search across productions, creatives, studios, rentals and costumes.</p>
          </div>
        ) : totalCount === 0 ? (
          <div className="text-center py-12 text-white/25">
            <p className="text-4xl mb-4">😕</p>
            <p>No results found for "<span className="text-white/50">{query}</span>".</p>
            <p className="text-xs mt-2">Try different keywords or browse our sections above.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {SECTIONS.map(section => {
              const items = results[section.key] || []
              if (!items.length) return null
              return (
                <div key={section.key}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">{section.icon}</span>
                    <h3 className="font-display font-bold text-white">{section.label}</h3>
                    <span className="text-xs bg-hap-surface3 border border-hap-border text-white/30 px-2 py-0.5 rounded-full">{items.length}</span>
                  </div>
                  <div className="space-y-2">
                    {items.map((item, i) => {
                      const r = section.render(item)
                      return (
                        <Link key={i} to={r.to} className="flex items-center gap-4 p-4 bg-hap-surface border border-hap-border rounded-xl hover:border-gold/25 transition-all no-underline group">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-hap-bg text-sm" style={{ background: `linear-gradient(135deg, ${r.color}99, ${r.color})` }}>
                            {(item.avatar || item.icon || section.icon)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white group-hover:text-gold transition-colors truncate">{r.title}</p>
                            <p className="text-xs text-white/35 truncate">{r.sub}</p>
                          </div>
                          <span className="text-xs bg-hap-surface2 border border-hap-border text-white/30 px-2.5 py-1 rounded-full flex-shrink-0">{r.badge}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </PublicLayout>
  )
}
