export const AUDIO_CATEGORIES = ['Recording', 'Mixing', 'Mastering', 'Sound Design', 'Film Scoring', 'Theatre Scoring', 'Composition', 'Podcast']

export const AUDIO_SERVICES = [
  {
    id: 'aud-001',
    category: 'Recording',
    icon: '🎙️',
    color: '#7c3aed',
    name: 'Vocal / Instrument Recording',
    description: 'Professional vocal and instrument tracking in our acoustically treated recording rooms.',
    packages: [
      { name: 'Half Session (2hrs)', price: 40000, includes: ['Engineer', 'Basic mix'] },
      { name: 'Full Session (4hrs)', price: 75000, includes: ['Engineer', 'Comp session', 'Rough mix'] },
      { name: 'Album Day (8hrs)', price: 140000, includes: ['Engineer + Assistant', 'Full day', 'Session report'] },
    ],
  },
  {
    id: 'aud-002',
    category: 'Mixing',
    icon: '🎚️',
    color: '#c9a84c',
    name: 'Mixing & Balance',
    description: 'Professional mix-down of your recorded tracks into a polished, broadcast-ready stereo mix.',
    packages: [
      { name: 'Single (up to 24 tracks)', price: 35000, includes: ['Stereo mix', '2 revisions'] },
      { name: 'EP (3–5 songs)', price: 90000, includes: ['All mixes', '2 revisions per song'] },
      { name: 'Album (8–12 songs)', price: 200000, includes: ['All mixes', 'Unlimited revisions', 'Priority turnaround'] },
    ],
  },
  {
    id: 'aud-003',
    category: 'Mastering',
    icon: '💿',
    color: '#10b981',
    name: 'Audio Mastering',
    description: 'Final stage audio mastering for streaming, broadcast, vinyl or CD release.',
    packages: [
      { name: 'Single', price: 15000, includes: ['Streaming master', 'WAV + MP3 delivery'] },
      { name: 'EP (3–5)', price: 40000, includes: ['All masters', 'All formats'] },
      { name: 'Album (8–12)', price: 90000, includes: ['All masters', 'Vinyl-ready option'] },
    ],
  },
  {
    id: 'aud-004',
    category: 'Film Scoring',
    icon: '🎬',
    color: '#dc2626',
    name: 'Film & TV Scoring',
    description: 'Original music composition and scoring for feature films, short films, series and advertisements.',
    packages: [
      { name: 'Short Film (under 20 min)', price: 150000, includes: ['Original score', 'Stems delivery', 'License'] },
      { name: 'Feature Film', price: 500000, includes: ['Full score', 'Orchestra or hybrid', 'Live session option'] },
      { name: 'TVC / Brand Film', price: 80000, includes: ['Bespoke composition', 'Full usage rights'] },
    ],
  },
  {
    id: 'aud-005',
    category: 'Theatre Scoring',
    icon: '🎭',
    color: '#f59e0b',
    name: 'Theatre & Musical Scoring',
    description: 'Live theatre music composition, arrangement and musical direction for stage productions.',
    packages: [
      { name: 'Incidental Music', price: 100000, includes: ['Up to 10 cues', 'Score + parts'] },
      { name: 'Full Musical Score', price: 400000, includes: ['Complete composition', 'Orchestration', 'MD sessions'] },
    ],
  },
  {
    id: 'aud-006',
    category: 'Sound Design',
    icon: '🔊',
    color: '#ec4899',
    name: 'Sound Design & SFX',
    description: 'Custom sound design, foley recording, and sound effects creation for film, theatre and digital media.',
    packages: [
      { name: 'Basic Package', price: 50000, includes: ['Up to 20 custom SFX', 'Delivery WAV'] },
      { name: 'Full Production', price: 120000, includes: ['Unlimited SFX', 'Foley session', 'Final mix'] },
    ],
  },
  {
    id: 'aud-007',
    category: 'Podcast',
    icon: '🎧',
    color: '#8b5cf6',
    name: 'Podcast Production',
    description: 'Complete podcast production from recording to final edit, including theme music and mastering.',
    packages: [
      { name: 'Single Episode', price: 25000, includes: ['Recording', 'Edit', 'Export'] },
      { name: 'Monthly Package (4 eps)', price: 80000, includes: ['4 episodes', 'Theme music', 'Distribution help'] },
    ],
  },
  {
    id: 'aud-008',
    category: 'Composition',
    icon: '🎼',
    color: '#c9a84c',
    name: 'Custom Composition',
    description: 'Original music composition for jingles, brand anthems, theme songs and bespoke musical works.',
    packages: [
      { name: 'Jingle (30–60 sec)', price: 60000, includes: ['Composition', 'Recording', 'Full rights'] },
      { name: 'Brand Anthem', price: 150000, includes: ['Full song', 'Video version', 'Full rights'] },
    ],
  },
]

export const PRODUCERS = [
  { id:'prod-001', name:'Sade Okonkwo', specialty:'Film Scoring, Theatre', experience:'12 years', credits:['1960 The Musical', 'Echoes of the Motherland'], color:'#c9a84c', avatar:'SO' },
  { id:'prod-002', name:'Kelechi Anwu', specialty:'Afrobeats, R&B, Production', experience:'8 years', credits:['Multiple chart artists', 'Brand campaigns'], color:'#7c3aed', avatar:'KA' },
  { id:'prod-003', name:'Yemi Okafor', specialty:'Sound Design, Mixing', experience:'10 years', credits:['Award-winning films', 'Theatre productions'], color:'#10b981', avatar:'YO' },
]
