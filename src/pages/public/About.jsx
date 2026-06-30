import { Link } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const HAP_LOGO = 'https://ugc.production.linktr.ee/9c73a313-ebff-44d8-af46-330a1db7d77e_B5D1DC04-F0C4-4B7E-B7A0-DC0C7C178B5F.png'

const TEAM = [
  { name:'Adaeze Obi', role:'Founder & Creative Director', bio:'20 years shaping African theatre, film and brand storytelling. Former Director at the National Theatre, Lagos.' },
  { name:'Emeka Uche', role:'Head of Film Production', bio:'Award-winning cinematographer with credits across Nollywood, international co-productions and advertising.' },
  { name:'Sade Okonkwo', role:'Music Director & Composer', bio:'AFRIMMA award-winning composer. Scored over 30 productions including theatre, film and brand campaigns.' },
  { name:'Kofi Mensah', role:'Head of Creative Network', bio:'Former casting director turned talent development advocate, connecting African creatives with global opportunities.' },
]

const MILESTONES = [
  { year:'2019', event:'HERIT ART PRODUCTION founded in Lagos' },
  { year:'2021', event:'Launched H.ART Studios — first integrated creative studio complex' },
  { year:'2022', event:'Premiered first flagship productions; H.ART Creative Network launched' },
  { year:'2024', event:'"The Lion King (LASU WAY)" — a sold-out Nigerian adaptation' },
  { year:'2025', event:'"Ajagun-Nla", "THE NIGHT BEFORE" & "ZYNARA" all premiered; 100+ brand clients served' },
  { year:'2026', event:'"LEGENDS: THE MUSICAL" & "THE GREATEST SHOWMAN" — biggest productions yet' },
]

const VALUES = [
  { icon:'🌍', title:'African Authenticity', desc:'Every story we tell is rooted in the richness of African culture, history and experience — told in our own voice.' },
  { icon:'✦', title:'Creative Excellence', desc:'We hold ourselves to global production standards while maintaining a distinctly African aesthetic and spirit.' },
  { icon:'🤝', title:'Community First', desc:'We invest in African creative talent, creating pathways for artists, technicians and storytellers to thrive.' },
  { icon:'🎯', title:'Purpose-Driven', desc:'Content and art should move people. We create with intention — to entertain, inspire and transform.' },
]

export default function About() {
  useScrollReveal()
  return (
    <PublicLayout>
      {/* Hero */}
      <div className="relative py-24 px-6 text-center overflow-hidden border-b border-hap-border">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gold/4 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-900/6 rounded-full blur-3xl pointer-events-none animate-float-d2" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6 animate-bounce-in">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gold/25 blur-2xl scale-150 animate-glow-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-2.5 h-2.5 rounded-full bg-gold animate-orbit" style={{ boxShadow:'0 0 6px #c9a84c' }} />
              </div>
              <img src={HAP_LOGO} alt="HERIT ART PRODUCTIONS" className="relative w-24 h-24 rounded-full object-cover border-2 border-gold/40 shadow-gold" />
            </div>
          </div>
          <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-3 animate-scale-in delay-200">About HERIT ART PRODUCTION</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block animate-reveal delay-300" style={{ animationFillMode:'both' }}>We Are Africa's</span>
            <span className="block animate-reveal delay-500 text-gold-animate" style={{ animationFillMode:'both' }}>Creative Home</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed animate-reveal delay-600" style={{ animationFillMode:'both' }}>Creative powerhouse merging Theatre, Film, Music & Social Impact — a production company, creative agency, studio complex and talent network united by one mission: African stories told with world-class excellence.</p>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div data-reveal="right">
            <p className="text-gold text-xs font-bold tracking-widest uppercase mb-3">Our Mission</p>
            <h2 className="font-display text-4xl font-bold text-white mb-5">To Produce Stories That Define a Generation</h2>
            <p className="text-white/50 leading-relaxed mb-4">HERIT ART PRODUCTION exists at the intersection of art, culture and commerce. We produce theatre, film and concerts that celebrate African heritage, while providing brands with the creative power to connect authentically with African audiences.</p>
            <p className="text-white/40 leading-relaxed">From the intimacy of a rehearsal room to the grandeur of a sold-out concert, from a 30-second brand film to a 90-minute theatrical production — every project we take on is guided by the same principle: quality is not optional.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[['120+','Creatives in network'],['50+','Brand clients'],['10+','Productions premiered'],['5,000+','Tickets sold annually']].map(([n,l], i) => (
              <div key={l} data-reveal className={`delay-${(i+1)*100} shimmer-card card text-center p-6 hover:-translate-y-2 hover:shadow-gold transition-all duration-300`}>
                <p className="font-display text-4xl font-bold text-gold-animate mb-1">{n}</p>
                <p className="text-xs text-white/35 leading-tight">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-hap-surface border-t border-hap-border py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12" data-reveal>
            <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">What We Stand For</p>
            <h2 className="font-display text-3xl font-bold text-white">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <div key={v.title} data-reveal className={`delay-${(i+1)*100} shimmer-card card hover:-translate-y-1 hover:shadow-gold hover:border-gold/20 transition-all duration-300`}>
                <span className="text-3xl mb-3 block transition-transform duration-300 hover:scale-125 hover:rotate-6">{v.icon}</span>
                <h3 className="font-display text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12" data-reveal>
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">Our Journey</p>
          <h2 className="font-display text-3xl font-bold text-white">Key Milestones</h2>
        </div>
        <div className="relative">
          <div className="absolute left-24 top-0 bottom-0 w-px bg-hap-border" />
          <div className="space-y-6">
            {MILESTONES.map((m, i) => (
              <div key={m.year} data-reveal className={`delay-${(i % 4 + 1) * 100} flex items-start gap-6`}>
                <span className="w-20 text-right text-gold-animate font-bold text-sm flex-shrink-0">{m.year}</span>
                <div className="relative flex-shrink-0 mt-1">
                  <div className="w-3 h-3 rounded-full bg-gold border-2 border-hap-bg relative z-10 hover:scale-150 transition-transform duration-200" style={{ boxShadow:'0 0 8px rgba(201,168,76,0.5)' }} />
                </div>
                <p className="text-sm text-white/60 pt-0.5">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-hap-surface border-t border-hap-border py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12" data-reveal>
            <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">Leadership</p>
            <h2 className="font-display text-3xl font-bold text-white">The Team Behind the Work</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((m, i) => (
              <div key={m.name} data-reveal className={`delay-${(i+1)*100} shimmer-card card text-center hover:-translate-y-2 hover:shadow-gold hover:border-gold/20 transition-all duration-300`}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-hap-bg text-xl mx-auto mb-4 font-display transition-transform duration-300 hover:scale-110 hover:rotate-3"
                  style={{ background: 'linear-gradient(135deg, #c9a84c99, #c9a84c)' }}>
                  {m.name[0]}
                </div>
                <h4 className="font-semibold text-white mb-0.5">{m.name}</h4>
                <p className="text-xs text-gold mb-3">{m.role}</p>
                <p className="text-xs text-white/35 leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-6 text-center" data-reveal>
        <h2 className="font-display text-3xl font-bold text-white mb-4">Ready to Work with Us?</h2>
        <p className="text-white/40 mb-8">Whether you're a brand, a creative professional, or someone who loves great art.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/services" className="ripple-btn inline-block bg-gold hover:bg-gold-hover text-hap-bg font-bold px-10 py-4 rounded-2xl text-base transition-all hover:shadow-gold hover:scale-105 no-underline">Explore Services</Link>
          <Link to="/contact" className="ripple-btn inline-block border border-hap-border text-white/60 hover:text-white hover:border-gold/40 px-10 py-4 rounded-2xl text-base transition-all hover:scale-105 no-underline">Get in Touch</Link>
        </div>
      </div>
    </PublicLayout>
  )
}
