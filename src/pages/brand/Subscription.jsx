import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { SUBSCRIPTION_PLANS } from '../../data/mockData'
import Modal from '../../components/ui/Modal'

export default function Subscription() {
  const { updateUser } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [selected, setSelected] = useState('growth')
  const [gateway, setGateway] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const plan = SUBSCRIPTION_PLANS.find(p => p.id === selected)

  function handleSubscribe() {
    if (!gateway) { toast.error('Please choose a payment method'); return }
    setLoading(true)
    setTimeout(() => {
      updateUser({ plan: selected })
      toast.success(`Subscribed to ${plan.name}!`)
      navigate('/brand/dashboard')
      setLoading(false)
    }, 1000)
  }

  function handleSkip() {
    updateUser({ plan: null })
    toast.info('You can subscribe anytime from your dashboard.')
    navigate('/brand/dashboard')
  }

  return (
    <div className="min-h-screen bg-hap-bg px-6 py-16">
      <div className="max-w-5xl mx-auto animate-slide-up">
        <div className="flex items-center gap-2.5 mb-10">
          <div className="w-9 h-9 bg-gold-grad rounded-lg flex items-center justify-center font-display font-black text-hap-bg text-base">H</div>
          <span className="font-display font-bold text-gold">HERIT ART PRODUCTION</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-white mb-3">Choose your plan</h1>
          <p className="text-white/40 text-base">Flexible subscriptions for every stage of your brand's growth.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {SUBSCRIPTION_PLANS.map(p => (
            <button key={p.id} type="button" onClick={() => setSelected(p.id)}
              className={`plan-card text-left transition-all cursor-pointer ${p.popular ? 'popular' : ''} ${selected === p.id ? 'ring-2 ring-gold ring-offset-2 ring-offset-hap-bg' : ''}`}>
              {p.popular && <span className="absolute top-5 right-5 bg-gold text-hap-bg text-[0.6rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Popular</span>}
              <p className="text-xs font-bold text-white/40 uppercase tracking-[0.1em] mb-2">{p.name}</p>
              <p className="font-display text-4xl font-bold text-white mb-1">
                {p.raw ? p.price : 'Custom'}
                {p.raw && <span className="text-base font-sans text-white/30 font-normal"> /mo</span>}
              </p>
              <p className="text-xs text-white/25 mb-2">{p.period}</p>
              <p className="text-sm text-white/40 mb-5 pb-5 border-b border-hap-border">{p.description}</p>
              <ul className="space-y-0.5">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 py-1.5 text-sm text-white/60 border-b border-hap-border/40 last:border-0">
                    <span className="text-green-400 font-bold flex-shrink-0 text-xs">✓</span>{f}
                  </li>
                ))}
              </ul>
              <div className={`mt-6 py-2.5 rounded-xl text-sm font-semibold text-center transition-all ${
                selected === p.id ? 'bg-gold text-hap-bg' : 'bg-hap-surface2 border border-hap-border text-white/50'
              }`}>
                {selected === p.id ? '✓ Selected' : 'Select Plan'}
              </div>
            </button>
          ))}
        </div>

        {plan.raw && (
          <div className="bg-hap-surface border border-hap-border rounded-2xl p-6 mb-6">
            <h3 className="font-semibold text-white mb-4 text-sm">Payment Method</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {GATEWAYS.map(g => (
                <label key={g.id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  gateway === g.id ? 'border-gold bg-gold/5' : 'border-hap-border hover:border-hap-borderl'
                }`}>
                  <input type="radio" name="gateway" value={g.id} checked={gateway === g.id} onChange={() => setGateway(g.id)} className="accent-gold" />
                  <span className="text-2xl">{g.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{g.name}</p>
                    <p className="text-xs text-white/30">{g.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button onClick={handleSkip} className="text-sm text-white/30 hover:text-white/60 transition-colors">
            Skip for now — pay later
          </button>
          <div className="flex items-center gap-3">
            {plan.raw ? (
              <button onClick={handleSubscribe} disabled={loading}
                className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-8 py-3 rounded-xl text-sm transition-all hover:shadow-gold disabled:opacity-50 flex items-center gap-2">
                {loading && <span className="w-4 h-4 border-2 border-hap-bg/30 border-t-hap-bg rounded-full animate-spin-slow" />}
                {loading ? 'Processing…' : `Subscribe — ${plan.price}/mo`}
              </button>
            ) : (
              <button onClick={() => toast.info('Our team will reach out within 24 hours.')}
                className="bg-gold hover:bg-gold-hover text-hap-bg font-bold px-8 py-3 rounded-xl text-sm transition-all hover:shadow-gold">
                Contact Sales
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const GATEWAYS = [
  { id: 'paystack',   name: 'Paystack',   icon: '💳', desc: 'Cards, bank transfer & USSD' },
  { id: 'flutterwave', name: 'Flutterwave', icon: '🦋', desc: 'Cards & mobile money' },
]
