import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const HAP_LOGO = 'https://ugc.production.linktr.ee/9c73a313-ebff-44d8-af46-330a1db7d77e_B5D1DC04-F0C4-4B7E-B7A0-DC0C7C178B5F.png'

const NAV_PRIMARY = [
  { label: 'Productions',      href: '/productions' },
  { label: 'Events',           href: '/events'      },
  { label: 'Studios',          href: '/studios'     },
  { label: 'Network',          href: '/network'     },
  { label: 'Pricing',          href: '/pricing'     },
]

const NAV_MORE = [
  { label: 'Audio',     href: '/audio',    icon: '🎙️' },
  { label: 'Services',  href: '/services', icon: '✨' },
  { label: 'Rentals',   href: '/rentals',  icon: '🎬' },
  { label: 'Costumes',  href: '/costumes', icon: '👗' },
  { label: 'Academy',   href: '/academy',  icon: '🎓' },
  { label: 'About',     href: '/about',    icon: '🏛️' },
  { label: 'Blog',      href: '/blog',     icon: '📰' },
  { label: 'Contact',   href: '/contact',  icon: '✉️' },
]

const NAV = [...NAV_PRIMARY, ...NAV_MORE]

export default function PublicLayout({ children, dark = true }) {
  const { user, logout } = useAuth()
  const { light, toggle } = useTheme()
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef(null)

  useEffect(() => {
    function onClick(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const dashboardLink = user?.role === 'production' ? '/production/dashboard'
                      : user?.role === 'admin'      ? '/admin'
                      : user ? '/dashboard'         : null

  return (
    <div className="min-h-screen bg-hap-bg text-white transition-colors duration-300">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-hap-border/60 bg-hap-bg/85 backdrop-blur-md">
        {/* animated gradient hairline */}
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden pointer-events-none">
          <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-gold/70 to-transparent animate-[shimmer_5s_linear_infinite]" style={{ backgroundSize: '300% 100%' }} />
        </div>

        <div className="max-w-7xl mx-auto px-5 py-3 flex items-center gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline flex-shrink-0 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gold/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110" />
              <img src={HAP_LOGO} alt="HERIT ART PRODUCTIONS"
                className="relative w-9 h-9 rounded-lg object-cover flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="hidden sm:block leading-tight">
              <span className="block font-display font-bold text-gold text-sm leading-tight group-hover:text-gold-light transition-colors duration-200">HERIT ART</span>
              <span className="block text-[0.5rem] text-white/25 tracking-[0.14em] uppercase font-normal">Productions</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_PRIMARY.map(n => {
              const active = pathname.startsWith(n.href)
              return (
                <Link key={n.href} to={n.href}
                  className={`relative px-3 py-2 rounded-lg text-xs font-medium transition-all no-underline group/nav whitespace-nowrap ${
                    active ? 'text-gold' : 'text-white/55 hover:text-white'
                  }`}>
                  {n.label}
                  <span className={`absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-gold/40 via-gold to-gold/40 origin-center transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'}`} />
                </Link>
              )
            })}

            {/* More dropdown */}
            <div className="relative" ref={moreRef}>
              <button onClick={() => setMoreOpen(o => !o)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  moreOpen || NAV_MORE.some(n => pathname.startsWith(n.href)) ? 'text-gold bg-gold/10' : 'text-white/55 hover:text-white hover:bg-white/5'
                }`}>
                More
                <span className={`inline-block text-[0.6rem] transition-transform duration-300 ${moreOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {moreOpen && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-56 rounded-2xl border border-hap-border bg-hap-surface/95 backdrop-blur-xl shadow-2xl shadow-black/40 p-2 grid grid-cols-2 gap-1 animate-scale-in" style={{ animationFillMode: 'both' }}>
                  {NAV_MORE.map((n, i) => (
                    <Link key={n.href} to={n.href} onClick={() => setMoreOpen(false)}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-medium transition-all no-underline animate-reveal ${
                        pathname.startsWith(n.href) ? 'text-gold bg-gold/10' : 'text-white/55 hover:text-white hover:bg-white/5'
                      }`} style={{ animationDelay: `${i * 35}ms`, animationFillMode: 'both' }}>
                      <span>{n.icon}</span>{n.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">
            {/* Theme toggle — icon only, compact */}
            <button
              onClick={toggle}
              title={light ? 'Switch to dark mode' : 'Switch to light mode'}
              aria-label="Toggle theme"
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-hap-border bg-hap-surface2 hover:border-gold/40 hover:scale-110 transition-all flex-shrink-0"
              style={{ color: 'rgb(var(--ink))' }}
            >
              <span className="text-sm">{light ? '🌙' : '☀️'}</span>
            </button>
            <Link to="/search" className="hidden sm:flex items-center justify-center w-9 h-9 text-white/40 hover:text-white rounded-xl hover:bg-white/5 transition-all flex-shrink-0" title="Search">🔍</Link>
            {user ? (
              <div className="flex items-center gap-1.5">
                {dashboardLink && (
                  <Link to={dashboardLink}
                    className="hidden md:block text-xs text-white/50 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all no-underline whitespace-nowrap">
                    Dashboard
                  </Link>
                )}
                <button onClick={logout}
                  className="text-xs text-white/30 hover:text-red-400 px-3 py-2 rounded-lg hover:bg-white/5 transition-all whitespace-nowrap">
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <Link to="/signin" className="hidden md:flex items-center text-xs font-medium text-white/55 hover:text-white px-3.5 py-2 rounded-xl hover:bg-white/5 transition-all no-underline whitespace-nowrap flex-shrink-0">
                  Sign in
                </Link>
                <Link to="/signup" className="ripple-btn relative overflow-hidden flex items-center bg-gold hover:bg-gold-hover text-hap-bg text-xs font-bold px-4 py-2 rounded-xl transition-all hover:shadow-gold hover:scale-105 no-underline whitespace-nowrap flex-shrink-0">
                  <span className="relative z-10">Get Started</span>
                </Link>
              </>
            )}
            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(o => !o)} className="lg:hidden flex items-center justify-center w-9 h-9 text-white/50 hover:text-white rounded-xl hover:bg-white/5 transition-all flex-shrink-0">
              <span className={`inline-block transition-transform duration-300 ${mobileOpen ? 'rotate-90' : ''}`}>{mobileOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-hap-border bg-hap-surface px-5 py-4 space-y-1 animate-slide-up max-h-[80vh] overflow-y-auto">
            {NAV.map((n, i) => (
              <Link key={n.href} to={n.href} onClick={() => setMobileOpen(false)}
                style={{ animationDelay: `${i * 30}ms`, animationFillMode: 'both' }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all no-underline animate-reveal-right ${pathname.startsWith(n.href) ? 'bg-gold/10 text-gold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                {n.icon && <span>{n.icon}</span>}{n.label}
              </Link>
            ))}
            {!user ? (
              <div className="flex gap-2 pt-2">
                <Link to="/signin" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-3 py-2.5 text-sm border border-hap-border rounded-xl text-white/60 hover:text-white no-underline">Sign In</Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="flex-1 text-center px-3 py-2.5 text-sm bg-gold text-hap-bg font-bold rounded-xl no-underline">Get Started</Link>
              </div>
            ) : (
              <button onClick={() => { logout(); setMobileOpen(false) }} className="w-full text-left px-3 py-2.5 text-sm text-red-400/80 hover:text-red-400">Sign out</button>
            )}
          </div>
        )}
      </nav>

      {/* Page content */}
      <main className="pt-[60px]">{children}</main>

      {/* Floating theme toggle — always visible */}
      <button
        onClick={toggle}
        title={light ? 'Switch to dark mode' : 'Switch to light mode'}
        aria-label="Toggle theme"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-lg border border-hap-border bg-hap-surface backdrop-blur-sm hover:border-gold/50 hover:shadow-gold transition-all text-sm font-semibold"
        style={{ color: 'rgb(var(--ink))' }}
      >
        <span className="text-lg">{light ? '🌙' : '☀️'}</span>
        {light ? 'Dark mode' : 'Light mode'}
      </button>

      {/* Footer */}
      <footer className="border-t border-hap-border mt-20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={HAP_LOGO} alt="HERIT ART PRODUCTIONS" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                <div>
                  <span className="block font-display font-bold text-gold text-base">HERIT ART</span>
                  <span className="block text-[0.55rem] text-white/25 tracking-[0.14em] uppercase">Productions</span>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-5 max-w-xs">
                Creative powerhouse merging Theatre, Film, Music & Social Impact. The central home for African creativity.
              </p>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((s, i) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    title={s.title}
                    style={{ animationDelay: `${i * 0.06}s` }}
                    className="w-8 h-8 rounded-lg bg-hap-surface2 border border-hap-border flex items-center justify-center text-white/30 hover:text-gold hover:border-gold/30 hover:scale-125 hover:-translate-y-1 hover:shadow-gold transition-all duration-200 text-xs font-bold">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            {/* Links */}
            {FOOTER_LINKS.map(col => (
              <div key={col.title}>
                <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map(l => (
                    <li key={l.label}>
                      <Link to={l.href} className="text-sm text-white/50 hover:text-gold transition-colors no-underline">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="border-t border-hap-border pt-10 mb-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <p className="font-display font-bold text-white text-lg mb-1">Stay in the story.</p>
                <p className="text-white/40 text-sm">Get new shows, tickets, events and announcements.</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <input type="email" placeholder="your@email.com"
                  className="input flex-1 md:w-64 py-3" />
                <button className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-5 py-3 rounded-xl text-sm transition-all hover:shadow-gold whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
            <p>© {new Date().getFullYear()} HERIT ART PRODUCTIONS. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <Link to="/admin" className="hover:text-gold transition-colors">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const FOOTER_LINKS = [
  {
    title: 'Platform',
    links: [
      { label: 'Productions', href: '/productions' },
      { label: 'Events & Tickets', href: '/events'   },
      { label: 'H.ART Studios', href: '/studios'    },
      { label: 'H.ART Audio', href: '/audio'        },
      { label: 'Creative Services', href: '/services' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Creative Network', href: '/network'          },
      { label: 'Join as Creative', href: '/network/register' },
      { label: 'Equipment Rentals', href: '/rentals'         },
      { label: 'Costume House',    href: '/costumes'         },
      { label: 'H.ART Academy',   href: '/academy'          },
      { label: 'Blog & News',      href: '/blog'             },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About HERIT', href: '/about'   },
      { label: 'Pricing',     href: '/pricing' },
      { label: 'Contact',     href: '/contact' },
      { label: 'Sign In',     href: '/signin'  },
      { label: 'Register',    href: '/signup'  },
    ],
  },
]

const SOCIAL_LINKS = [
  { label: 'IG',  href: 'https://www.instagram.com/heritartproductions',            title: 'Instagram' },
  { label: '▶',   href: 'https://youtube.com/@herit_artproduction',                 title: 'YouTube'   },
  { label: 'TT',  href: 'https://www.tiktok.com/@herit.art.production',             title: 'TikTok'    },
  { label: '𝕏',   href: 'https://x.com/art_herit55305',                             title: 'X / Twitter'},
  { label: 'f',   href: 'https://www.facebook.com/heritartproductions',             title: 'Facebook'  },
  { label: 'W',   href: 'https://wa.me/2348061225812',                              title: 'WhatsApp'  },
  { label: 'Th',  href: 'https://www.threads.com/@heritartproductions',             title: 'Threads'   },
]
