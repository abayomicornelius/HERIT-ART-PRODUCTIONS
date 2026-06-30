import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'
import Modal from '../../components/ui/Modal'
import { CREATIVES } from '../../data/creatives'
import { useToast } from '../../context/ToastContext'

export default function CreativeProfile() {
  const { id } = useParams()
  const toast = useToast()
  const c = CREATIVES.find(x => x.id === id) || CREATIVES[0]
  const [showBook, setShowBook] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', project:'', date:'' })
  const [loading, setLoading] = useState(false)

  function submitRequest() {
    if (!form.name || !form.email || !form.project) { toast.error('Please fill in all fields'); return }
    setLoading(true)
    setTimeout(() => {
      toast.success(`Booking request sent to ${c.name}!`)
      setShowBook(false)
      setLoading(false)
    }, 900)
  }

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <Link to="/network" className="text-sm text-white/40 hover:text-gold transition-colors no-underline mb-8 inline-block">← Creative Network</Link>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Sidebar */}
          <div className="space-y-5">
            <div className="card text-center">
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center font-bold text-hap-bg text-3xl mx-auto mb-4" style={{ background: `linear-gradient(135deg, ${c.color}99, ${c.color})` }}>
                {c.avatar}
              </div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <h2 className="font-display text-2xl font-bold text-white">{c.name}</h2>
                {c.verified && <span className="text-gold text-sm" title="HERIT Verified">✦</span>}
              </div>
              <p className="text-white/40 text-sm">{c.category}</p>
              <p className="text-white/25 text-xs mt-0.5">{c.location}</p>

              <div className="flex items-center justify-center gap-2 mt-3">
                <span className={`w-2 h-2 rounded-full ${c.available ? 'bg-green-400' : 'bg-white/20'}`} />
                <span className={`text-xs font-medium ${c.available ? 'text-green-400' : 'text-white/30'}`}>{c.available ? 'Available for bookings' : 'Currently unavailable'}</span>
              </div>

              <div className="border-t border-hap-border mt-5 pt-5 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-white/30">Experience</span><span className="text-white/70">{c.experience}</span></div>
                <div className="flex justify-between"><span className="text-white/30">Day Rate</span><span className="text-gold font-bold">{c.rate}</span></div>
                {c.verified && <div className="flex justify-between"><span className="text-white/30">Status</span><span className="text-gold text-xs">✦ HERIT Verified</span></div>}
              </div>

              <button onClick={() => setShowBook(true)} disabled={!c.available}
                className="mt-5 w-full bg-gold hover:bg-gold-hover text-hap-bg font-bold py-3 rounded-xl text-sm transition-all hover:shadow-gold disabled:opacity-40 disabled:cursor-not-allowed">
                {c.available ? 'Send Booking Request' : 'Currently Unavailable'}
              </button>
            </div>
          </div>

          {/* Main */}
          <div className="md:col-span-2 space-y-6">
            <div className="card">
              <h3 className="font-display text-xl font-bold text-white mb-3">Biography</h3>
              <p className="text-white/60 leading-relaxed">{c.bio}</p>
            </div>

            <div className="card">
              <h3 className="font-display text-xl font-bold text-white mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {c.skills.map(sk => (
                  <span key={sk} className="text-sm px-3 py-1.5 rounded-xl bg-hap-surface2 border border-hap-border text-white/60">{sk}</span>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="font-display text-xl font-bold text-white mb-4">Previous Projects</h3>
              <div className="space-y-3">
                {c.portfolio.map(proj => (
                  <div key={proj.title} className="flex items-center gap-4 p-3 bg-hap-surface2 border border-hap-border rounded-xl">
                    <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center text-sm flex-shrink-0">🎭</div>
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm">{proj.title}</p>
                      <p className="text-xs text-white/30">{proj.type}</p>
                    </div>
                    <span className="text-xs text-white/30">{proj.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={showBook} onClose={() => setShowBook(false)} title={`Book ${c.name}`}
        footer={
          <>
            <button onClick={() => setShowBook(false)} className="text-sm text-white/40 hover:text-white px-4 py-2 rounded-xl">Cancel</button>
            <button onClick={submitRequest} disabled={loading} className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-6 py-2.5 rounded-xl text-sm transition-all disabled:opacity-50 flex items-center gap-2">
              {loading && <span className="w-4 h-4 border-2 border-hap-bg/30 border-t-hap-bg rounded-full animate-spin-slow" />}
              {loading ? 'Sending…' : 'Send Request'}
            </button>
          </>
        }>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-xs text-white/40 mb-1.5">Your Name *</label><input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Ada Okafor" className="input" /></div>
            <div><label className="block text-xs text-white/40 mb-1.5">Email *</label><input type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="you@email.com" className="input" /></div>
          </div>
          <div><label className="block text-xs text-white/40 mb-1.5">Project Description *</label><textarea value={form.project} onChange={e=>setForm(p=>({...p,project:e.target.value}))} rows={3} placeholder="Describe your project and how you'd like to work with this creative…" className="input" /></div>
          <div><label className="block text-xs text-white/40 mb-1.5">Desired Start Date</label><input type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} className="input" /></div>
        </div>
      </Modal>
    </PublicLayout>
  )
}
