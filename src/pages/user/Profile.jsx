import { useState } from 'react'
import UserLayout from '../../components/layout/UserLayout'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const toast = useToast()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', location: user?.location || '' })
  const [pwdForm, setPwdForm] = useState({ current:'', next:'', confirm:'' })
  const [loading, setLoading] = useState(false)
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))
  const setPwd = k => e => setPwdForm(p => ({ ...p, [k]: e.target.value }))

  function saveProfile() {
    setLoading(true)
    setTimeout(() => { updateUser(form); toast.success('Profile updated!'); setLoading(false) }, 600)
  }

  function changePassword() {
    if (!pwdForm.current) { toast.error('Enter your current password'); return }
    if (pwdForm.next !== pwdForm.confirm) { toast.error('Passwords do not match'); return }
    if (pwdForm.next.length < 8) { toast.error('Password must be at least 8 characters'); return }
    setLoading(true)
    setTimeout(() => { toast.success('Password changed successfully!'); setPwdForm({ current:'', next:'', confirm:'' }); setLoading(false) }, 600)
  }

  return (
    <UserLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-1">Profile Settings</h1>
        <p className="text-white/40 text-sm">Manage your account details and preferences.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Avatar */}
        <div className="card flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gold flex items-center justify-center font-display font-bold text-2xl text-hap-bg flex-shrink-0">
            {(user?.name || 'U')[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white">{user?.name || 'User'}</p>
            <p className="text-sm text-white/40">{user?.email}</p>
          </div>
          <button className="text-xs border border-hap-border text-white/40 hover:text-white px-4 py-2 rounded-xl transition-all">Change Photo</button>
        </div>

        {/* Personal info */}
        <div className="card">
          <h3 className="font-display text-lg font-bold text-white mb-5">Personal Information</h3>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-xs text-white/40 mb-1.5">Full Name</label><input value={form.name} onChange={set('name')} className="input" /></div>
              <div><label className="block text-xs text-white/40 mb-1.5">Email</label><input type="email" value={form.email} onChange={set('email')} className="input" /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-xs text-white/40 mb-1.5">Phone</label><input value={form.phone} onChange={set('phone')} placeholder="+234 800 000 0000" className="input" /></div>
              <div><label className="block text-xs text-white/40 mb-1.5">Location</label><input value={form.location} onChange={set('location')} placeholder="Lagos, Nigeria" className="input" /></div>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={saveProfile} disabled={loading} className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-6 py-2.5 rounded-xl text-sm transition-all hover:shadow-gold disabled:opacity-50 flex items-center gap-2">
                {loading && <span className="w-4 h-4 border-2 border-hap-bg/30 border-t-hap-bg rounded-full animate-spin-slow" />}
                {loading ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="card">
          <h3 className="font-display text-lg font-bold text-white mb-5">Change Password</h3>
          <div className="space-y-4">
            <div><label className="block text-xs text-white/40 mb-1.5">Current Password</label><input type="password" value={pwdForm.current} onChange={setPwd('current')} className="input" /></div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="block text-xs text-white/40 mb-1.5">New Password</label><input type="password" value={pwdForm.next} onChange={setPwd('next')} className="input" /></div>
              <div><label className="block text-xs text-white/40 mb-1.5">Confirm New Password</label><input type="password" value={pwdForm.confirm} onChange={setPwd('confirm')} className="input" /></div>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={changePassword} disabled={loading} className="bg-hap-surface2 border border-hap-border hover:border-hap-borderl text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2">
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* Danger zone */}
        <div className="card border-red-500/15">
          <h3 className="font-display text-lg font-bold text-red-400/80 mb-3">Danger Zone</h3>
          <p className="text-sm text-white/35 mb-4">Once you delete your account, all your data will be permanently removed.</p>
          <button className="text-xs border border-red-500/30 text-red-400/60 hover:text-red-400 px-4 py-2 rounded-xl transition-all">Delete Account</button>
        </div>
      </div>
    </UserLayout>
  )
}
