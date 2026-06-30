export const MOCK_REVIEWS = [
  { id:'rev-001', serviceType:'production', serviceId:'prod-001', userId:'usr-001', userName:'Ada Okonkwo', rating:5, comment:'An absolutely breathtaking production. 1960 — The Musical brought me to tears. The staging, music and performances were world-class.', date:'2026-06-15', avatar:'AO' },
  { id:'rev-002', serviceType:'studio', serviceId:'visual', userId:'usr-002', userName:'Emeka Films Ltd', rating:5, comment:'The Visual Studio is exceptional. Every piece of equipment works perfectly and the support team is professional and knowledgeable.', date:'2026-06-10', avatar:'EF' },
  { id:'rev-003', serviceType:'creative', serviceId:'cr-001', userId:'usr-003', userName:'Stella Obi', rating:5, comment:'Working with Amaka was a masterclass. Her vision elevated our project beyond what we imagined. Highly recommend.', date:'2026-05-28', avatar:'SO' },
  { id:'rev-004', serviceType:'studio', serviceId:'audio', userId:'usr-004', userName:'KelechiBeats', rating:4, comment:'The audio studio has incredible gear — the SSL console alone makes it worth every naira. Great engineers too.', date:'2026-05-20', avatar:'KB' },
  { id:'rev-005', serviceType:'production', serviceId:'prod-003', userId:'usr-005', userName:'Funke Adeyemi', rating:5, comment:'Drums of Sankofa was a spiritual experience. The music, movement and storytelling connected deeply with our cultural identity.', date:'2026-04-05', avatar:'FA' },
  { id:'rev-006', serviceType:'rental', serviceId:'rent-001', userId:'usr-006', userName:'CineVision Films', rating:4, comment:'The RED Komodo kit arrived in perfect condition. Pickup and return was seamless. Will rent again.', date:'2026-06-01', avatar:'CV' },
]

export const getReviews = (serviceType, serviceId) =>
  MOCK_REVIEWS.filter(r => r.serviceType === serviceType && (!serviceId || r.serviceId === serviceId))

export const getAverageRating = (serviceType, serviceId) => {
  const reviews = getReviews(serviceType, serviceId)
  if (!reviews.length) return null
  return (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
}
