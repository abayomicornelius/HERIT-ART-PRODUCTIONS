export const INDUSTRIES = [
  'Fashion & Apparel','Food & Beverage','Technology','Healthcare','Finance & Banking',
  'Real Estate','Education','Entertainment','Retail & E-commerce','Hospitality & Travel',
  'Automotive','Beauty & Cosmetics','Sports & Fitness','Non-profit','Other',
]

export const CONTENT_TYPES = [
  'Film & Video Advertising',
  'Digital & Social Media Content',
  'Stage & Live Band Activations',
  'Creative Development & Strategy',
  'Corporate & Event Media',
  'Specialised Content Production',
  'Small Business (SME) Packages',
  'Others',
]

export const TONES = [
  'Professional','Playful','Inspirational','Bold & Edgy','Minimalist',
  'Luxury & Premium','Warm & Friendly','Authoritative','Humorous','Emotional',
]

export const PLATFORMS = [
  'Instagram','TikTok','X (Twitter)','LinkedIn','Facebook','YouTube','Email Campaign','Website',
]

export const TARGET_AUDIENCES = [
  'Young Adults (18–24)','Millennials (25–34)','Gen X (35–44)','Professionals',
  'Parents','Entrepreneurs','Students','Seniors (55+)','Gen Z (13–17)',
]

export const SUBSCRIPTION_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₦150,000',
    raw: 150000,
    period: 'per month',
    description: 'Perfect for small businesses just getting started.',
    features: [
      '2 projects per month',
      'Social media content',
      'Basic brand strategy',
      '3 revision rounds',
      'Email support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '₦350,000',
    raw: 350000,
    period: 'per month',
    popular: true,
    description: 'Ideal for growing brands with consistent content needs.',
    features: [
      '5 projects per month',
      'Video + social content',
      'Full brand strategy',
      'Unlimited revisions',
      'Priority support',
      'Content calendar',
      'Performance analytics',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    raw: null,
    period: 'tailored pricing',
    description: 'End-to-end production for large-scale brands.',
    features: [
      'Unlimited projects',
      'Full production suite',
      'Dedicated account manager',
      'Live activations',
      'Corporate event media',
      '24/7 support',
      'Custom SLA',
    ],
  },
]

export const MOCK_PROJECTS = [
  {
    id: 'PRJ-001',
    name: 'Summer Campaign Launch',
    contentType: 'Digital & Social Media Content',
    status: 'In Progress',
    deadline: '2026-07-20',
    created: '2026-06-15',
    brand: 'Zara Lagos',
    goal: 'Drive awareness and engagement for summer collection across Instagram and TikTok.',
    tone: ['Playful', 'Bold & Edgy'],
    platforms: ['Instagram', 'TikTok'],
    audience: ['Young Adults (18–24)', 'Millennials (25–34)'],
    notes: 'Please ensure all colors match our brand guide attached below.',
    assignee: 'Temi Adele',
  },
  {
    id: 'PRJ-002',
    name: 'Product Launch Video',
    contentType: 'Film & Video Advertising',
    status: 'Pending',
    deadline: '2026-07-30',
    created: '2026-06-28',
    brand: 'TechFlow Inc.',
    goal: 'Create a 60-second product explainer video for YouTube and LinkedIn.',
    tone: ['Professional', 'Inspirational'],
    platforms: ['YouTube', 'LinkedIn'],
    audience: ['Professionals', 'Entrepreneurs'],
    notes: '',
    assignee: null,
  },
  {
    id: 'PRJ-003',
    name: 'Brand Identity Refresh',
    contentType: 'Creative Development & Strategy',
    status: 'Completed',
    deadline: '2026-06-10',
    created: '2026-05-20',
    brand: 'Bloom Beauty',
    goal: 'Refresh brand visuals and messaging for the new product line.',
    tone: ['Luxury & Premium', 'Warm & Friendly'],
    platforms: ['Instagram', 'Website', 'Email Campaign'],
    audience: ['Millennials (25–34)', 'Parents'],
    notes: 'Client approved on first review.',
    assignee: 'Kola Mensah',
  },
]

export const MOCK_BRANDS = [
  { id: 'BR-001', name: 'Zara Lagos',    plan: 'Growth',     activeProjects: 2, contact: 'hello@zaralaos.ng',     status: 'Active' },
  { id: 'BR-002', name: 'TechFlow Inc.', plan: 'Starter',    activeProjects: 1, contact: 'media@techflow.io',     status: 'Active' },
  { id: 'BR-003', name: 'Bloom Beauty',  plan: 'Enterprise', activeProjects: 0, contact: 'brand@bloombeauty.com', status: 'Active' },
  { id: 'BR-004', name: 'Urban Eats',    plan: 'Starter',    activeProjects: 1, contact: 'pr@urbaneats.ng',       status: 'Inactive' },
]

export const MOCK_TEAM = [
  { id: 1, name: 'Temi Adele',   email: 'temi@heritart.com',  role: 'Admin',    avatar: 'TA', projects: 4 },
  { id: 2, name: 'Kola Mensah',  email: 'kola@heritart.com',  role: 'Director', avatar: 'KM', projects: 3 },
  { id: 3, name: 'Sade Okonkwo', email: 'sade@heritart.com',  role: 'Editor',   avatar: 'SO', projects: 2 },
  { id: 4, name: 'Emeka Uche',   email: 'emeka@heritart.com', role: 'Videographer', avatar: 'EU', projects: 5 },
]
