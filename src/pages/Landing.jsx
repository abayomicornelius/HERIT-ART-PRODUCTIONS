import { Link } from 'react-router-dom'
import { SUBSCRIPTION_PLANS } from '../data/mockData'

export default function Landing() {
  return (
    <div className="min-h-screen bg-hap-bg text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-hap-border/50 bg-hap-bg/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gold-grad rounded-lg flex items-center justify-center font-display font-black text-hap-bg text-base">H</div>
            <div>
              <span className="block font-display font-bold text-gold text-base leading-tight">HERIT ART</span>
              <span className="block text-[0.55rem] text-white/25 tracking-[0.14em] uppercase">Production</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how" className="hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <Link to="/production/signin" className="hover:text-white transition-colors text-white/30 text-xs">Production Team ↗</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/signin" className="text-sm text-white/50 hover:text-white transition-colors">Sign in</Link>
            <Link to="/signup" className="bg-gold hover:bg-gold-hover text-hap-bg text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:shadow-gold hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-28 px-6 relative overflow-hidden">
        <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-gold/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-gold/3 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 text-gold text-xs font-semibold tracking-wider uppercase mb-8">
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
            Premium Content Production Platform
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
            Your Brand Deserves<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark via-gold to-gold-light">
              World-Class Content
            </span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            A subscription platform where brands submit structured creative briefs and receive
            professional advertising content from our elite production team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup"
              className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-8 py-4 rounded-2xl text-base transition-all hover:shadow-gold hover:-translate-y-0.5 w-full sm:w-auto text-center">
              Start Creating — It's Free
            </Link>
            <a href="#how"
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
              <span className="w-8 h-8 rounded-full border border-hap-borderl flex items-center justify-center text-xs">▶</span>
              See how it works
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-20 pt-10 border-t border-hap-border grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[['120+', 'Brands Served'],['98%', 'Satisfaction Rate'],['500+', 'Projects Delivered']].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-3xl font-bold text-gold">{n}</p>
                <p className="text-xs text-white/30 mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-3">Platform Features</p>
            <h2 className="font-display text-4xl font-bold mb-4">Everything Your Brand Needs</h2>
            <p className="text-white/40 text-base max-w-xl mx-auto">From brief submission to content delivery — one seamless platform.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-hap-surface border border-hap-border rounded-2xl p-7 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 ${f.bg}`}>{f.icon}</div>
                <h4 className="font-semibold text-white text-base mb-2">{f.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-6 bg-hap-surface/30 border-y border-hap-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-3">How It Works</p>
            <h2 className="font-display text-4xl font-bold mb-4">Simple. Structured. Seamless.</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.title} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[70%] w-full h-px border-t border-dashed border-hap-borderl" />
                )}
                <div className="bg-hap-surface border border-hap-border rounded-2xl p-6 text-center hover:border-gold/30 transition-all">
                  <div className="w-12 h-12 bg-gold-grad rounded-full flex items-center justify-center text-hap-bg font-bold text-sm mx-auto mb-4">{i + 1}</div>
                  <h5 className="font-semibold text-white text-sm mb-2">{s.title}</h5>
                  <p className="text-white/35 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-xs font-bold tracking-[0.15em] uppercase mb-3">Pricing</p>
            <h2 className="font-display text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-white/40 text-base max-w-lg mx-auto">Flexible plans designed to scale with your brand's content needs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {SUBSCRIPTION_PLANS.map(plan => (
              <div key={plan.id} className={`plan-card relative ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && (
                  <span className="absolute top-5 right-5 bg-gold text-hap-bg text-[0.6rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <p className="text-xs font-bold text-white/40 uppercase tracking-[0.1em] mb-2">{plan.name}</p>
                <p className="font-display text-4xl font-bold text-white mb-1">
                  {plan.raw ? <>{plan.price}<span className="text-base font-sans text-white/30 font-normal"> /mo</span></> : plan.price}
                </p>
                <p className="text-xs text-white/30 mb-2">{plan.period}</p>
                <p className="text-sm text-white/40 mb-6 pb-6 border-b border-hap-border">{plan.description}</p>
                <ul className="space-y-0.5 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 py-2 text-sm text-white/60 border-b border-hap-border/50 last:border-0">
                      <span className="text-green-400 font-bold flex-shrink-0">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup"
                  className={`block text-center font-semibold py-3 rounded-xl text-sm transition-all ${
                    plan.popular
                      ? 'bg-gold text-hap-bg hover:bg-gold-hover hover:shadow-gold hover:-translate-y-0.5'
                      : 'bg-hap-surface2 border border-hap-border text-white hover:border-gold hover:text-gold'
                  }`}>
                  {plan.raw ? 'Get Started' : 'Contact Sales'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-hap-surface to-hap-surface2 border border-gold/20 rounded-3xl p-14">
            <div className="w-16 h-16 bg-gold-grad rounded-2xl flex items-center justify-center font-display font-black text-3xl text-hap-bg mx-auto mb-6">H</div>
            <h2 className="font-display text-4xl font-bold mb-4">Ready to Elevate Your Brand?</h2>
            <p className="text-white/40 mb-8 text-base leading-relaxed">
              Join hundreds of brands already receiving premium content from HERIT ART PRODUCTION.
            </p>
            <Link to="/signup"
              className="inline-block bg-gold hover:bg-gold-hover text-hap-bg font-bold px-10 py-4 rounded-2xl text-base transition-all hover:shadow-gold hover:-translate-y-0.5">
              Create Your Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-hap-border py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gold-grad rounded-lg flex items-center justify-center font-display font-black text-hap-bg text-sm">H</div>
            <span className="font-display font-bold text-gold text-sm">HERIT ART PRODUCTION</span>
          </div>
          <p className="text-xs text-white/25">© {new Date().getFullYear()} Herit Art Production. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs text-white/30">
            <Link to="/production/signin" className="hover:text-gold transition-colors">Production Login</Link>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

const FEATURES = [
  { icon: '📋', bg: 'bg-gold/10', title: 'Structured Creative Briefs', desc: 'Submit detailed project briefs with brand assets, tone, audience and goals in minutes.' },
  { icon: '📊', bg: 'bg-blue-400/10', title: 'Real-time Dashboard', desc: 'Track every project from submission to delivery with live status updates.' },
  { icon: '🎬', bg: 'bg-purple-400/10', title: 'Multi-format Production', desc: 'Video, social, live activations, corporate media — all content types covered.' },
  { icon: '👥', bg: 'bg-green-400/10', title: 'Team Collaboration', desc: 'Invite teammates, assign roles and collaborate on projects together.' },
  { icon: '🔔', bg: 'bg-amber-400/10', title: 'Instant Notifications', desc: 'Get notified by email the moment your content is ready for review.' },
  { icon: '✅', bg: 'bg-red-400/10', title: 'Content Approval Flow', desc: 'Download, review and approve delivered content directly in the platform.' },
]

const STEPS = [
  { title: 'Sign Up & Onboard', desc: 'Create your account and complete your brand profile.' },
  { title: 'Choose a Plan', desc: 'Select the subscription that matches your content needs.' },
  { title: 'Submit a Project', desc: 'Fill in the creative brief — goals, tone, assets and platforms.' },
  { title: 'Receive Content', desc: 'Get notified when content is ready, download and approve.' },
]
