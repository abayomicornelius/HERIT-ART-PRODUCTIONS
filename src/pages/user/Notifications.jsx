import { useState } from 'react'
import UserLayout from '../../components/layout/UserLayout'
import { MOCK_NOTIFICATIONS } from '../../data/notifications'
import { useToast } from '../../context/ToastContext'

export default function Notifications() {
  const toast = useToast()
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS)

  const markAllRead = () => {
    setNotifs(n => n.map(x => ({ ...x, read: true })))
    toast.success('All notifications marked as read')
  }

  const markRead = (id) => setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x))

  const unread = notifs.filter(n => !n.read).length

  const TYPE_COLORS = {
    ticket: 'text-gold bg-gold/10 border-gold/20',
    studio: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    payment: 'text-green-400 bg-green-500/10 border-green-500/20',
    event: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    project: 'text-white/50 bg-hap-surface3 border-hap-border',
    network: 'text-gold bg-gold/10 border-gold/20',
  }

  return (
    <UserLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white mb-1 flex items-center gap-3">
            Notifications
            {unread > 0 && <span className="text-sm bg-gold text-hap-bg font-bold px-2.5 py-0.5 rounded-full">{unread}</span>}
          </h1>
          <p className="text-white/40 text-sm">Booking confirmations, reminders and announcements.</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-xs text-white/40 hover:text-gold border border-hap-border hover:border-gold/30 px-4 py-2 rounded-xl transition-all">
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-2">
        {notifs.map(n => (
          <div key={n.id} onClick={() => markRead(n.id)}
            className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${n.read ? 'bg-hap-surface border-hap-border hover:border-hap-borderl' : 'bg-hap-surface border-gold/15 bg-gold/3'}`}>
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg flex-shrink-0 ${TYPE_COLORS[n.type] || ''}`}>
              {n.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={`font-semibold text-sm ${n.read ? 'text-white/70' : 'text-white'}`}>{n.title}</p>
                <span className="text-[0.65rem] text-white/20 flex-shrink-0">{n.time}</span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed mt-0.5">{n.message}</p>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0 mt-2" />}
          </div>
        ))}
      </div>

      {notifs.every(n => n.read) && (
        <div className="text-center py-8 text-white/20 text-sm">
          <p className="text-3xl mb-3">🔔</p>
          <p>You're all caught up!</p>
        </div>
      )}
    </UserLayout>
  )
}
