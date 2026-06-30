import { useState } from 'react'
import BrandLayout from '../../components/layout/BrandLayout'
import Modal from '../../components/ui/Modal'
import Badge from '../../components/ui/Badge'
import { useToast } from '../../context/ToastContext'

const ROLES = ['Admin', 'Editor', 'Viewer']

const initMembers = [
  { id: 1, name: 'Ada Okafor',  email: 'ada@brand.com',  role: 'Admin',  avatar: 'AO', joined: 'Jun 1, 2026' },
  { id: 2, name: 'Chidi Eze',   email: 'chidi@brand.com', role: 'Editor', avatar: 'CE', joined: 'Jun 10, 2026' },
]

export default function BrandTeam() {
  const toast = useToast()
  const [members, setMembers] = useState(initMembers)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Editor')
  const [editId, setEditId] = useState(null)
  const [editRole, setEditRole] = useState('')

  function handleInvite() {
    if (!inviteEmail.includes('@')) { toast.error('Enter a valid email'); return }
    const name = inviteEmail.split('@')[0]
    setMembers(prev => [...prev, {
      id: Date.now(), name, email: inviteEmail, role: inviteRole,
      avatar: name.slice(0, 2).toUpperCase(), joined: 'Just now',
    }])
    toast.success(`Invite sent to ${inviteEmail}`)
    setInviteEmail(''); setShowInvite(false)
  }

  function handleRoleChange(id, role) {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, role } : m))
    toast.success('Role updated')
    setEditId(null)
  }

  function handleRemove(id) {
    if (!confirm('Remove this team member?')) return
    setMembers(prev => prev.filter(m => m.id !== id))
    toast.success('Member removed')
  }

  function copyLink() {
    navigator.clipboard.writeText(`${window.location.origin}/invite/brand-${Date.now()}`)
    toast.success('Invite link copied!')
  }

  return (
    <BrandLayout title="Team" subtitle="Manage your brand team members"
      actions={
        <button onClick={() => setShowInvite(true)}
          className="bg-gold hover:bg-gold-hover text-hap-bg text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:shadow-gold flex items-center gap-2">
          + Invite Member
        </button>
      }>

      <div className="max-w-3xl">
        {/* Link share */}
        <div className="card mb-6 flex items-center gap-4">
          <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-lg flex-shrink-0">🔗</div>
          <div className="flex-1">
            <p className="font-semibold text-white text-sm">Share Invite Link</p>
            <p className="text-xs text-white/40 mt-0.5">Anyone with this link can join your brand team.</p>
          </div>
          <button onClick={copyLink} className="text-sm text-gold hover:text-gold-hover font-medium transition-colors border border-gold/30 px-4 py-2 rounded-xl hover:bg-gold/5">
            Copy Link
          </button>
        </div>

        {/* Members list */}
        <div className="card p-0 overflow-hidden">
          <div className="px-6 py-4 border-b border-hap-border flex items-center justify-between">
            <h3 className="font-semibold text-white">Members <span className="text-white/30 font-normal text-sm">({members.length})</span></h3>
          </div>
          <div className="divide-y divide-hap-border">
            {members.map(m => (
              <div key={m.id} className="px-6 py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-grad flex items-center justify-center text-sm font-bold text-hap-bg flex-shrink-0">
                  {m.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{m.name}</p>
                  <p className="text-xs text-white/30">{m.email} · Joined {m.joined}</p>
                </div>
                {editId === m.id ? (
                  <div className="flex items-center gap-2">
                    <select value={editRole} onChange={e => setEditRole(e.target.value)}
                      className="input py-1.5 text-xs w-32">
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <button onClick={() => handleRoleChange(m.id, editRole)}
                      className="text-xs bg-gold text-hap-bg font-bold px-3 py-1.5 rounded-lg transition-all hover:bg-gold-hover">Save</button>
                    <button onClick={() => setEditId(null)} className="text-xs text-white/30 hover:text-white px-2">✕</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Badge variant={m.role === 'Admin' ? 'gold' : 'muted'}>{m.role}</Badge>
                    <button onClick={() => { setEditId(m.id); setEditRole(m.role) }}
                      className="text-xs text-white/30 hover:text-gold transition-colors">Edit</button>
                    {m.role !== 'Admin' && (
                      <button onClick={() => handleRemove(m.id)}
                        className="text-xs text-white/20 hover:text-red-400 transition-colors">Remove</button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal open={showInvite} onClose={() => setShowInvite(false)} title="Invite Team Member"
        footer={
          <>
            <button onClick={() => setShowInvite(false)} className="text-sm text-white/40 hover:text-white px-4 py-2 rounded-xl">Cancel</button>
            <button onClick={handleInvite} className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-6 py-2.5 rounded-xl text-sm transition-all">Send Invite</button>
          </>
        }>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5">Email address</label>
            <input value={inviteEmail} onChange={e => setInviteEmail(e.target.value)}
              type="email" placeholder="teammate@brand.com" className="input" onKeyDown={e => e.key === 'Enter' && handleInvite()} />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5">Role</label>
            <select value={inviteRole} onChange={e => setInviteRole(e.target.value)} className="input">
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <p className="text-xs text-white/25 mt-1.5">Admins can manage team members. Editors can create projects. Viewers can only view.</p>
          </div>
        </div>
      </Modal>
    </BrandLayout>
  )
}
