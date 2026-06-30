import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { PRICING, DIVISIONS } from '../../data/pricing'
import { useToast } from '../../context/ToastContext'

const fmt = n => `₦${Number(n).toLocaleString()}`

// Flatten all editable rate rows from the pricing data
function buildRateRows() {
  const rows = []

  // Tickets
  PRICING.tickets.tiers.forEach(t => rows.push({ section:'Tickets', category:'Stories', name: `${t.name} Ticket – Min`, key:`ticket_${t.name}_min`, value: t.min }))
  PRICING.tickets.tiers.forEach(t => rows.push({ section:'Tickets', category:'Stories', name: `${t.name} Ticket – Max`, key:`ticket_${t.name}_max`, value: t.max }))
  rows.push({ section:'Tickets', category:'Stories', name:'Basic Event Listing', key:'ticket_listing_basic', value: PRICING.tickets.commission.basicListing })
  rows.push({ section:'Tickets', category:'Stories', name:'Featured Promotion – Min', key:'ticket_featured_min', value: PRICING.tickets.commission.featured.min })
  rows.push({ section:'Tickets', category:'Stories', name:'Featured Promotion – Max', key:'ticket_featured_max', value: PRICING.tickets.commission.featured.max })
  rows.push({ section:'Tickets', category:'Stories', name:'Full Marketing Package', key:'ticket_full_pkg', value: PRICING.tickets.commission.fullPackage })

  // Studios
  PRICING.visualStudio.rates.forEach(r => {
    rows.push({ section:'Visual Studio', category:'Spaces', name:`${r.name} – Min`, key:`vs_${r.name}_min`, value: r.min })
    rows.push({ section:'Visual Studio', category:'Spaces', name:`${r.name} – Max`, key:`vs_${r.name}_max`, value: r.max })
  })
  PRICING.photographyStudio.rates.forEach(r => {
    rows.push({ section:'Photography Studio', category:'Spaces', name:`${r.name} – Min`, key:`ph_${r.name}_min`, value: r.min })
    rows.push({ section:'Photography Studio', category:'Spaces', name:`${r.name} – Max`, key:`ph_${r.name}_max`, value: r.max })
  })
  PRICING.rehearsalSpace.rates.forEach(r => {
    rows.push({ section:'Rehearsal Space', category:'Spaces', name:`${r.name} – Min`, key:`rs_${r.name}_min`, value: r.min })
    rows.push({ section:'Rehearsal Space', category:'Spaces', name:`${r.name} – Max`, key:`rs_${r.name}_max`, value: r.max })
  })
  PRICING.visualStudio.addOns.forEach(a => {
    rows.push({ section:'Studio Add-Ons', category:'Spaces', name: a.name, key:`addon_${a.name}`, value: a.price })
  })

  // Audio
  PRICING.audioRecording.rates.forEach(r => {
    rows.push({ section:'Recording Studio', category:'Sound', name:`${r.name} – Min`, key:`ar_${r.name}_min`, value: r.min })
    rows.push({ section:'Recording Studio', category:'Sound', name:`${r.name} – Max`, key:`ar_${r.name}_max`, value: r.max })
  })
  PRICING.mixingMastering.rates.forEach(r => {
    rows.push({ section:'Mixing & Mastering', category:'Sound', name:`${r.name} – Min`, key:`mm_${r.name}_min`, value: r.min })
    rows.push({ section:'Mixing & Mastering', category:'Sound', name:`${r.name} – Max`, key:`mm_${r.name}_max`, value: r.max })
  })
  PRICING.soundDesign.rates.forEach(r => {
    rows.push({ section:'Sound Design', category:'Sound', name:`${r.name} – Min`, key:`sd_${r.name}_min`, value: r.min })
    rows.push({ section:'Sound Design', category:'Sound', name:`${r.name} – Max`, key:`sd_${r.name}_max`, value: r.max })
  })
  PRICING.filmScoring.rates.forEach(r => {
    rows.push({ section:'Film Scoring', category:'Sound', name:`${r.name} – Min`, key:`fs_${r.name}_min`, value: r.min })
    rows.push({ section:'Film Scoring', category:'Sound', name:`${r.name} – Max`, key:`fs_${r.name}_max`, value: r.max })
  })

  // Rentals & Costumes
  PRICING.equipmentRental.categories.forEach(c => {
    rows.push({ section:'Equipment Rentals', category:'Spaces', name:`${c.name} – From`, key:`er_${c.name}`, value: c.from })
  })
  PRICING.costumeRental.tiers.filter(t => t.min).forEach(t => {
    rows.push({ section:'Costume House', category:'Experiences', name:`${t.name} – Min`, key:`cr_${t.name}_min`, value: t.min })
    rows.push({ section:'Costume House', category:'Experiences', name:`${t.name} – Max`, key:`cr_${t.name}_max`, value: t.max })
  })

  // Creative Agency
  PRICING.creativeAgency.packages.forEach(p => {
    rows.push({ section:'Creative Agency', category:'Brands', name: p.name, key:`ca_${p.name}`, value: p.price })
  })

  // Academy
  PRICING.academy.tiers.forEach(t => {
    rows.push({ section:'H.ART Academy', category:'Experiences', name:`${t.name} – Min`, key:`ac_${t.name}_min`, value: t.min })
    rows.push({ section:'H.ART Academy', category:'Experiences', name:`${t.name} – Max`, key:`ac_${t.name}_max`, value: t.max })
  })

  // Membership
  PRICING.membership.plans.forEach(p => {
    rows.push({ section:'Membership', category:'Brands', name: p.name, key:`mem_${p.name}`, value: p.price })
  })

  // Commission
  rows.push({ section:'Talent Commission', category:'People', name:'Min Commission %', key:'comm_min', value: PRICING.talentBooking.commissionRange.min })
  rows.push({ section:'Talent Commission', category:'People', name:'Max Commission %', key:'comm_max', value: PRICING.talentBooking.commissionRange.max })

  return rows
}

const ALL_ROWS = buildRateRows()
const SECTIONS = [...new Set(ALL_ROWS.map(r => r.section))]
const CAT_COLORS = { Stories:'text-yellow-400', Spaces:'text-purple-400', Sound:'text-green-400', People:'text-amber-400', Brands:'text-pink-400', Experiences:'text-indigo-400' }

export default function AdminPricing() {
  const toast = useToast()
  const [prices, setPrices] = useState(() => Object.fromEntries(ALL_ROWS.map(r => [r.key, r.value])))
  const [edited, setEdited] = useState({})
  const [activeSection, setActiveSection] = useState('All')
  const [search, setSearch] = useState('')

  function handleChange(key, val) {
    const num = Number(val.replace(/[^0-9.]/g,''))
    setPrices(p => ({ ...p, [key]: num }))
    setEdited(e => ({ ...e, [key]: true }))
  }

  function saveAll() {
    setEdited({})
    toast.success(`${Object.keys(edited).length} price(s) updated successfully.`)
  }

  function reset(key, original) {
    setPrices(p => ({ ...p, [key]: original }))
    setEdited(e => { const n={...e}; delete n[key]; return n })
  }

  const visible = ALL_ROWS.filter(r => {
    const matchSection = activeSection === 'All' || r.section === activeSection
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.section.toLowerCase().includes(search.toLowerCase())
    return matchSection && matchSearch
  })

  const grouped = SECTIONS.filter(s => activeSection === 'All' || s === activeSection).map(s => ({
    section: s,
    rows: visible.filter(r => r.section === s),
  })).filter(g => g.rows.length > 0)

  const changedCount = Object.keys(edited).length

  return (
    <AdminLayout
      title="Pricing Manager"
      subtitle="Update all service prices from this dashboard"
      actions={
        changedCount > 0 && (
          <button onClick={saveAll} className="bg-gold hover:bg-gold-hover text-hap-bg text-sm font-bold px-5 py-2 rounded-xl transition-all hover:shadow-gold">
            Save {changedCount} Change{changedCount !== 1 ? 's' : ''}
          </button>
        )
      }
    >
      {/* Revenue Division Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {DIVISIONS.map(d => (
          <div key={d.key} className="stat-card text-center">
            <span className="text-2xl block mb-1">{d.icon}</span>
            <p className={`font-bold text-sm ${CAT_COLORS[d.key]}`}>{d.label}</p>
            <p className="text-[0.6rem] text-white/25 mt-0.5">{d.desc}</p>
          </div>
        ))}
      </div>

      {/* Payment Rules Banner */}
      <div className="card mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-white mb-1">Payment & Refund Policy</h3>
            <p className="text-xs text-white/40">{PRICING.paymentRules.refundPolicy}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-white/30 mb-1">Deposit Required</p>
            <p className="text-gold font-bold text-2xl">{PRICING.paymentRules.deposit}%</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {PRICING.paymentRules.paymentMethods.map(m => (
            <span key={m} className="text-xs px-3 py-1 bg-hap-surface3 border border-hap-border rounded-full text-white/40">{m}</span>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search prices…"
          className="input flex-1"
        />
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActiveSection('All')} className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${activeSection==='All'?'bg-gold text-hap-bg':'bg-hap-surface border border-hap-border text-white/40 hover:text-white'}`}>All</button>
          {SECTIONS.map(s => (
            <button key={s} onClick={() => setActiveSection(s)} className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${activeSection===s?'bg-gold text-hap-bg':'bg-hap-surface border border-hap-border text-white/40 hover:text-white'}`}>{s}</button>
          ))}
        </div>
      </div>

      {/* Price editor */}
      <div className="space-y-6">
        {grouped.map(({ section, rows }) => (
          <div key={section} className="card">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="font-display font-bold text-white">{section}</h3>
              {rows[0] && <span className={`text-[0.6rem] font-bold uppercase tracking-widest ${CAT_COLORS[rows[0].category]}`}>{rows[0].category}</span>}
              <span className="ml-auto text-xs text-white/25">{rows.length} values</span>
            </div>
            <div className="space-y-2">
              {rows.map(r => {
                const isChanged = edited[r.key]
                const original = ALL_ROWS.find(x => x.key === r.key)?.value
                return (
                  <div key={r.key} className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${isChanged ? 'border-gold/30 bg-gold/3' : 'border-hap-border bg-hap-surface2'}`}>
                    <span className="flex-1 text-sm text-white/60 min-w-0">{r.name}</span>
                    <div className="flex items-center gap-2">
                      {isChanged && (
                        <button onClick={() => reset(r.key, original)} className="text-[0.6rem] text-white/25 hover:text-white/60 transition-colors">reset</button>
                      )}
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold text-sm font-bold">₦</span>
                        <input
                          type="text"
                          value={prices[r.key]?.toLocaleString() ?? ''}
                          onChange={e => handleChange(r.key, e.target.value)}
                          className={`input pl-7 w-40 text-right text-sm ${isChanged ? 'border-gold/40 text-gold' : ''}`}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {changedCount > 0 && (
        <div className="mt-6 p-4 bg-gold/5 border border-gold/20 rounded-2xl flex items-center justify-between">
          <p className="text-sm text-gold font-medium">{changedCount} unsaved change{changedCount !== 1 ? 's' : ''}</p>
          <button onClick={saveAll} className="bg-gold hover:bg-gold-hover text-hap-bg text-sm font-bold px-6 py-2.5 rounded-xl transition-all hover:shadow-gold">
            Save All Changes
          </button>
        </div>
      )}
    </AdminLayout>
  )
}
