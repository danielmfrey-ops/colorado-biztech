
import { 
  Mountain, 
  Cpu, 
  Newspaper, 
  Mic, 
  GraduationCap, 
  TrendingUp, 
  Mail, 
  Menu, 
  X, 
  ArrowRight, 
  Building2, 
  Rocket,
  Search,
  Twitter,
  Linkedin,
  Globe
} from 'lucide-react';

export const NAV_LINKS = [
  { id: '/', label: 'Home' },
  { id: '/biztech100', label: 'BizTech 100' },
  { id: '/news', label: 'News & Analysis' },
  { id: '/resources', label: 'Resources' },
  { id: '/roadmap', label: 'Roadmap' },
];

export const NEWS_ARTICLES = [
  {
    id: 0,
    category: 'Breaking News',
    title: "Colorado's Grid Infrastructure Crisis: Compete Now or Lose Forever",
    excerpt: 'Why political, utility, energy, and business leaders must unite behind aggressive renewable grid investment. Colorado stands at an economic precipice—fail to build the grid for data centers, and Colorado forfeits the semiconductor fabs, battery factories, and advanced aerospace manufacturing that could anchor our economy for generations.',
    author: 'Dan Frey',
    date: 'Jan 12, 2026',
    readTime: '12 min read',
    image: 'bg-red-900',
    featured: true,
    pdfUrl: '/downloads/colorado-grid-infrastructure-crisis.pdf'
  },
  {
    id: 1,
    category: 'Energy',
    title: "ERCOT's Renewable Energy Transformation: What the Data Actually Shows",
    excerpt: 'Despite political rhetoric about gas and nuclear, Texas proves the overwhelming economic case for solar and battery storage. Solar, wind, and battery storage represent approximately 96% of all new capacity additions in ERCOT from 2020-2030.',
    author: 'Dan Frey',
    date: 'Jan 13, 2026',
    readTime: '10 min read',
    image: 'bg-amber-900',
    pdfUrl: '/downloads/ercot-renewable-transformation.pdf'
  },
  {
    id: 2,
    category: 'Energy',
    title: 'Colorado Can Learn From Ten Years of Grid and Resource Growth in Texas',
    excerpt: "ERCOT's competitive market drove a boom in wind, solar and batteries that now dominates new capacity. Colorado's regulators and utilities should take note: investing aggressively in renewables and storage offers a proven path to meet rising demand.",
    author: 'Dan Frey',
    date: 'Jan 13, 2026',
    readTime: '5 min read',
    image: 'bg-green-900',
    pdfUrl: '/downloads/colorado-learns-from-texas-grid.pdf'
  },
  {
    id: 3,
    category: 'Quantum',
    title: 'Colorado Quantum Incubator Embarks on Next 5 Years of Pioneering Tech',
    excerpt: 'The hub ramps up quantum innovation and community engagement, advancing research with Mesa Quantum and Atom Computing in the $300M national competition.',
    author: 'BizTech Research',
    date: 'Nov 17, 2025',
    readTime: '4 min read',
    image: 'bg-blue-900'
  },
  {
    id: 4,
    category: 'Space',
    title: 'York Space Systems Prepares for IPO in Denver',
    excerpt: 'Signaling continued growth in Colorado\'s aerospace sector, York Space moves toward public markets as the state maintains its $4B+ contract leadership.',
    author: 'BizTech Research',
    date: 'Nov 18, 2025',
    readTime: '6 min read',
    image: 'bg-indigo-900'
  },
  {
    id: 5,
    category: 'Biotech',
    title: 'CU Anschutz and BioScience Institute Secure $1M NSF Grant',
    excerpt: 'Expanding life sciences workforce pathways and bridging education with industry as part of the 2025 Health Impact Hub campaign.',
    author: 'BizTech Research',
    date: 'Oct 30, 2025',
    readTime: '5 min read',
    image: 'bg-emerald-900'
  },
  {
    id: 6,
    category: 'High Tech',
    title: 'Colorado Tech Report Highlights National Leadership',
    excerpt: 'CTA\'s Tech Industry Report predicts 5 years of continued growth, with 3,000 new tech jobs added and Denver ranking in top 10 North American talent markets.',
    author: 'BizTech Research',
    date: 'Feb 21, 2025',
    readTime: '4 min read',
    image: 'bg-slate-800'
  }
];

export const INTERVIEWS = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    role: 'CEO, AtomTCAD',
    location: 'Boulder, CO',
    quote: "Boulder has something unique—the density of quantum talent from NIST and JILA creates an unmatched pipeline for commercialization.",
    title: 'Commercializing Quantum: From JILA to Market',
    image: 'bg-slate-700'
  },
  {
    id: 2,
    name: 'Marcus Thorne',
    role: 'Founder, Peak Defense Systems',
    location: 'Colorado Springs, CO',
    quote: "Proximity to Space Command and the Air Force Academy makes this the only logical place for next-gen defense tech and cybersecurity.",
    title: 'The Defense Tech Pipeline: Colorado Springs to the Pentagon',
    image: 'bg-slate-600'
  }
];

export const RESEARCH_HUBS = [
  {
    id: 'nist',
    name: 'NIST Boulder',
    focus: ['Quantum Standards', 'Precision Timing', 'Laser Physics'],
    location: 'Boulder',
    color: 'text-indigo-400',
    description: 'Federal lab setting global standards for time, frequency, and quantum measurement. Home to multiple Nobel laureates.'
  },
  {
    id: 'cu',
    name: 'University of Colorado (JILA)',
    focus: ['Quantum Physics', 'Atomic Clocks', 'Bose-Einstein Condensates'],
    location: 'Boulder',
    color: 'text-yellow-400',
    description: 'Joint institute between CU and NIST. World-renowned for quantum research and NASA aerospace partnerships.'
  },
  {
    id: 'nrel',
    name: 'NREL (Dept. of Energy)',
    focus: ['Clean Energy', 'Grid Modernization', 'Hydrogen'],
    location: 'Golden',
    color: 'text-green-400',
    description: 'The primary national laboratory for renewable energy and energy efficiency research and development.'
  },
  {
    id: 'mines',
    name: 'Colorado School of Mines',
    focus: ['Space Resources', 'Robotics', 'Subsurface Tech'],
    location: 'Golden',
    color: 'text-blue-400',
    description: 'Pioneering space mining, autonomous underground systems, and critical minerals research.'
  },
  {
    id: 'csu',
    name: 'Colorado State University',
    focus: ['AgTech', 'Veterinary Biotech', 'Infectious Disease'],
    location: 'Fort Collins',
    color: 'text-green-400',
    description: 'Leading research in agricultural biotechnology and veterinary medicine with biosecurity applications.'
  },
  {
    id: 'spacecom',
    name: 'U.S. Space Command',
    focus: ['Space Operations', 'Satellite Defense', 'GPS'],
    location: 'Colorado Springs',
    color: 'text-blue-400',
    description: 'Headquarters for unified combatant command for space operations, attracting major defense contractors.'
  },
  {
    id: 'noaa',
    name: 'NOAA (David Skaggs Center)',
    focus: ['Climate Data', 'Weather Modeling', 'Atmospheric Science'],
    location: 'Boulder',
    color: 'text-cyan-400',
    description: 'Global leader in earth system research, weather prediction, and environmental data science.'
  },
  {
    id: 'fitzsimons',
    name: 'Fitzsimons Innovation Campus',
    focus: ['Biotech', 'Medical Devices', 'Pharmaceuticals'],
    location: 'Aurora',
    color: 'text-purple-400',
    description: 'Colorado bioscience hub connecting CU Anschutz Medical Campus with biotech startups and accelerators.'
  },
  {
    id: 'anschutz',
    name: 'CU Anschutz Medical Campus',
    focus: ['Life Sciences Workforce', 'Biotech Innovation', 'Medical Research'],
    location: 'Aurora',
    color: 'text-rose-400',
    description: 'Colorado\'s academic health sciences center, expanding life sciences pathways with $1M NSF grants and 2025 Health Impact Hub initiatives.'
  }
];

export const FUNDING_ROUNDS = [
  { company: 'OrbitFab', round: 'Series B', amount: '$28M', lead: '8090 Industries', date: 'Oct 2025' },
  { company: 'AtomTCAD', round: 'Series A', amount: '$12M', lead: 'Foundry Group', date: 'Sep 2025' },
  { company: 'Sierra Space', round: 'Series F', amount: '$290M', lead: 'General Atlantic', date: 'Sep 2025' },
  { company: 'Umoja Biopharma', round: 'Series C', amount: '$53M', lead: 'MPM Capital', date: 'Aug 2025' },
  { company: 'Honeybee Robotics', round: 'Acquisition', amount: 'Undisclosed', lead: 'Blue Origin', date: 'Aug 2025' },
];

export const BIZTECH_100_TOP_20 = [
  {
    rank: 1,
    name: 'Lockheed Martin',
    hqType: 'hub',
    score: 98,
    sector: 'Space',
    city: 'Littleton',
    description: 'Aerospace and defense technology leader with ~3,500 tech employees in Colorado (>14,000 total CO). Major hub for satellite systems, space exploration, and national security programs.',
    employees: '~3,500 tech',
    funding: 'Public (NYSE: LMT)',
    website: 'https://lockheedmartin.com'
  },
  {
    rank: 2,
    name: 'Amazon (AWS)',
    hqType: 'hub',
    score: 95,
    sector: 'Software',
    city: 'Denver',
    description: 'Major Colorado hub for AWS cloud infrastructure with ~2,500 tech employees (~20,000 total CO). Significant engineering presence connecting Colorado to global tech networks.',
    employees: '~2,500 tech',
    funding: 'Public (NASDAQ: AMZN)',
    website: 'https://aws.amazon.com'
  },
  {
    rank: 3,
    name: 'Google',
    hqType: 'hub',
    score: 92,
    sector: 'Software',
    city: 'Boulder',
    description: 'Major engineering campus with ~2,000 tech employees. Boulder is the birthplace of Kubernetes. Strategic Colorado operations bringing world-class engineering talent.',
    employees: '~2,000 tech',
    funding: 'Public (NASDAQ: GOOGL)',
    website: 'https://google.com'
  },
  {
    rank: 4,
    name: 'Raytheon Technologies',
    hqType: 'hub',
    score: 90,
    sector: 'Space',
    city: 'Aurora',
    description: 'Aerospace and defense technology company with ~1,800 tech employees in Colorado. Major hub for defense systems and advanced technology development.',
    employees: '~1,800 tech',
    funding: 'Public (NYSE: RTX)',
    website: 'https://rtx.com'
  },
  {
    rank: 5,
    name: 'Oracle',
    hqType: 'hub',
    score: 88,
    sector: 'Software',
    city: 'Broomfield',
    description: 'Enterprise software leader with ~1,500 tech employees at the Broomfield campus. Major hub for cloud infrastructure and database technology.',
    employees: '~1,500 tech',
    funding: 'Public (NYSE: ORCL)',
    website: 'https://oracle.com'
  },
  {
    rank: 6,
    name: 'BAE Space & Mission Systems',
    hqType: 'hq',
    score: 86,
    sector: 'Space',
    city: 'Boulder',
    description: 'Colorado-headquartered space systems company (formerly Ball Aerospace, acquired 2024) with ~1,200 tech employees. Pioneer in space technology and Earth observation systems.',
    employees: '~1,200 tech',
    funding: 'Public (LON: BA)',
    website: 'https://baesystems.com'
  },
  {
    rank: 7,
    name: 'Microsoft',
    hqType: 'hub',
    score: 84,
    sector: 'Software',
    city: 'Denver',
    description: 'Major Colorado hub with ~1,000 tech employees for cloud infrastructure and enterprise software development. Key contributor to Colorado\'s tech talent pipeline.',
    employees: '~1,000 tech',
    funding: 'Public (NASDAQ: MSFT)',
    website: 'https://microsoft.com'
  },
  {
    rank: 8,
    name: 'Workday',
    hqType: 'hub',
    score: 82,
    sector: 'Software',
    city: 'Boulder',
    description: 'Enterprise SaaS for finance and HR with ~1,000 tech employees. Major Colorado hub with 22% CAGR growth, demonstrating strong expansion in the state.',
    employees: '~1,000 tech',
    funding: 'Public (NASDAQ: WDAY)',
    website: 'https://workday.com'
  },
  {
    rank: 9,
    name: 'Dish Wireless',
    hqType: 'hq',
    score: 80,
    sector: 'Telecom',
    city: 'Englewood',
    description: 'Colorado-headquartered telecommunications and 5G network provider with ~1,000 tech employees. Building America\'s first standalone 5G network.',
    employees: '~1,000 tech',
    funding: 'Public (NASDAQ: DISH)',
    website: 'https://dish.com'
  },
  {
    rank: 10,
    name: 'Palantir Technologies',
    hqType: 'hq',
    score: 78,
    sector: 'AI',
    city: 'Denver',
    description: 'Colorado-headquartered data analytics and AI platform with ~800 tech employees and 45% CAGR. Relocated global HQ to Denver in 2020, now valued at ~$430B.',
    employees: '~800 tech',
    funding: 'Public (NYSE: PLTR)',
    website: 'https://palantir.com'
  },
  {
    rank: 11,
    name: 'Ibotta',
    hqType: 'hq',
    score: 75,
    sector: 'Fintech',
    city: 'Denver',
    description: 'Cash-back rewards and digital promotions platform. Denver-headquartered with successful 2024 IPO, validating Colorado\'s ability to grow companies from inception through public markets.',
    employees: '1,000+',
    funding: 'Public (NYSE: IBTA)',
    website: 'https://ibotta.com'
  },
  {
    rank: 12,
    name: 'Fivetran',
    hqType: 'hub',
    score: 75,
    sector: 'Software',
    city: 'Denver',
    description: 'Automated data integration platform for analytics. Major Colorado hub with significant engineering presence supporting enterprise data infrastructure.',
    employees: '600+',
    funding: '$730M raised',
    website: 'https://fivetran.com'
  },
  {
    rank: 13,
    name: 'DISH Network',
    hqType: 'hq',
    score: 75,
    sector: 'Telecom',
    city: 'Englewood',
    description: 'Satellite television and 5G network provider. Long-standing Colorado headquarters providing stability, jobs, and institutional commitment to the state\'s tech ecosystem.',
    employees: '6,000+',
    funding: 'Public (NASDAQ: DISH)',
    website: 'https://dish.com'
  },
  {
    rank: 14,
    name: 'Comcast Colorado',
    hqType: 'ops',
    score: 75,
    sector: 'Telecom',
    city: 'Denver',
    description: 'Telecommunications and media company. Significant Colorado operations supporting network infrastructure and technology services across the region.',
    employees: '3,000+',
    funding: 'Public (NASDAQ: CMCSA)',
    website: 'https://comcast.com'
  },
  {
    rank: 15,
    name: 'CSG Systems',
    hqType: 'hq',
    score: 69,
    sector: 'Software',
    city: 'Omaha',
    description: 'Revenue management and customer engagement solutions. Colorado-headquartered enterprise software company serving communications and media industries globally.',
    employees: '1,200+',
    funding: 'Public (NASDAQ: CSGS)',
    website: 'https://csgi.com'
  },
  {
    rank: 16,
    name: 'Red Canary',
    hqType: 'hq',
    score: 69,
    sector: 'Cybersecurity',
    city: 'Denver',
    description: 'Managed detection and response cybersecurity platform. Denver-headquartered, protecting organizations with 24/7 threat monitoring and security operations.',
    employees: '600+',
    funding: '$125M raised',
    website: 'https://redcanary.com'
  },
  {
    rank: 17,
    name: 'Zayo Group',
    hqType: 'hq',
    score: 69,
    sector: 'Telecom',
    city: 'Boulder',
    description: 'Global fiber network and communications infrastructure provider. Boulder-headquartered with extensive fiber assets supporting enterprise and carrier connectivity.',
    employees: '2,500+',
    funding: 'Private (Digital Colony)',
    website: 'https://zayo.com'
  },
  {
    rank: 18,
    name: 'Quantinuum',
    hqType: 'hq',
    score: 69,
    sector: 'Quantum',
    city: 'Broomfield',
    description: 'Integrated quantum computing company formed from Honeywell Quantum Solutions. Colorado-headquartered, advancing quantum hardware and software at commercial scale.',
    employees: '500+',
    funding: '$625M raised',
    website: 'https://quantinuum.com'
  },
  {
    rank: 19,
    name: 'Boom Supersonic',
    hqType: 'hq',
    score: 69,
    sector: 'Space',
    city: 'Denver',
    description: 'Developing Overture, a sustainable supersonic passenger aircraft. Denver-headquartered with 100% annual hypergrowth, pioneering next-generation aviation technology.',
    employees: '700+',
    funding: '$700M raised',
    website: 'https://boomsupersonic.com'
  },
  {
    rank: 20,
    name: 'Ping Identity',
    hqType: 'hq',
    score: 69,
    sector: 'Cybersecurity',
    city: 'Denver',
    description: 'Enterprise identity security and access management. Denver-headquartered, providing secure digital experiences for the world\'s largest organizations.',
    employees: '1,500+',
    funding: 'Private (Thoma Bravo)',
    website: 'https://pingidentity.com'
  }
];
