// ============================================================
// SEED DATA — Frontend
// ============================================================
// This is the same data used by the backend, duplicated here so
// the frontend can render immediately while the API loads.
// In production, all data comes from the API.
// ============================================================

export const cities = [
  {
    _id: 'city-001',
    name: 'Mumbai',
    description: 'India\'s financial capital. Fast-paced lifestyle, Bollywood, iconic landmarks, diverse career opportunities.',
    image: '/images/mumbai.png',
    costOfLiving: { rent: 25000, food: 8000, transport: 3000, overall: 'High' },
    transport: ['Mumbai Metro', 'Local Trains', 'BEST Buses', 'Auto Rickshaws', 'Taxis', 'Ola/Uber'],
    famousAreas: [
      { name: 'Bandra', description: 'Trendy suburb with cafes, boutiques, and Bollywood celebrity homes.' },
      { name: 'Andheri', description: 'Major commercial hub with excellent connectivity and nightlife.' },
      { name: 'Powai', description: 'IT hub near IIT Bombay with modern apartments and lake views.' },
      { name: 'South Mumbai', description: 'Heritage area with colonial architecture, Marine Drive, and upscale living.' },
    ],
    hospitals: ['Lilavati Hospital', 'Kokilaben Hospital', 'Hinduja Hospital', 'Tata Memorial Hospital'],
    schools: ['Dhirubhai Ambani International School', 'Cathedral School', 'Podar International School'],
    lifestyle: 'Fast-paced metropolitan lifestyle with a blend of traditional and modern culture.',
    population: '20.7 Million',
  },
  {
    _id: 'city-002',
    name: 'Bangalore',
    description: 'Silicon Valley of India. Pleasant weather, thriving startup ecosystem, beautiful parks, vibrant pub culture.',
    image: '/images/bangalore.png',
    costOfLiving: { rent: 20000, food: 7000, transport: 2500, overall: 'Medium' },
    transport: ['Namma Metro', 'BMTC Buses', 'Auto Rickshaws', 'Ola/Uber', 'Rapido Bikes'],
    famousAreas: [
      { name: 'Koramangala', description: 'Startup hub with trendy restaurants, cafes, and co-working spaces.' },
      { name: 'Indiranagar', description: 'Upscale residential area famous for 100 Feet Road and nightlife.' },
      { name: 'Whitefield', description: 'Major IT corridor with tech parks and modern residential complexes.' },
      { name: 'HSR Layout', description: 'Popular with young professionals, known for its parks and eateries.' },
    ],
    hospitals: ['Manipal Hospital', 'Apollo Hospital', 'Narayana Health', 'Fortis Hospital'],
    schools: ['Bishop Cotton School', 'National Public School', 'Delhi Public School'],
    lifestyle: 'Laid-back yet dynamic tech culture. Great weather, craft beer scene.',
    population: '12.3 Million',
  },
  {
    _id: 'city-003',
    name: 'Delhi',
    description: 'India\'s capital blending Mughal heritage with modern infrastructure. Iconic monuments, world-class metro.',
    image: '/images/delhi.png',
    costOfLiving: { rent: 18000, food: 6000, transport: 2000, overall: 'Medium' },
    transport: ['Delhi Metro', 'DTC Buses', 'Auto Rickshaws', 'Cycle Rickshaws', 'Ola/Uber'],
    famousAreas: [
      { name: 'South Delhi', description: 'Upscale area with malls, premium restaurants, and green spaces.' },
      { name: 'Connaught Place', description: 'Iconic commercial center with colonial architecture and shopping.' },
      { name: 'Dwarka', description: 'Well-planned residential area with metro connectivity and modern amenities.' },
      { name: 'Noida', description: 'NCR satellite city with IT companies, malls, and affordable housing.' },
    ],
    hospitals: ['AIIMS', 'Max Hospital', 'Fortis Hospital', 'Apollo Hospital'],
    schools: ['Modern School', 'DPS RK Puram', 'Sanskriti School', 'Vasant Valley School'],
    lifestyle: 'Rich cultural heritage with street food paradise, historical monuments.',
    population: '16.8 Million',
  },
  {
    _id: 'city-004',
    name: 'Hyderabad',
    description: 'City of Pearls. Old-world charm meets modern tech growth. Famous for biryani and booming IT sector.',
    image: '/images/hyderabad.png',
    costOfLiving: { rent: 15000, food: 5500, transport: 2000, overall: 'Low' },
    transport: ['Hyderabad Metro', 'TSRTC Buses', 'Auto Rickshaws', 'Ola/Uber'],
    famousAreas: [
      { name: 'HITEC City', description: 'Major IT hub with tech parks, malls, and modern apartments.' },
      { name: 'Gachibowli', description: 'Growing IT corridor near Financial District with premium living.' },
      { name: 'Banjara Hills', description: 'Upscale area with restaurants, boutiques, and luxury living.' },
      { name: 'Jubilee Hills', description: 'Posh residential area popular with celebrities and business leaders.' },
    ],
    hospitals: ['Apollo Hospital', 'KIMS Hospital', 'Yashoda Hospital', 'AIG Hospital'],
    schools: ['Chirec International School', 'Oakridge International', 'Hyderabad Public School'],
    lifestyle: 'Relaxed pace with legendary cuisine, historic sites, and growing cosmopolitan culture.',
    population: '10.5 Million',
  },
  {
    _id: 'city-005',
    name: 'Pune',
    description: 'Oxford of the East. Prestigious educational institutions, pleasant climate, growing IT industry.',
    image: '/images/pune.png',
    costOfLiving: { rent: 14000, food: 5000, transport: 1800, overall: 'Low' },
    transport: ['Pune Metro', 'PMPML Buses', 'Auto Rickshaws', 'Ola/Uber'],
    famousAreas: [
      { name: 'Koregaon Park', description: 'Upscale area with cafes, bars, Osho Ashram, and expat community.' },
      { name: 'Hinjewadi', description: 'IT hub with Rajiv Gandhi Infotech Park and tech campuses.' },
      { name: 'Kothrud', description: 'Well-developed residential area with good schools and connectivity.' },
      { name: 'Viman Nagar', description: 'Modern area near airport with malls, restaurants, and apartments.' },
    ],
    hospitals: ['Ruby Hall Clinic', 'Sahyadri Hospital', 'KEM Hospital', 'Jehangir Hospital'],
    schools: ['Symbiosis International School', 'The Bishops School', 'DPS Pune'],
    lifestyle: 'Student-friendly city with vibrant cultural scene, trekking spots, and cafe culture.',
    population: '7.4 Million',
  },
  {
    _id: 'city-006',
    name: 'Chennai',
    description: 'Gateway to South India. Rich cultural heritage, classical arts, beautiful beaches, automobile industry.',
    image: '/images/chennai.png',
    costOfLiving: { rent: 16000, food: 5500, transport: 2000, overall: 'Medium' },
    transport: ['Chennai Metro', 'MTC Buses', 'Suburban Trains', 'Auto Rickshaws', 'Ola/Uber'],
    famousAreas: [
      { name: 'Adyar', description: 'Green residential area near the coast with IIT Madras nearby.' },
      { name: 'T. Nagar', description: 'Famous shopping district with traditional silk sarees and gold.' },
      { name: 'OMR (IT Corridor)', description: 'IT hub with tech parks, apartments, and modern infrastructure.' },
      { name: 'Anna Nagar', description: 'Well-planned residential area with parks, schools, and hospitals.' },
    ],
    hospitals: ['Apollo Hospital', 'MIOT Hospital', 'Fortis Malar Hospital', 'Sri Ramachandra Hospital'],
    schools: ['DAV School', 'Padma Seshadri School', 'Chettinad Vidyashram'],
    lifestyle: 'Traditional South Indian culture with classical music, Marina Beach, and filter coffee.',
    population: '10.9 Million',
  },
];

export const listings = [
  { _id: 'listing-001', title: 'Sunrise Luxury Apartments', category: 'housing', city: 'Mumbai', location: 'Bandra West, Mumbai', description: 'Modern 2BHK apartments with sea-facing balcony, gym, swimming pool, and 24/7 security.', contact: { phone: '7272841234', email: 'sunrise@housing.com', website: 'https://sunrise-apts.com' }, rating: 4.5, reviewCount: 12, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600', price: '₹35,000/month', verified: true },
  { _id: 'listing-002', title: 'Green Valley PG', category: 'housing', city: 'Bangalore', location: 'Koramangala 5th Block, Bangalore', description: 'Fully furnished PG with AC rooms, meals included, WiFi, laundry service.', contact: { phone: '7272841234', email: 'greenvalley@pg.com' }, rating: 4.2, reviewCount: 28, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600', price: '₹12,000/month', verified: true },
  { _id: 'listing-003', title: 'Royal Residency Flats', category: 'housing', city: 'Delhi', location: 'Dwarka Sector 21, Delhi', description: '3BHK spacious flats with modular kitchen, parking, power backup.', contact: { phone: '7272841234', email: 'royal@residency.com' }, rating: 4.0, reviewCount: 15, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600', price: '₹22,000/month', verified: true },
  { _id: 'listing-004', title: 'Cyber Towers Living', category: 'housing', city: 'Hyderabad', location: 'HITEC City, Hyderabad', description: 'Modern studio and 1BHK apartments near HITEC City tech parks.', contact: { phone: '7272841234', email: 'cyber@towers.com' }, rating: 4.3, reviewCount: 19, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600', price: '₹18,000/month', verified: true },
  { _id: 'listing-005', title: 'Heritage Homes Pune', category: 'housing', city: 'Pune', location: 'Koregaon Park, Pune', description: 'Beautiful 2BHK in the heart of Koregaon Park with modern amenities.', contact: { phone: '7272841234', email: 'heritage@homes.com' }, rating: 4.6, reviewCount: 22, image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600', price: '₹16,000/month', verified: true },
  { _id: 'listing-006', title: 'Marina Bay Apartments', category: 'housing', city: 'Chennai', location: 'Adyar, Chennai', description: 'Spacious 2BHK near Adyar Estuary with beach views.', contact: { phone: '7272841234', email: 'marina@apts.com' }, rating: 4.1, reviewCount: 10, image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600', price: '₹20,000/month', verified: false },
  { _id: 'listing-007', title: 'Skyline Co-living', category: 'housing', city: 'Mumbai', location: 'Powai, Mumbai', description: 'Premium co-living with private rooms, gaming room, gym, and rooftop terrace.', contact: { phone: '7272841234', email: 'skyline@coliving.com' }, rating: 4.7, reviewCount: 35, image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600', price: '₹15,000/month', verified: true },
  { _id: 'listing-008', title: 'Whitefield Studio Homes', category: 'housing', city: 'Bangalore', location: 'Whitefield, Bangalore', description: 'Compact studios near ITPL and major tech campuses.', contact: { phone: '7272841234', email: 'whitefield@studios.com' }, rating: 3.9, reviewCount: 14, image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=600', price: '₹10,000/month', verified: true },
  { _id: 'listing-009', title: 'Delhi Public School', category: 'school', city: 'Bangalore', location: 'Sarjapur Road, Bangalore', description: 'CBSE affiliated school with state-of-the-art campus, smart classrooms.', contact: { phone: '7272841234', email: 'admission@dpsbangalore.com' }, rating: 4.4, reviewCount: 45, image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600', price: '₹1,50,000/year', verified: true },
  { _id: 'listing-010', title: 'Ryan International School', category: 'school', city: 'Mumbai', location: 'Kandivali, Mumbai', description: 'ICSE board school with modern infrastructure, sports grounds.', contact: { phone: '7272841234', email: 'info@ryanmumbai.com' }, rating: 4.1, reviewCount: 32, image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600', price: '₹1,20,000/year', verified: true },
  { _id: 'listing-011', title: 'Oakridge International School', category: 'school', city: 'Hyderabad', location: 'Gachibowli, Hyderabad', description: 'IB World School with global exposure, robotics lab, sports academy.', contact: { phone: '7272841234', email: 'admissions@oakridge.in' }, rating: 4.6, reviewCount: 38, image: 'https://images.unsplash.com/photo-1613896527026-f195d5c818ed?w=600', price: '₹3,00,000/year', verified: true },
  { _id: 'listing-012', title: 'Symbiosis International School', category: 'school', city: 'Pune', location: 'Viman Nagar, Pune', description: 'Progressive IB school with innovative teaching, green campus.', contact: { phone: '7272841234', email: 'info@symbiosis-school.com' }, rating: 4.5, reviewCount: 29, image: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=600', price: '₹2,00,000/year', verified: true },
  { _id: 'listing-013', title: 'Modern Public School', category: 'school', city: 'Delhi', location: 'Shalimar Bagh, Delhi', description: 'CBSE school with 30+ years of excellence, digital learning.', contact: { phone: '7272841234', email: 'office@modernpublic.com' }, rating: 4.0, reviewCount: 55, image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600', price: '₹90,000/year', verified: true },
  { _id: 'listing-014', title: 'Chettinad Vidyashram', category: 'school', city: 'Chennai', location: 'RA Puram, Chennai', description: 'Top Chennai CBSE school with cultural programs and Bharatanatyam.', contact: { phone: '7272841234', email: 'info@chettinad.edu' }, rating: 4.3, reviewCount: 41, image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600', price: '₹1,10,000/year', verified: true },
  { _id: 'listing-015', title: 'Apollo Hospital', category: 'hospital', city: 'Chennai', location: 'Greams Road, Chennai', description: 'India\'s leading multi-specialty hospital with 60+ specialties.', contact: { phone: '7272841234', email: 'info@apollochennai.com' }, rating: 4.7, reviewCount: 120, image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600', price: 'Consultation: ₹800-2000', verified: true },
  { _id: 'listing-016', title: 'Manipal Hospital', category: 'hospital', city: 'Bangalore', location: 'HAL Airport Road, Bangalore', description: 'Premier multi-specialty with 600+ beds, organ transplants.', contact: { phone: '7272841234', email: 'info@manipalhospital.com' }, rating: 4.5, reviewCount: 89, image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600', price: 'Consultation: ₹600-1500', verified: true },
  { _id: 'listing-017', title: 'Kokilaben Hospital', category: 'hospital', city: 'Mumbai', location: 'Andheri West, Mumbai', description: 'State-of-the-art hospital with advanced cancer and cardiac care.', contact: { phone: '7272841234', email: 'info@kokilabenhospital.com' }, rating: 4.8, reviewCount: 95, image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600', price: 'Consultation: ₹1000-2500', verified: true },
  { _id: 'listing-018', title: 'AIIMS Delhi', category: 'hospital', city: 'Delhi', location: 'Ansari Nagar, Delhi', description: 'India\'s premier government hospital with affordable world-class healthcare.', contact: { phone: '7272841234', email: 'info@aiims.edu' }, rating: 4.4, reviewCount: 200, image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600', price: 'Consultation: ₹10-250', verified: true },
  { _id: 'listing-019', title: 'KIMS Hospital', category: 'hospital', city: 'Hyderabad', location: 'Secunderabad, Hyderabad', description: 'Multi-specialty with 1000+ beds and 40+ specialties.', contact: { phone: '7272841234', email: 'info@kimshospitals.com' }, rating: 4.3, reviewCount: 67, image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600', price: 'Consultation: ₹500-1200', verified: true },
  { _id: 'listing-020', title: 'Ruby Hall Clinic', category: 'hospital', city: 'Pune', location: 'Sassoon Road, Pune', description: 'Pune\'s oldest and most trusted multi-specialty hospital.', contact: { phone: '7272841234', email: 'info@rubyhall.com' }, rating: 4.2, reviewCount: 78, image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600', price: 'Consultation: ₹500-1000', verified: true },
];

export const categories = [
  { id: 'housing', name: 'Housing', icon: '🏠', description: 'Find apartments, PGs, co-living spaces', count: 8 },
  { id: 'school', name: 'Schools', icon: '🎓', description: 'Discover top schools and colleges', count: 6 },
  { id: 'hospital', name: 'Hospitals', icon: '🏥', description: 'Find hospitals and healthcare providers', count: 10 },
];

export const testimonials = [
  { name: 'Rahul Sharma', city: 'Mumbai → Bangalore', text: 'ReloCity made my move from Mumbai to Bangalore so much easier! Found a great PG in Koramangala within days.', rating: 5 },
  { name: 'Priya Patel', city: 'Delhi → Hyderabad', text: 'The city guides were incredibly helpful. I knew exactly which areas to look for housing before I even arrived.', rating: 5 },
  { name: 'Amit Kumar', city: 'Chennai → Pune', text: 'Found an amazing school for my kids and a great apartment, all through ReloCity. Highly recommended!', rating: 4 },
];
