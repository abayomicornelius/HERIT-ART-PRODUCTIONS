import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { INDUSTRIES } from '../../data/mockData'

function initials(f, l) { return `${f?.[0] || ''}${l?.[0] || ''}`.toUpperCase() || 'BR' }

export default function Onboarding() {
  const { updateUser } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const fileRef = useRef()
  const [form, setForm] = useState({ firstName: '', lastName: '', businessName: '', industry: '' })
  const [logo, setLogo] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  function onLogoChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setLogo(ev.target.result)
    reader.readAsDataURL(file)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.firstName || !form.lastName || !form.businessName || !form.industry) {
      toast.error('Please fill in all required fields'); return
    }
    setLoading(true)
    setTimeout(() => {
      updateUser({
        name: `${form.firstName} ${form.lastName}`,
        businessName: form.businessName,
        industry: form.industry,
        logo,
      })
      toast.success('Profile saved! Choose your plan.')
      navigate('/brand/subscription')
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-hap-bg flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[500px] animate-slide-up">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10">
          <div className="w-9 h-9 bg-gold-grad rounded-lg flex items-center justify-center font-display font-black text-hap-bg text-base">H</div>
          <span className="font-display font-bold text-gold">HERIT ART PRODUCTION</span>
        </div>

        <h1 className="font-display text-3xl font-bold text-white mb-2">Set up your brand</h1>
        <p className="text-white/40 text-sm mb-8">Tell us about your business so we can tailor content perfectly.</p>

        <form onSubmit={handleSubmit}>
          {/* Logo upload */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-white/40 mb-3">Brand Logo <span className="text-white/20">(optional)</span></label>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => fileRef.current?.click()}
                className="w-20 h-20 rounded-2xl bg-hap-surface2 border-2 border-dashed border-hap-border hover:border-gold transition-all flex items-center justify-center overflow-hidden flex-shrink-0">
                {logo
                  ? <img src={logo} alt="logo" className="w-full h-full object-cover" />
                  : <span className="font-display text-2xl text-gold font-bold">{initials(form.firstName, form.lastName) || 'BR'}</span>}
              </button>
              <div>
                <button type="button" onClick={() => fileRef.current?.click()}
                  className="text-sm text-gold hover:text-gold-hover font-medium transition-colors block mb-1">Upload logo</button>
                <p className="text-xs text-white/25">PNG or JPG, max 5MB. If skipped, your initials will be shown.</p>
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onLogoChange} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">First Name <span className="text-red-400">*</span></label>
              <input value={form.firstName} onChange={set('firstName')} placeholder="Ada" className="input" />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-1.5">Last Name <span className="text-red-400">*</span></label>
              <input value={form.lastName} onChange={set('lastName')} placeholder="Okafor" className="input" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-white/40 mb-1.5">Business Name <span className="text-red-400">*</span></label>
            <input value={form.businessName} onChange={set('businessName')} placeholder="e.g. Zara Lagos" className="input" />
          </div>

          <div className="mb-8">
            <label className="block text-xs font-medium text-white/40 mb-1.5">Business Industry <span className="text-red-400">*</span></label>
            <select value={form.industry} onChange={set('industry')} className="input">
              <option value="">Select your industry</option>
              {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-gold hover:bg-gold-hover text-hap-bg font-bold py-3.5 rounded-xl text-sm transition-all hover:shadow-gold disabled:opacity-50 flex items-center justify-center gap-2">
            {loading && <span className="w-4 h-4 border-2 border-hap-bg/30 border-t-hap-bg rounded-full animate-spin-slow" />}
            {loading ? 'Saving…' : 'Continue to Plans →'}
          </button>
        </form>
      </div>
    </div>
  )
}
