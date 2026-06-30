import UserLayout from '../../components/layout/UserLayout'
import Badge from '../../components/ui/Badge'
import { MOCK_PAYMENTS } from '../../data/payments'

const METHOD_ICONS = { Paystack: '💳', Flutterwave: '🦋', 'Bank Transfer': '🏦' }

export default function PaymentHistory() {
  const total = MOCK_PAYMENTS.filter(p => p.status === 'success').reduce((s, p) => s + p.amount, 0)
  const pending = MOCK_PAYMENTS.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0)

  return (
    <UserLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-1">Payment History</h1>
        <p className="text-white/40 text-sm">All your transactions across HERIT services.</p>
      </div>

      {/* Summary */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="stat-card">
          <p className="text-xs text-white/30 mb-1">Total Spent</p>
          <p className="font-display text-2xl font-bold text-gold">₦{total.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs text-white/30 mb-1">Pending Payments</p>
          <p className="font-display text-2xl font-bold text-yellow-400">₦{pending.toLocaleString()}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs text-white/30 mb-1">Transactions</p>
          <p className="font-display text-2xl font-bold text-white">{MOCK_PAYMENTS.length}</p>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden p-0">
        <div className="p-5 border-b border-hap-border flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-white">Transactions</h3>
          <button className="text-xs border border-hap-border text-white/40 hover:text-white px-4 py-2 rounded-xl transition-all">Export PDF</button>
        </div>
        <table className="tbl w-full">
          <thead>
            <tr><th>Reference</th><th>Description</th><th>Type</th><th>Method</th><th>Date</th><th>Amount</th><th>Status</th></tr>
          </thead>
          <tbody>
            {MOCK_PAYMENTS.map(p => (
              <tr key={p.id}>
                <td className="font-mono text-xs text-white/40">{p.ref}</td>
                <td className="text-white/70">{p.description}</td>
                <td>
                  <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-hap-surface3 text-white/40 border border-hap-border">{p.type}</span>
                </td>
                <td>
                  <span className="flex items-center gap-1 text-white/50">
                    <span>{METHOD_ICONS[p.method]}</span>{p.method}
                  </span>
                </td>
                <td>{new Date(p.date).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })}</td>
                <td className="text-gold font-bold">₦{p.amount.toLocaleString()}</td>
                <td><Badge variant={p.status === 'success' ? 'success' : p.status === 'pending' ? 'warning' : 'error'}>{p.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </UserLayout>
  )
}
