export const STUDIOS = [
  {
    id: 'visual',
    name: 'H.ART Visual Studio',
    subtitle: 'Photo & Film Production',
    icon: '🎥',
    color: '#c9a84c',
    description: 'A state-of-the-art visual production space equipped for photography, film, and brand content creation.',
    longDesc: 'Our Visual Studio features a 2,400 sq ft shooting floor, professional lighting rigs, cyclorama wall, and a full wardrobe/makeup suite. Ideal for fashion campaigns, product photography, short films, and music videos.',
    gallery: [],
    equipment: ['4K RED Cinema Camera', 'Full LED lighting rig', 'Infinity cyclorama wall', 'Green screen system', 'Drone (indoor & outdoor)', 'Teleprompter', 'Full grip & gaffer package'],
    packages: [
      { name: 'Half Day (4hrs)', price: 120000, includes: ['Studio space', 'Basic lighting', 'Support tech'] },
      { name: 'Full Day (8hrs)', price: 200000, includes: ['Studio space', 'Full lighting rig', 'Support tech', 'Grip package'] },
      { name: 'Premium Day',     price: 350000, includes: ['Studio space', 'Full lighting', 'Camera package', 'Dedicated PA', 'Drone session'] },
    ],
  },
  {
    id: 'audio',
    name: 'H.ART Audio Studio',
    subtitle: 'Recording, Production & Scoring',
    icon: '🎙️',
    color: '#7c3aed',
    description: 'A world-class recording and music production studio built for artists, composers, and sound designers.',
    longDesc: 'Our 24-track professional audio studio is acoustically treated to international standards. From album recording and film scoring to podcast production and sound design, our engineers deliver premium results.',
    gallery: [],
    equipment: ['SSL 4000 G+ Console', 'Pro Tools Ultimate', 'Neve 1073 preamps', 'Full outboard processing chain', 'Steinway grand piano', 'Full percussion suite', 'Vocal isolation booth'],
    packages: [
      { name: 'Recording Session (4hrs)', price: 80000,  includes: ['Studio + engineer', 'Tracking & editing'] },
      { name: 'Production Session (8hrs)', price: 150000, includes: ['Full day with producer', 'Mixing & mastering'] },
      { name: 'Scoring Consultation',     price: 50000,  includes: ['2hr session with composer', 'Demo arrangement'] },
      { name: 'Podcast Package',          price: 35000,  includes: ['3hr session', 'Editing + export'] },
    ],
    services: ['Recording', 'Music Production', 'Film Scoring', 'Theatre Scoring', 'Sound Design', 'Mixing & Mastering', 'Podcast Production'],
  },
  {
    id: 'rehearsal',
    name: 'Rehearsal Space',
    subtitle: 'Dance, Theatre & Workshop',
    icon: '🎭',
    color: '#dc2626',
    description: 'Fully equipped rehearsal rooms for dance companies, theatre casts, and creative workshops.',
    longDesc: 'Three dedicated rehearsal areas — a dance studio with sprung floor and mirrors, a black box theatre rehearsal space with flexible staging, and a creative workshop room for smaller groups and readings.',
    gallery: [],
    equipment: ['Sprung hardwood floor', 'Full mirror walls', 'Barre system', 'PA system', 'Flexible stage blocks', 'Piano (upright)', 'Workshop chairs & tables'],
    packages: [
      { name: 'Dance Studio (2hrs)',     price: 25000,  includes: ['Space + sound system'] },
      { name: 'Theatre Rehearsal (4hrs)', price: 40000,  includes: ['Black box + staging'] },
      { name: 'Workshop Room (full day)', price: 60000,  includes: ['Room + AV system + chairs'] },
    ],
  },
]

export const STUDIO_SERVICES = [
  'Photography Shoot', 'Film / Video Production', 'Music Video', 'Brand Content',
  'Album Recording', 'Single Recording', 'Music Production', 'Film Scoring',
  'Podcast Recording', 'Sound Design', 'Dance Rehearsal', 'Theatre Rehearsal',
  'Workshop / Masterclass', 'Voiceover Recording',
]
