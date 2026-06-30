import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import BrandLayout from '../../components/layout/BrandLayout'
import TagsInput from '../../components/ui/TagsInput'
import { useToast } from '../../context/ToastContext'
import { CONTENT_TYPES, TONES, PLATFORMS, TARGET_AUDIENCES } from '../../data/mockData'

const STEPS = ['Project Info', 'Audience & Tone', 'Assets', 'Review & Submit']

export default function CreateProject() {
  const navigate = useNavigate()
  const toast = useToast()
  const fileRef = useRef()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState([])

  const [form, setForm] = useState({
    name: '',
    contentType: '',
    deadline: '',
    keyFeatures: '',
    audience: [],
    tone: [],
    platforms: [],
    goal: '',
    notes: '',
  })

  const set = k => v => setForm(p => ({ ...p, [k]: v }))
  const setStr = k => e => setForm(p => ({ ...p, [k]: e.target.value }))
  const toggle = (k, val) => setForm(p => ({
    ...p, [k]: p[k].includes(val) ? p[k].filter(x => x !== val) : [...p[k], val]
  }))

  function validateStep() {
    if (step === 0 && (!form.name || !form.contentType || !form.deadline)) {
      toast.error('Please fill in all required fields'); return false
    }
    if (step === 1 && (form.audience.length === 0 || form.tone.length === 0)) {
      toast.error('Select at least one audience and tone'); return false
    }
    return true
  }

  function next() { if (validateStep()) setStep(s => Math.min(s + 1, 3)) }
  function back() { setStep(s => Math.max(s - 1, 0)) }

  function onFiles(e) {
    const list = [...(e.target.files || [])]
    const icons = { png:'🖼️', jpg:'🖼️', jpeg:'🖼️', mp4:'🎬', mov:'🎬', pdf:'📄', ai:'✏️', psd:'🎨', zip:'📦' }
    const mapped = list.map(f => ({
      name: f.name,
      size: f.size > 1048576 ? (f.size/1048576).toFixed(1)+' MB' : (f.size/1024).toFixed(0)+' KB',
      icon: icons[f.name.split('.').pop().toLowerCase()] || '📎',
    }))
    setFiles(prev => [...prev, ...mapped])
  }

  function submit() {
    if (!form.goal) { toast.error('Please describe the primary goal'); return }
    setLoading(true)
    setTimeout(() => {
      toast.success('Project submitted! Our team will review it shortly.')
      navigate('/brand/projects')
    }, 1000)
  }

  const pct = Math.round(((step + 1) / STEPS.length) * 100)

  return (
    <BrandLayout title="New Project Brief" subtitle="Fill in the brief for our production team">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                i < step ? 'bg-green-500/20 border border-green-500 text-green-400'
                : i === step ? 'bg-gold border-2 border-gold text-hap-bg'
                : 'bg-hap-surface3 border border-hap-border text-white/25'
              }`}>{i < step ? '✓' : i + 1}</div>
              <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-gold' : 'text-white/30'}`}>{label}</span>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-green-500/30' : 'bg-hap-border'}`} />}
            </div>
          ))}
        </div>
        <div className="h-1 bg-hap-surface3 rounded-full overflow-hidden">
          <div className="h-full bg-gold-h rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="max-w-2xl">
        {/* Step 0 — Project Info */}
        {step === 0 && (
          <div className="space-y-5 animate-slide-up">
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Project Name <span className="text-red-400">*</span></label>
              <input value={form.name} onChange={setStr('name')} placeholder="e.g. Summer Campaign Launch" className="input" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-2">Content Type <span className="text-red-400">*</span></label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CONTENT_TYPES.map(ct => (
                  <label key={ct} className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    form.contentType === ct ? 'border-gold bg-gold/5 text-white' : 'border-hap-border text-white/50 hover:border-hap-borderl'
                  }`}>
                    <input type="radio" name="ct" value={ct} checked={form.contentType === ct} onChange={setStr('contentType')} className="accent-gold" />
                    <span className="text-sm">{ct}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Deadline / Delivery Date <span className="text-red-400">*</span></label>
              <input type="date" value={form.deadline} onChange={setStr('deadline')} className="input" min={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Key Product / Service Features</label>
              <textarea value={form.keyFeatures} onChange={setStr('keyFeatures')} placeholder="Describe key features you want highlighted in the content…" rows={4} className="input" />
            </div>
          </div>
        )}

        {/* Step 1 — Audience & Tone */}
        {step === 1 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <label className="block text-xs font-medium text-white/40 mb-2">Target Audience <span className="text-red-400">*</span> <span className="text-white/20">(select all that apply)</span></label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TARGET_AUDIENCES.map(a => (
                  <label key={a} className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                    form.audience.includes(a) ? 'border-gold bg-gold/5 text-white' : 'border-hap-border text-white/40 hover:border-hap-borderl'
                  }`}>
                    <input type="checkbox" checked={form.audience.includes(a)} onChange={() => toggle('audience', a)} className="accent-gold" />
                    <span className="text-xs">{a}</span>
                  </label>
                ))}
              </div>
              <div className="mt-3">
                <p className="text-xs text-white/30 mb-2">Or add custom audience:</p>
                <TagsInput value={form.audience} onChange={set('audience')} placeholder="Type audience and press Enter…" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/40 mb-2">Tone of Voice <span className="text-red-400">*</span> <span className="text-white/20">(multi-select)</span></label>
              <div className="flex flex-wrap gap-2">
                {TONES.map(t => (
                  <button key={t} type="button" onClick={() => toggle('tone', t)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                      form.tone.includes(t) ? 'bg-gold text-hap-bg border-gold' : 'border-hap-border text-white/40 hover:border-gold hover:text-gold'
                    }`}>{t}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/40 mb-2">Content Platforms <span className="text-white/20">(where content will be used)</span></label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map(p => (
                  <button key={p} type="button" onClick={() => toggle('platforms', p)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                      form.platforms.includes(p) ? 'bg-gold/15 text-gold border-gold/40' : 'border-hap-border text-white/40 hover:border-hap-borderl'
                    }`}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Assets */}
        {step === 2 && (
          <div className="space-y-6 animate-slide-up">
            <div>
              <p className="text-xs font-medium text-white/40 mb-3">Upload Brand Assets <span className="text-white/20">(logos, colors, product images, guidelines)</span></p>
              <div className="upload-zone" onClick={() => fileRef.current?.click()}>
                <span className="text-3xl block mb-3">☁️</span>
                <p className="text-sm text-white/50"><strong className="text-gold">Click to upload</strong> or drag and drop</p>
                <p className="text-xs text-white/25 mt-1">PNG, JPG, MP4, PDF, AI, PSD — max 50MB each</p>
                <input ref={fileRef} type="file" multiple accept="image/*,video/*,.pdf,.ai,.psd,.zip" className="hidden" onChange={onFiles} />
              </div>
              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-hap-surface2 border border-hap-border rounded-xl">
                      <span className="text-xl flex-shrink-0">{f.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{f.name}</p>
                        <p className="text-xs text-white/30">{f.size}</p>
                      </div>
                      <button type="button" onClick={() => setFiles(fs => fs.filter((_, j) => j !== i))}
                        className="text-white/30 hover:text-red-400 transition-colors text-sm">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Brand Color Codes <span className="text-white/20">(optional)</span></label>
              <input placeholder="e.g. #C9A84C, #09090F, #FFFFFF" className="input" />
            </div>
          </div>
        )}

        {/* Step 3 — Review & Submit */}
        {step === 3 && (
          <div className="space-y-5 animate-slide-up">
            <div className="bg-hap-surface2 border border-hap-border rounded-2xl p-5 space-y-3">
              <h4 className="font-semibold text-white mb-4">Project Summary</h4>
              {[
                ['Project Name', form.name],
                ['Content Type', form.contentType],
                ['Deadline', form.deadline],
                ['Audience', form.audience.join(', ') || '—'],
                ['Tone', form.tone.join(', ') || '—'],
                ['Platforms', form.platforms.join(', ') || '—'],
                ['Files', files.length ? `${files.length} file(s)` : 'None uploaded'],
              ].map(([label, value]) => (
                <div key={label} className="info-row">
                  <span className="text-xs text-white/30 font-semibold uppercase tracking-wider w-36 flex-shrink-0">{label}</span>
                  <span className="text-sm text-white/70">{value || '—'}</span>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Primary Goal of Content <span className="text-red-400">*</span></label>
              <textarea value={form.goal} onChange={setStr('goal')} rows={3} placeholder="What do you want this content to achieve?" className="input" />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Additional Notes to Production Team</label>
              <textarea value={form.notes} onChange={setStr('notes')} rows={3} placeholder="Any special instructions, references or details…" className="input" />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-hap-border">
          <button onClick={back} disabled={step === 0}
            className="text-sm text-white/40 hover:text-white transition-colors disabled:opacity-20 flex items-center gap-2">
            ← Back
          </button>
          {step < 3 ? (
            <button onClick={next}
              className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-8 py-2.5 rounded-xl text-sm transition-all hover:shadow-gold">
              Continue →
            </button>
          ) : (
            <button onClick={submit} disabled={loading}
              className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-8 py-2.5 rounded-xl text-sm transition-all hover:shadow-gold disabled:opacity-50 flex items-center gap-2">
              {loading && <span className="w-4 h-4 border-2 border-hap-bg/30 border-t-hap-bg rounded-full animate-spin-slow" />}
              {loading ? 'Submitting…' : '🚀 Submit Brief'}
            </button>
          )}
        </div>
      </div>
    </BrandLayout>
  )
}
