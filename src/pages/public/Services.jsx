import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import PublicLayout from '../../components/layout/PublicLayout'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const SERVICES = [
  { icon: '📽️', title: 'Film & Video Production', desc: 'Full-scale film and video production from concept to delivery. Commercials, brand films, documentaries and narrative content.', list: ['Commercial Production', 'Brand Films', 'Documentaries', 'Music Videos', 'Corporate Videos'] },
  { icon: '📸', title: 'Photography & Content', desc: 'Premium photography for campaigns, editorial, product and events. Our team captures moments that sell stories.', list: ['Campaign Photography', 'Product Photography', 'Event Coverage', 'Editorial Shoots', 'Social Media Content'] },
  { icon: '🎵', title: 'Audio & Sound', desc: 'Cinematic audio, jingles, brand sound identities and full album production. Recorded in our world-class audio studio.', list: ['Brand Jingles', 'Voiceovers', 'Sound Design', 'Background Scores', 'Podcast Production'] },
  { icon: '🎨', title: 'Creative Direction', desc: 'Strategic creative direction that aligns visual storytelling with brand purpose and audience emotion.', list: ['Brand Identity', 'Campaign Concepts', 'Visual Direction', 'Storyboarding', 'Mood & Style Guides'] },
  { icon: '🌍', title: 'Digital & Social', desc: 'Content strategy and production tailored for digital platforms — social media, streaming, web and OTT channels.', list: ['Social Media Strategy', 'Content Calendar', 'Short-form Videos', 'Reels & Shorts', 'Platform Optimisation'] },
  { icon: '🎭', title: 'Events & Activation', desc: 'Live event production, brand activations, and experiential marketing that creates lasting impressions.', list: ['Product Launches', 'Brand Activations', 'Event Production', 'Live Coverage', 'PR Events'] },
]

export default function Services() {
  useScrollReveal()
  return (
    <PublicLayout>
      {/* Hero */}
      <div className="relative py-24 px-6 text-center border-b border-hap-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gold/4 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-900/6 rounded-full blur-3xl pointer-events-none animate-float-d2" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-3 animate-scale-in">Creative Services</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
            <span className="block animate-reveal delay-200" style={{ animationFillMode:'both' }}>Stories That</span>
            <span className="block animate-reveal delay-400 text-gold-animate" style={{ animationFillMode:'both' }}>Move People</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed mb-8 animate-reveal delay-500" style={{ animationFillMode:'both' }}>We partner with brands to produce world-class advertising and content that resonates with African audiences and beyond.</p>
          <div className="flex gap-4 justify-center flex-wrap animate-reveal delay-600" style={{ animationFillMode:'both' }}>
            <Link to="/signup" className="ripple-btn inline-block bg-gold hover:bg-gold-hover text-hap-bg font-bold px-10 py-4 rounded-2xl text-base transition-all hover:shadow-gold hover:scale-105 no-underline">Start a Project</Link>
            <Link to="/contact" className="ripple-btn inline-block border border-hap-border text-white/60 hover:text-white hover:border-gold/40 px-10 py-4 rounded-2xl text-base transition-all hover:scale-105 no-underline">Talk to Us</Link>
          </div>
        </div>
      </div>

      {/* Services grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14" data-reveal>
          <h2 className="font-display text-3xl font-bold text-white mb-3">What We Offer</h2>
          <p className="text-white/40 max-w-xl mx-auto">End-to-end creative services for brands that refuse to be ordinary.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div key={s.title} data-reveal className={`delay-${(i % 3 + 1) * 100} shimmer-card glow-border card hover:border-gold/20 hover:-translate-y-2 hover:shadow-gold transition-all duration-300 group`}>
              <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">{s.icon}</div>
              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-4">{s.desc}</p>
              <ul className="space-y-1.5">
                {s.list.map(l => <li key={l} className="text-xs text-white/30 flex items-center gap-2"><span className="text-gold/50">▸</span>{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Process section */}
      <div className="border-t border-hap-border bg-hap-surface py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12" data-reveal>
            <h2 className="font-display text-3xl font-bold text-white mb-3">How It Works</h2>
            <p className="text-white/40">From brief to delivery in 4 clear steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n:'01', title:'Subscribe', desc:"Choose the plan that fits your brand's content needs and budget." },
              { n:'02', title:'Brief', desc:'Submit your project brief, assets, and creative direction.' },
              { n:'03', title:'Produce', desc:'Our team creates your content in our world-class studios.' },
              { n:'04', title:'Deliver', desc:'Review, approve and receive broadcast-ready content.' },
            ].map((step, i) => (
              <div key={step.n} data-reveal className={`delay-${(i+1)*100} text-center`}>
                <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/25 flex items-center justify-center text-gold font-bold font-display text-lg mx-auto mb-4 hover:bg-gold hover:text-hap-bg hover:scale-110 hover:rotate-3 transition-all duration-300">{step.n}</div>
                <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                <p className="text-xs text-white/35 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-6 text-center" data-reveal>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Ready to Tell Your Story?</h2>
          <p className="text-white/40 mb-8">Join 50+ brands already working with HERIT ART PRODUCTION.</p>
          <Link to="/signup" className="ripple-btn inline-block bg-gold hover:bg-gold-hover text-hap-bg font-bold px-12 py-4 rounded-2xl text-base transition-all hover:shadow-gold hover:scale-105 no-underline">
            Get Started Today
          </Link>
        </div>
      </div>
    </PublicLayout>
  )
}
