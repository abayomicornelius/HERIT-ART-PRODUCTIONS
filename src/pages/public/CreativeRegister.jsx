import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'
import { CATEGORIES } from '../../data/creatives'
import { useToast } from '../../context/ToastContext'

const STEPS = ['Account', 'Creative Profile', 'Portfolio', 'Submit']

export default function CreativeRegister() {
  const navigate = useNavigate()
  const toast = useToast()
  const fileRef = useRef()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState([])
  const [form, setForm] = useState({ name:'', email:'', password:'', category:'', location:'', experience:'', bio:'', skills:'', rate:'' })
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  function onFiles(e) {
    setFiles(prev => [...prev, ...[...e.target.files].map(f => ({ name: f.name, size: (f.size/1024).toFixed(0)+' KB' }))])
  }

  function validate() {
    if (step === 0 && (!form.name || !form.email || !form.password)) { toast.error('Fill all account fields'); return false }
    if (step === 1 && (!form.category || !form.location || !form.bio)) { toast.error('Fill all profile fields'); return false }
    return true
  }

  function next() { if (validate()) setStep(s => Math.min(s + 1, 3)) }

  function submit() {
    setLoading(true)
    setTimeout(() => {
      toast.success('Application submitted! HERIT will review your profile within 48 hours.')
      navigate('/')
    }, 1000)
  }

  return (
    <PublicLayout>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">H.ART Creative Network</p>
          <h1 className="font-display text-4xl font-bold text-white mb-2">Join the Network</h1>
          <p className="text-white/40 text-sm">Apply to become a verified HERIT creative professional.</p>
        </div>

        {/* Steps */}
        <div className="flex items-center mb-8">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${i < step ? 'bg-green-500/20 border border-green-500 text-green-400' : i === step ? 'bg-gold border-2 border-gold text-hap-bg' : 'bg-hap-surface3 border border-hap-border text-white/25'}`}>{i < step ? '✓' : i+1}</div>
              <span className={`text-[0.65rem] ml-1.5 hidden sm:block font-medium ${i===step?'text-gold':'text-white/25'}`}>{label}</span>
              {i < STEPS.length-1 && <div className={`flex-1 h-px mx-2 ${i<step?'bg-green-500/30':'bg-hap-border'}`} />}
            </div>
          ))}
        </div>

        <div className="card animate-slide-up">
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-white mb-5">Create Your Account</h3>
              <div><label className="block text-xs text-white/40 mb-1.5">Full Name *</label><input value={form.name} onChange={set('name')} placeholder="Ada Okafor" className="input" /></div>
              <div><label className="block text-xs text-white/40 mb-1.5">Email *</label><input type="email" value={form.email} onChange={set('email')} placeholder="ada@email.com" className="input" /></div>
              <div><label className="block text-xs text-white/40 mb-1.5">Password *</label><input type="password" value={form.password} onChange={set('password')} placeholder="Min. 8 characters" className="input" /></div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold text-white mb-5">Creative Profile</h3>
              <div><label className="block text-xs text-white/40 mb-1.5">Creative Category *</label>
                <select value={form.category} onChange={set('category')} className="input">
                  <option value="">Select your primary role</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-xs text-white/40 mb-1.5">Location *</label><input value={form.location} onChange={set('location')} placeholder="Lagos, Nigeria" className="input" /></div>
                <div><label className="block text-xs text-white/40 mb-1.5">Years of Experience</label>
                  <select value={form.experience} onChange={set('experience')} className="input">
                    <option value="">Select…</option>
                    {['1–2 years','3–5 years','6–10 years','10+ years'].map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
              </div>
              <div><label className="block text-xs text-white/40 mb-1.5">Biography *</label><textarea value={form.bio} onChange={set('bio')} rows={4} placeholder="Tell us about yourself, your work and what makes your creative practice unique…" className="input" /></div>
              <div><label className="block text-xs text-white/40 mb-1.5">Skills (comma separated)</label><input value={form.skills} onChange={set('skills')} placeholder="e.g. Stage Acting, Voice Acting, Movement" className="input" /></div>
              <div><label className="block text-xs text-white/40 mb-1.5">Day Rate</label><input value={form.rate} onChange={set('rate')} placeholder="e.g. ₦50,000/day" className="input" /></div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h3 className="font-display text-xl font-bold text-white mb-5">Upload Portfolio</h3>
              <div className="upload-zone" onClick={() => fileRef.current?.click()}>
                <span className="text-3xl block mb-3">📎</span>
                <p className="text-sm text-white/50"><strong className="text-gold">Click to upload</strong> portfolio files</p>
                <p className="text-xs text-white/25 mt-1">Showreel, headshots, work samples — PDF, JPG, PNG, MP4</p>
                <input ref={fileRef} type="file" multiple className="hidden" onChange={onFiles} />
              </div>
              {files.length > 0 && (
                <div className="space-y-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-hap-surface2 border border-hap-border rounded-xl text-sm">
                      <span className="text-white/60 flex-1 truncate">{f.name}</span>
                      <span className="text-white/30 text-xs">{f.size}</span>
                      <button onClick={() => setFiles(fs => fs.filter((_,j)=>j!==i))} className="text-white/25 hover:text-red-400 transition-colors">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5">✦</div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">Ready to Submit</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">Your application will be reviewed by the HERIT team. Approved profiles go live within 48 hours and become visible to the entire network.</p>
              <div className="bg-hap-surface2 border border-hap-border rounded-xl p-4 text-left space-y-2 mb-6">
                {[['Name', form.name],['Category', form.category],['Location', form.location],['Portfolio Files', files.length ? `${files.length} files` : 'None']].map(([l,v]) => (
                  <div key={l} className="flex justify-between text-sm"><span className="text-white/30">{l}</span><span className="text-white/70">{v||'—'}</span></div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-hap-border">
            <button onClick={() => setStep(s=>Math.max(s-1,0))} disabled={step===0} className="text-sm text-white/40 hover:text-white disabled:opacity-20 transition-colors">← Back</button>
            {step < 3
              ? <button onClick={next} className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-8 py-2.5 rounded-xl text-sm transition-all hover:shadow-gold">Continue →</button>
              : <button onClick={submit} disabled={loading} className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-8 py-2.5 rounded-xl text-sm transition-all hover:shadow-gold disabled:opacity-50 flex items-center gap-2">
                  {loading && <span className="w-4 h-4 border-2 border-hap-bg/30 border-t-hap-bg rounded-full animate-spin-slow" />}
                  {loading ? 'Submitting…' : '🚀 Submit Application'}
                </button>
            }
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
