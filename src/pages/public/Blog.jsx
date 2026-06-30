import { useState } from 'react'
import PublicLayout from '../../components/layout/PublicLayout'

const POSTS = [
  { id:1, slug:'', category:'Theatre', date:'2026-06-10', title:'Bringing 1960 to Life: The Making of Our Independence Musical', excerpt:'Inside the creative process behind our landmark production celebrating Nigerian independence — from research to rehearsal to opening night.', author:'Funke Adeyemi', readTime:'6 min', featured: true },
  { id:2, slug:'', category:'Film', date:'2026-05-28', title:'Echoes of the Motherland: Why African Stories Must Be Told in African Voices', excerpt:'Our director speaks on the importance of authentic storytelling and why international co-productions must keep cultural control local.', author:'Emeka Uche', readTime:'5 min', featured: false },
  { id:3, slug:'', category:'Studios', date:'2026-05-14', title:'The H.ART Audio Studio Is Now Open — Here\'s What\'s Inside', excerpt:'A full tour of our newly upgraded recording studio, featuring a vintage SSL console, Neve preamps, and a world-class acoustic treatment.', author:'Sade Okonkwo', readTime:'4 min', featured: false },
  { id:4, slug:'', category:'Network', date:'2026-04-30', title:'Spotlighting Africa\'s Creative Class: The H.ART Network Year One', excerpt:'One year in, over 120 verified creative professionals, and 40+ productions. We reflect on what community-building in the arts really means.', author:'Kofi Mensah', readTime:'7 min', featured: false },
  { id:5, slug:'', category:'Industry', date:'2026-04-16', title:'Nollywood, Afrobeats and the Global Moment: How Africa Is Writing the Next Chapter', excerpt:'The world is watching Africa. We explore what this means for African creatives, brands, and the storytelling industry at large.', author:'Ngozi Okafor', readTime:'8 min', featured: false },
  { id:6, slug:'', category:'Events', date:'2026-04-02', title:'Drums of Sankofa: What 2,000 Sold-Out Audience Members Taught Us', excerpt:'Lessons from producing one of Lagos\'s most successful concert events — logistics, storytelling, and the power of shared cultural memory.', author:'Taiwo Adeyemi', readTime:'5 min', featured: false },
]

const CATEGORIES = ['All', 'Theatre', 'Film', 'Studios', 'Network', 'Industry', 'Events']

export default function Blog() {
  const [cat, setCat] = useState('All')
  const filtered = cat === 'All' ? POSTS : POSTS.filter(p => p.category === cat)
  const featured = filtered.find(p => p.featured) || filtered[0]
  const rest = filtered.filter(p => p.id !== featured?.id)

  const fmtDate = s => new Date(s).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <PublicLayout>
      {/* Hero */}
      <div className="py-20 px-6 text-center border-b border-hap-border">
        <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-3">Blog & News</p>
        <h1 className="font-display text-5xl font-bold text-white mb-4">Stories Worth Telling</h1>
        <p className="text-white/40">Insights, interviews and stories from the HERIT creative community.</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${cat===c ? 'bg-gold text-hap-bg' : 'bg-hap-surface border border-hap-border text-white/40 hover:text-white'}`}>{c}</button>
          ))}
        </div>

        {/* Featured post */}
        {featured && (
          <div className="grid md:grid-cols-2 gap-8 mb-12 p-6 bg-hap-surface border border-hap-border rounded-3xl hover:border-gold/20 transition-all group cursor-pointer">
            <div className="rounded-2xl aspect-video bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center border border-hap-border">
              <span className="font-display text-7xl font-black text-gold/15">H</span>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-gold/10 text-gold border border-gold/20 font-bold px-2.5 py-1 rounded-full">{featured.category}</span>
                <span className="text-xs text-white/25">Featured</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-gold transition-colors leading-tight">{featured.title}</h2>
              <p className="text-sm text-white/40 leading-relaxed mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-white/25">
                <span>{featured.author}</span>
                <span>·</span>
                <span>{fmtDate(featured.date)}</span>
                <span>·</span>
                <span>{featured.readTime} read</span>
              </div>
            </div>
          </div>
        )}

        {/* Post grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map(post => (
            <article key={post.id} className="card cursor-pointer hover:border-gold/20 transition-all group">
              <div className="h-36 rounded-xl bg-gradient-to-br from-hap-surface3 to-hap-surface2 flex items-center justify-center mb-4 border border-hap-border">
                <span className="font-display text-5xl font-black text-white/5">H</span>
              </div>
              <span className="text-[0.6rem] font-bold uppercase tracking-widest text-gold/70">{post.category}</span>
              <h3 className="font-display font-bold text-white mt-1 mb-2 text-base leading-snug group-hover:text-gold transition-colors">{post.title}</h3>
              <p className="text-xs text-white/35 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-2 text-[0.65rem] text-white/20 pt-3 border-t border-hap-border">
                <span>{post.author}</span>
                <span>·</span>
                <span>{fmtDate(post.date)}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PublicLayout>
  )
}
