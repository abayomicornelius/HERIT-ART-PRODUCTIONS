import { useState } from 'react'
import ProductionLayout from '../../components/layout/ProductionLayout'
import Modal from '../../components/ui/Modal'
import Badge from '../../components/ui/Badge'
import { useToast } from '../../context/ToastContext'
import { MOCK_TEAM, MOCK_PROJECTS } from '../../data/mockData'

const ROLES = ['Admin', 'Director', 'Videographer', 'Editor', 'Photographer', 'Copywriter']

export default function ProdTeam() {
  const toast = useToast()
  const [members, setMembers] = useState(MOCK_TEAM)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Editor')
  const [editId, setEditId] = useState(null)
  const [editRole, setEditRole] = useState('')

  function handleInvite() {
    if (!inviteEmail.includes('@')) { toast.error('Enter a valid email'); return }
    const name = inviteEmail.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    const avatar = name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()
    setMembers(prev => [...prev, { id: Date.now(), name, email: inviteEmail, role: inviteRole, avatar, projects: 0 }])
    toast.success(`Invite sent to ${inviteEmail}. They'll receive an email notification.`)
    setInviteEmail(''); setShowInvite(false)
  }

  function saveRole(id) {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, role: editRole } : m))
    toast.success('Role updated'); setEditId(null)
  }

  function remove(id) {
    if (!confirm('Remove this team member?')) return
    setMembers(prev => prev.filter(m => m.id !== id))
    toast.success('Member removed')
  }

  function copyInviteLink() {
    navigator.clipboard.writeText(`${window.location.origin}/invite/prod-${Date.now()}`)
    toast.success('Invite link copied!')
  }

  return (
    <ProductionLayout title="Team" subtitle="Manage your production crew"
      actions={
        <button onClick={() => setShowInvite(true)}
          className="bg-gold hover:bg-gold-hover text-hap-bg text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:shadow-gold flex items-center gap-2">
          + Add Member
        </button>
      }>

      {/* Invite link */}
      <div className="card mb-6 flex items-center gap-4">
        <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-lg flex-shrink-0">🔗</div>
        <div className="flex-1">
          <p className="font-semibold text-white text-sm">Share Team Invite Link</p>
          <p className="text-xs text-white/40 mt-0.5">Invite new production members via a shareable link.</p>
        </div>
        <button onClick={copyInviteLink}
          className="text-sm text-gold hover:text-gold-hover font-medium border border-gold/30 px-4 py-2 rounded-xl hover:bg-gold/5 transition-all">
          Copy Link
        </button>
      </div>

      {/* Team grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
        {members.map(m => {
          const assigned = MOCK_PROJECTS.filter(p => p.assignee === m.name)
          return (
            <div key={m.id} className="card">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-gold-grad rounded-2xl flex items-center justify-center font-bold text-hap-bg text-sm flex-shrink-0">
                  {m.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white">{m.name}</p>
                  <p className="text-xs text-white/30 truncate">{m.email}</p>
                </div>
              </div>

              {editId === m.id ? (
                <div className="flex items-center gap-2 mb-4">
                  <select value={editRole} onChange={e => setEditRole(e.target.value)} className="input py-1.5 text-xs flex-1">
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <button onClick={() => saveRole(m.id)} className="text-xs bg-gold text-hap-bg font-bold px-3 py-1.5 rounded-lg">Save</button>
                  <button onClick={() => setEditId(null)} className="text-xs text-white/30 hover:text-white px-1">✕</button>
                </div>
              ) : (
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={m.role === 'Admin' ? 'gold' : 'muted'}>{m.role}</Badge>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditId(m.id); setEditRole(m.role) }}
                      className="text-xs text-white/30 hover:text-gold transition-colors">Edit</button>
                    {m.role !== 'Admin' && (
                      <button onClick={() => remove(m.id)} className="text-xs text-white/20 hover:text-red-400 transition-colors">Remove</button>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-hap-border flex items-center justify-between text-xs">
                <span className="text-white/30">Active projects</span>
                <span className="font-semibold text-white">{assigned.length || m.projects}</span>
              </div>
              {assigned.length > 0 && (
                <div className="mt-2 space-y-1">
                  {assigned.slice(0,2).map(p => (
                    <p key={p.id} className="text-xs text-white/25 truncate">• {p.name}</p>
                  ))}
                  {assigned.length > 2 && <p className="text-xs text-gold">+{assigned.length - 2} more</p>}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <Modal open={showInvite} onClose={() => setShowInvite(false)} title="Add Team Member"
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
              type="email" placeholder="crew@heritart.com" className="input" onKeyDown={e => e.key === 'Enter' && handleInvite()} />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/40 mb-1.5">Role</label>
            <select value={inviteRole} onChange={e => setInviteRole(e.target.value)} className="input">
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
      </Modal>
    </ProductionLayout>
  )
}
