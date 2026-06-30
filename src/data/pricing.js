// Centralised pricing — admin can update these values from /admin/pricing
export const PRICING = {
  tickets: {
    label: 'Event Tickets',
    division: 'Stories',
    tiers: [
      { name: 'Regular', min: 10000, max: 15000, perks: ['General admission', 'Standard seating'] },
      { name: 'VIP', min: 25000, max: 40000, perks: ['Premium seating', 'Better viewing', 'Exclusive programme', 'Possible meet & greet'] },
      { name: 'VVIP', min: 50000, max: 100000, perks: ['Best seating', 'Backstage access', 'Exclusive reception', 'Special experience package'] },
    ],
    commission: {
      basicListing: 20000,
      featured: { min: 50000, max: 100000 },
      fullPackage: 150000,
    },
  },

  visualStudio: {
    label: 'Visual / Content Studio',
    division: 'Spaces',
    rates: [
      { name: 'Hourly', min: 15000, max: 25000, unit: 'hour', includes: ['Studio space', 'Basic lighting setup'] },
      { name: 'Half Day', min: 60000, max: 100000, unit: 'session', includes: ['Studio space', 'Basic lighting', 'Support tech'] },
      { name: 'Full Day', min: 120000, max: 200000, unit: 'day', includes: ['Studio space', 'Full lighting rig', 'Support tech', 'Grip package'] },
    ],
    addOns: [
      { name: 'Camera Operator', price: 30000 },
      { name: 'Lighting Technician', price: 20000 },
      { name: 'Video Editor', price: 50000 },
      { name: 'Photographer', price: 50000 },
    ],
  },

  photographyStudio: {
    label: 'Photography Studio',
    division: 'Spaces',
    rates: [
      { name: 'Hourly', min: 15000, max: 30000, unit: 'hour', includes: ['Space', 'Basic setup'] },
      { name: 'Full Day', min: 150000, max: 200000, unit: 'day', includes: ['Space', 'Full setup', 'Lighting'] },
    ],
    addOns: [
      { name: 'Photographer', price: 50000 },
    ],
  },

  rehearsalSpace: {
    label: 'Rehearsal Space',
    division: 'Spaces',
    rates: [
      { name: 'Hourly', min: 5000, max: 15000, unit: 'hour', includes: ['Space', 'Sound system'] },
      { name: 'Half Day', min: 30000, max: 50000, unit: 'session', includes: ['Space', 'PA system', 'Basic staging'] },
      { name: 'Full Day', min: 60000, max: 100000, unit: 'day', includes: ['Space', 'Full AV system', 'Chairs & tables'] },
    ],
    suitable: ['Theatre rehearsals', 'Dance', 'Music practice', 'Workshops'],
  },

  audioRecording: {
    label: 'Recording Studio',
    division: 'Sound',
    rates: [
      { name: 'Basic Session', min: 10000, max: 20000, unit: 'hour', includes: ['Recording engineer', 'Studio access'] },
      { name: 'Artist Package', min: 100000, max: 250000, unit: 'package', includes: ['Recording session', 'Vocal editing', 'Mixing', 'Mastering'] },
      { name: 'Music Production', min: 100000, max: 300000, unit: 'project', includes: ['Beat production', 'Arrangement', 'Recording support'] },
    ],
  },

  mixingMastering: {
    label: 'Mixing & Mastering',
    division: 'Sound',
    rates: [
      { name: 'Single Mix', min: 50000, max: 150000, unit: 'track', includes: ['Stereo mix', '2 revisions'] },
      { name: 'Mastering (single)', min: 20000, max: 50000, unit: 'track', includes: ['Mastered WAV + MP3'] },
      { name: 'EP Mix & Master', min: 150000, max: 350000, unit: 'project', includes: ['3–5 tracks', 'All formats'] },
      { name: 'Album Mix & Master', min: 300000, max: 600000, unit: 'project', includes: ['8–12 tracks', 'Vinyl option'] },
    ],
  },

  soundDesign: {
    label: 'Sound Design',
    division: 'Sound',
    rates: [
      { name: 'Film Sound Design', min: 150000, max: 500000, unit: 'project', includes: ['Based on film length & complexity'] },
      { name: 'Theatre Sound Design', min: 200000, max: 600000, unit: 'production', includes: ['Sound concepts', 'Effects', 'Playback design', 'Technical prep'] },
    ],
  },

  filmScoring: {
    label: 'Film Scoring & Composition',
    division: 'Sound',
    rates: [
      { name: 'Short Film Score', min: 200000, max: 500000, unit: 'project', includes: ['Original score', 'Stems delivery', 'License'] },
      { name: 'Feature Film Score', min: 1000000, max: 3000000, unit: 'project', includes: ['Full score', 'Orchestra or hybrid', 'Live session option'] },
      { name: 'Theatre Musical Score', min: 300000, max: 2000000, unit: 'production', includes: ['Number of songs', 'Arrangement', 'Recording requirements'] },
      { name: 'TVC / Brand Composition', min: 60000, max: 200000, unit: 'project', includes: ['Bespoke composition', 'Full usage rights'] },
    ],
  },

  equipmentRental: {
    label: 'Equipment Rentals',
    division: 'Spaces',
    categories: [
      { name: 'Camera Packages', from: 45000, unit: 'day' },
      { name: 'Lighting Equipment', from: 20000, unit: 'day' },
      { name: 'Audio Equipment', from: 15000, unit: 'day' },
      { name: 'Full Production Package', from: 100000, unit: 'day', includes: ['Camera', 'Lighting', 'Audio equipment'] },
    ],
  },

  costumeRental: {
    label: 'Costume House',
    division: 'Experiences',
    tiers: [
      { name: 'Basic Costume', min: 10000, max: 25000, unit: 'day', examples: ['Period casual', 'Event wear'] },
      { name: 'Premium Costume', min: 30000, max: 100000, unit: 'day', examples: ['Royal regalia', 'Theatre centrepiece', 'Film hero costume'] },
      { name: 'Production Package', min: null, max: null, unit: 'custom', examples: ['Theatre productions', 'Film productions', 'Large events'] },
    ],
  },

  talentBooking: {
    label: 'Creative Network Talent Booking',
    division: 'People',
    model: 'commission',
    commissionRange: { min: 10, max: 20 },
    examples: [
      { role: 'Actor', fee: 100000, heritCommission: '₦10,000 – ₦20,000' },
      { role: 'Director', fee: 300000, heritCommission: '₦30,000 – ₦60,000' },
      { role: 'Cinematographer', fee: 150000, heritCommission: '₦15,000 – ₦30,000' },
    ],
  },

  creativeAgency: {
    label: 'Creative Agency Services',
    division: 'Brands',
    packages: [
      {
        name: 'Starter',
        price: 150000,
        period: 'month',
        includes: ['Content planning', 'Graphics', 'Short videos', 'Social media posts'],
        highlight: false,
      },
      {
        name: 'Growth',
        price: 350000,
        period: 'month',
        includes: ['Content strategy', 'Video production', 'Campaign development', 'Monthly analytics report'],
        highlight: true,
      },
      {
        name: 'Premium Campaign',
        price: 1000000,
        period: 'campaign',
        includes: ['Commercial production', 'Full campaign', 'Creative direction', 'Marketing assets', 'PR support'],
        highlight: false,
      },
      {
        name: 'Corporate Production',
        price: 500000,
        period: 'project',
        includes: ['Event coverage', 'Documentary', 'Corporate films', 'Annual report video'],
        highlight: false,
        startingFrom: true,
      },
    ],
  },

  academy: {
    label: 'H.ART Academy',
    division: 'Experiences',
    tiers: [
      { name: 'Single Class', min: 10000, max: 50000, unit: 'class', includes: ['1 session', 'Certificate of attendance'] },
      { name: 'Masterclass', min: 50000, max: 150000, unit: 'event', includes: ['Full-day intensive', 'Industry professional', 'Networking opportunity'] },
      { name: 'Professional Course', min: 200000, max: 500000, unit: 'course', includes: ['Multi-week programme', 'Mentorship', 'Portfolio development', 'Certification'] },
    ],
  },

  membership: {
    label: 'Membership Plans',
    division: 'Brands',
    plans: [
      {
        name: 'Creator Membership',
        price: 25000,
        period: 'month',
        benefits: ['Discounted studio bookings', 'Priority booking', 'Network access', 'Monthly newsletter'],
      },
      {
        name: 'Business Membership',
        price: 100000,
        period: 'month',
        benefits: ['Creative consultation', 'Priority production support', 'Discounts on all services', 'Dedicated account manager'],
      },
    ],
  },

  paymentRules: {
    deposit: 50,
    balanceDue: 'Before service delivery',
    paymentMethods: ['Full payment', 'Deposit + balance', 'Instalment plans (3 months max)'],
    refundPolicy: '50% refund if cancelled 7+ days before. No refund within 48 hours.',
    invoicing: true,
  },
}

export const DIVISIONS = [
  { key: 'Stories',     label: 'Stories',     icon: '🎭', desc: 'Ticket sales & productions',   color: '#c9a84c' },
  { key: 'Spaces',      label: 'Spaces',      icon: '🎙️', desc: 'Studio bookings & rentals',    color: '#7c3aed' },
  { key: 'Sound',       label: 'Sound',       icon: '🎵', desc: 'Audio production & scoring',   color: '#10b981' },
  { key: 'People',      label: 'People',      icon: '✦',  desc: 'Creative talent bookings',     color: '#f59e0b' },
  { key: 'Brands',      label: 'Brands',      icon: '📣',  desc: 'Creative campaigns & agency', color: '#ec4899' },
  { key: 'Experiences', label: 'Experiences', icon: '🌍',  desc: 'Events, workshops & costumes', color: '#8b5cf6' },
]
