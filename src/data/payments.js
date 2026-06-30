export const PAYMENT_TYPES = ['Tickets', 'Studio Booking', 'Equipment Rental', 'Costume Rental', 'Creative Project', 'Audio Services']

export const MOCK_PAYMENTS = [
  { id:'PAY-001', ref:'HAP-882741', type:'Tickets', description:'2x Premium — 1960 The Musical', amount:50000, method:'Paystack', status:'success', date:'2026-06-20' },
  { id:'PAY-002', ref:'HAP-STU-9921', type:'Studio Booking', description:'H.ART Visual Studio — Full Day', amount:200000, method:'Flutterwave', status:'success', date:'2026-06-15' },
  { id:'PAY-003', ref:'HAP-119023', type:'Tickets', description:'1x Regular — Echoes of the Motherland', amount:10000, method:'Paystack', status:'success', date:'2026-06-10' },
  { id:'PAY-004', ref:'HAP-RNT-4432', type:'Equipment Rental', description:'RED Komodo 6K — 3 days (50% deposit)', amount:120000, method:'Bank Transfer', status:'pending', date:'2026-06-08' },
  { id:'PAY-005', ref:'HAP-STU-7701', type:'Studio Booking', description:'H.ART Audio Studio — Recording Session', amount:80000, method:'Paystack', status:'success', date:'2026-05-10' },
]
