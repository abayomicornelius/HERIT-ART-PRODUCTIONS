import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/layout/AuthLayout'
import { useToast } from '../../context/ToastContext'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const toast = useToast()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [pw, setPw] = useState({ password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const otpRefs = useRef([])

  function onOtpChange(i, val) {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]; next[i] = val.slice(-1)
    setOtp(next)
    if (val && i < 5) otpRefs.current[i + 1]?.focus()
  }

  function onOtpKey(i, e) {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus()
  }

  function handleStep1(e) {
    e.preventDefault()
    if (!email) { toast.error('Enter your email address'); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); toast.success('OTP sent to your email'); setStep(2) }, 800)
  }

  function handleStep2(e) {
    e.preventDefault()
    if (otp.some(d => !d)) { toast.error('Enter the complete OTP'); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep(3) }, 600)
  }

  function handleStep3(e) {
    e.preventDefault()
    if (pw.password.length < 8) { toast.error('Password must be at least 8 characters'); return }
    if (pw.password !== pw.confirm) { toast.error('Passwords do not match'); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); toast.success('Password updated! Please sign in.'); navigate('/signin') }, 800)
  }

  const steps = ['Enter email', 'Verify OTP', 'New password']

  return (
    <AuthLayout>
      <h1 className="font-display text-3xl font-bold text-white mb-2">Reset Password</h1>
      <p className="text-white/40 text-sm mb-8">We'll help you get back into your account.</p>

      {/* Steps indicator */}
      <div className="flex items-center mb-10">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i + 1 < step ? 'bg-green-500/20 border border-green-500 text-green-400'
                : i + 1 === step ? 'bg-gold border border-gold text-hap-bg'
                : 'bg-hap-surface3 border border-hap-border text-white/20'
              }`}>
                {i + 1 < step ? '✓' : i + 1}
              </div>
              <span className={`text-[0.65rem] mt-1.5 font-medium text-center ${i + 1 === step ? 'text-gold' : 'text-white/25'}`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-px flex-1 mb-5 transition-colors ${i + 1 < step ? 'bg-green-500/40' : 'bg-hap-border'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1 — Email */}
      {step === 1 && (
        <form onSubmit={handleStep1} className="space-y-4 animate-slide-up">
          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5">Email address</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@brand.com" className="input" autoFocus />
            <p className="text-xs text-white/25 mt-1.5">We'll send a one-time code to this address.</p>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-gold hover:bg-gold-hover text-hap-bg font-bold py-3 rounded-xl text-sm transition-all hover:shadow-gold disabled:opacity-50 flex items-center justify-center gap-2">
            {loading && <span className="w-4 h-4 border-2 border-hap-bg/30 border-t-hap-bg rounded-full animate-spin-slow" />}
            {loading ? 'Sending…' : 'Send OTP'}
          </button>
        </form>
      )}

      {/* Step 2 — OTP */}
      {step === 2 && (
        <form onSubmit={handleStep2} className="animate-slide-up">
          <p className="text-sm text-white/40 mb-6 text-center">Enter the 6-digit code sent to <span className="text-white">{email}</span></p>
          <div className="flex justify-center gap-3 mb-8">
            {otp.map((d, i) => (
              <input key={i} ref={el => otpRefs.current[i] = el}
                value={d} onChange={e => onOtpChange(i, e.target.value)} onKeyDown={e => onOtpKey(i, e)}
                maxLength={1} inputMode="numeric"
                className="w-12 h-14 text-center text-xl font-bold text-white bg-hap-surface2 border-2 border-hap-border rounded-xl outline-none transition-all focus:border-gold focus:bg-hap-surface3" />
            ))}
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-gold hover:bg-gold-hover text-hap-bg font-bold py-3 rounded-xl text-sm transition-all hover:shadow-gold disabled:opacity-50 flex items-center justify-center gap-2">
            {loading && <span className="w-4 h-4 border-2 border-hap-bg/30 border-t-hap-bg rounded-full animate-spin-slow" />}
            {loading ? 'Verifying…' : 'Verify Code'}
          </button>
          <p className="text-center text-xs text-white/25 mt-4">
            Didn't receive it?{' '}
            <button type="button" onClick={() => toast.info('OTP resent!')} className="text-gold hover:underline bg-none border-none cursor-pointer">Resend OTP</button>
          </p>
        </form>
      )}

      {/* Step 3 — New password */}
      {step === 3 && (
        <form onSubmit={handleStep3} className="space-y-4 animate-slide-up">
          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5">New password</label>
            <input value={pw.password} onChange={e => setPw(p => ({ ...p, password: e.target.value }))}
              type="password" placeholder="Min. 8 characters" className="input" autoFocus />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5">Confirm new password</label>
            <input value={pw.confirm} onChange={e => setPw(p => ({ ...p, confirm: e.target.value }))}
              type="password" placeholder="Repeat password" className={`input ${pw.confirm && pw.confirm !== pw.password ? 'err' : ''}`} />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-gold hover:bg-gold-hover text-hap-bg font-bold py-3 rounded-xl text-sm transition-all hover:shadow-gold disabled:opacity-50 flex items-center justify-center gap-2">
            {loading && <span className="w-4 h-4 border-2 border-hap-bg/30 border-t-hap-bg rounded-full animate-spin-slow" />}
            {loading ? 'Updating…' : 'Set New Password'}
          </button>
        </form>
      )}

      <p className="text-center text-sm text-white/25 mt-8">
        <Link to="/signin" className="text-gold hover:text-gold-hover transition-colors">← Back to Sign In</Link>
      </p>
    </AuthLayout>
  )
}
