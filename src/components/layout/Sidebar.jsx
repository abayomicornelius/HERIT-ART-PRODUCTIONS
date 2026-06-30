import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function initials(name = '') {
  return (name || '').split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'U'
}

const Icons = {
  dashboard: <svg viewBox="0 0 20 20" fill="currentColor" className="w-[17px] h-[17px]"><path d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 9a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm9-9a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zm0 9a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3z"/></svg>,
  projects:  <svg viewBox="0 0 20 20" fill="currentColor" className="w-[17px] h-[17px]"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/></svg>,
  team:      <svg viewBox="0 0 20 20" fill="currentColor" className="w-[17px] h-[17px]"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>,
  sub:       <svg viewBox="0 0 20 20" fill="currentColor" className="w-[17px] h-[17px]"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM2 11v3a2 2 0 002 2h12a2 2 0 002-2v-3H2z"/></svg>,
  review:    <svg viewBox="0 0 20 20" fill="currentColor" className="w-[17px] h-[17px]"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>,
  brands:    <svg viewBox="0 0 20 20" fill="currentColor" className="w-[17px] h-[17px]"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/></svg>,
  analytics: <svg viewBox="0 0 20 20" fill="currentColor" className="w-[17px] h-[17px]"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>,
  logout:    <svg viewBox="0 0 20 20" fill="currentColor" className="w-[17px] h-[17px]"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/></svg>,
}

export default function Sidebar({ links, badge }) {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()

  return (
    <aside className="w-[255px] bg-hap-surface border-r border-hap-border flex flex-col fixed top-0 left-0 h-screen z-50 overflow-y-auto">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-hap-border">
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 bg-gold-grad rounded-lg flex items-center justify-center font-display font-black text-base text-hap-bg flex-shrink-0">H</div>
          <div>
            <span className="block font-display font-bold text-gold text-[0.95rem] leading-tight">HERIT ART</span>
            <span className="block text-[0.58rem] text-white/25 tracking-[0.12em] uppercase font-normal">Production</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {links.map(({ to, label, icon, badge: b }) => {
          const active = pathname === to || (to !== '/brand/dashboard' && to !== '/production/dashboard' && pathname.startsWith(to))
          return (
            <Link key={to} to={to} className={`nav-item ${active ? 'active' : ''}`}>
              <span className="opacity-70">{Icons[icon]}</span>
              <span className="flex-1">{label}</span>
              {b && <span className="bg-gold text-hap-bg text-[0.6rem] font-bold px-2 py-0.5 rounded-full">{b}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-hap-border">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-hap-surface2 transition-all cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gold-grad flex items-center justify-center text-[0.7rem] font-bold text-hap-bg flex-shrink-0">
            {initials(user?.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[0.8125rem] font-semibold text-white truncate">{user?.name || user?.email || 'User'}</p>
            <p className="text-[0.65rem] text-white/30">{user?.role === 'production' ? 'Production Team' : 'Brand'}</p>
          </div>
          <button onClick={logout} title="Log out"
            className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition-all">
            {Icons.logout}
          </button>
        </div>
      </div>
    </aside>
  )
}
