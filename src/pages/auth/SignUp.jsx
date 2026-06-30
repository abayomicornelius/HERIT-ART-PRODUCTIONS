import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layout/AuthLayout'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export default function SignUp() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const toast = useToast()
  const [form, setForm] = useState({ email: '', password: '', confirm: '' })
  const [show, setShow] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.email || !form.password) { toast.error('Please fill in all fields'); return }
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters'); return }
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return }
    if (!agreed) { toast.error('Please accept the terms to continue'); return }
    setLoading(true)
    setTimeout(() => {
      login({ email: form.email, name: form.email.split('@')[0], role: 'brand' })
      toast.success('Account created!')
      navigate('/brand/onboarding')
      setLoading(false)
    }, 900)
  }

  function handleGoogle() {
    setLoading(true)
    setTimeout(() => {
      login({ email: 'demo@example.com', name: 'Demo User', role: 'brand' })
      toast.success('Account created with Google!')
      navigate('/brand/onboarding')
      setLoading(false)
    }, 700)
  }

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3
  const strengthLabel = ['', 'Weak', 'Good', 'Strong']
  const strengthColor = ['', 'bg-red-500', 'bg-amber-400', 'bg-green-500']

  return (
    <AuthLayout>
      <h1 className="font-display text-3xl font-bold text-white mb-2">Create your account</h1>
      <p className="text-white/40 text-sm mb-8">Start submitting content requests in minutes.</p>

      <button onClick={handleGoogle} disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-hap-surface2 border border-hap-border rounded-xl py-3 text-sm text-white/70 hover:border-hap-borderl hover:text-white transition-all mb-6 disabled:opacity-50">
        <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-3 mb-6 text-white/20 text-xs">
        <div className="flex-1 h-px bg-hap-border" /><span>or</span><div className="flex-1 h-px bg-hap-border" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-white/40 mb-1.5">Email address</label>
          <input value={form.email} onChange={set('email')} type="email" placeholder="you@brand.com" className="input" />
        </div>
        <div>
          <label className="block text-xs font-medium text-white/40 mb-1.5">Password</label>
          <div className="relative">
            <input value={form.password} onChange={set('password')} type={show ? 'text' : 'password'} placeholder="Min. 8 characters" className="input pr-11" />
            <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white text-base">{show ? '🙈' : '👁'}</button>
          </div>
          {form.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex gap-1 flex-1">
                {[1,2,3].map(i => <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor[strength] : 'bg-hap-border'}`} />)}
              </div>
              <span className={`text-xs font-medium ${strength === 1 ? 'text-red-400' : strength === 2 ? 'text-amber-400' : 'text-green-400'}`}>{strengthLabel[strength]}</span>
            </div>
          )}
        </div>
        <div>
          <label className="block text-xs font-medium text-white/40 mb-1.5">Confirm password</label>
          <input value={form.confirm} onChange={set('confirm')} type="password" placeholder="Repeat your password" className={`input ${form.confirm && form.confirm !== form.password ? 'err' : ''}`} />
          {form.confirm && form.confirm !== form.password && <p className="text-xs text-red-400 mt-1">Passwords don't match</p>}
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 accent-gold" />
          <span className="text-xs text-white/40 leading-relaxed">
            I agree to the <a href="#" className="text-gold hover:underline">Terms of Service</a> and <a href="#" className="text-gold hover:underline">Privacy Policy</a>
          </span>
        </label>

        <button type="submit" disabled={loading}
          className="w-full bg-gold hover:bg-gold-hover text-hap-bg font-bold py-3 rounded-xl text-sm transition-all hover:shadow-gold disabled:opacity-50 flex items-center justify-center gap-2">
          {loading && <span className="w-4 h-4 border-2 border-hap-bg/30 border-t-hap-bg rounded-full animate-spin-slow" />}
          {loading ? 'Creating account…' : 'Create Account'}
        </button>
      </form>

      <p className="text-center text-sm text-white/30 mt-6">
        Already have an account?{' '}
        <Link to="/signin" className="text-gold hover:text-gold-hover transition-colors font-medium">Sign in</Link>
      </p>
    </AuthLayout>
  )
}
