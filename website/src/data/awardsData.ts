export interface AcademicAward {
  id: string;
  title: string;
  conferringBody: string;
  year: number | string;
  category: 'Personal' | 'Institutional' | 'Government';
  description: string;
  significance?: string;
}

export const awardsList: AcademicAward[] = [
  {
    id: 'vc-award-2026',
    title: 'Outstanding Vice-Chancellor of India Award 2026',
    conferringBody: 'Indian Education Network during 15th India Education Summit 2025',
    year: '2026',
    category: 'Personal',
    description: 'Bestowed for transformative higher education leadership, visionary university governance, and substantial research advancements at DAV University.',
    significance: 'National Recognition'
  },
  {
    id: 'sports-lab-2026',
    title: 'Best Institution for Sports Laboratories and Research Facilities 2026',
    conferringBody: 'National Sports and Physical Education Awards 2026',
    year: '2026',
    category: 'Institutional',
    description: 'DAV University recognized nationally for setting up world-class sports biomechanics, exercise physiology, and athletic research laboratories under Dr. Manoj Kumar’s leadership.',
    significance: 'National Category Winner'
  },
  {
    id: 'sepc-research-2025',
    title: 'Education Excellence Award – Leading University in Research & Innovation',
    conferringBody: 'Service Export Promotion Council (SEPC), Ministry of Commerce & Industry, Govt. of India',
    year: '2025',
    category: 'Institutional',
    description: 'Awarded to DAV University for significant research output, high citation index, patents filed, and innovative academic programs.',
    significance: 'Union Ministry of Commerce'
  },
  {
    id: 'sepc-industry-2025',
    title: 'Education Excellence Award – Outstanding Industry-Academic Collaboration',
    conferringBody: 'Service Export Promotion Council (SEPC), Ministry of Commerce & Industry, Govt. of India',
    year: '2025',
    category: 'Institutional',
    description: 'Honored for building strategic multi-sector alliances with leading multinational corporations, research labs, and academic consortia.',
    significance: 'Union Ministry of Commerce'
  },
  {
    id: 'leap-london-2025',
    title: 'Industry-Academia Collaboration for Employability & Entrepreneurship of the Year at LEAP 2025',
    conferringBody: 'London School of Digital Business',
    year: '2025',
    category: 'Institutional',
    description: 'International recognition for student career readiness models, incubator support, and digital skill integration at DAV University.',
    significance: 'Global Award'
  },
  {
    id: 'vc-award-2025',
    title: 'Outstanding Vice-Chancellor of India Award 2025',
    conferringBody: 'Indian Education Network during India Education Summit-25',
    year: '2025',
    category: 'Personal',
    description: 'Recognized for exemplary university administration, NEP 2020 integration, and academic modernization.',
    significance: 'National Leadership Award'
  },
  {
    id: 'collegedunia-2024',
    title: 'Education Pioneer of the Year Award 2024',
    conferringBody: 'Collegedunia Connect: An Education Summit (Collegedunia Excellence Awards)',
    year: '2024',
    category: 'Personal',
    description: 'Conferred for pioneering visionary pedagogies, research incubation, and modern university campus administration.',
    significance: 'Higher-Ed Pioneer'
  },
  {
    id: 'sepc-excellence-2024',
    title: 'Education Excellence Award 2024',
    conferringBody: 'Service Export Promotion Council (SEPC), Ministry of Commerce & Industry, Govt. of India',
    year: '2024',
    category: 'Personal',
    description: 'National award in recognition of outstanding personal contributions to higher education growth and internationalization.',
    significance: 'Government of India'
  },
  {
    id: 'reliance-2024',
    title: 'Excellence Awards in Education 2024',
    conferringBody: 'Reliance Animation Academy',
    year: '2024',
    category: 'Personal',
    description: 'Honored for spearheading creative, multidisciplinary, and media technology education programs.',
    significance: 'Industry Recognition'
  },
  {
    id: 'pfstc-service-2023',
    title: 'Award for Service to Society 2023',
    conferringBody: 'Punjab Forum for Science & Technology Communications',
    year: '2023',
    category: 'Personal',
    description: 'Conferred in recognition of exemplary dedication to fostering positive societal change, science communication, and community well-being.',
    significance: 'State / Regional Honor'
  },
  {
    id: 'digii100-2023',
    title: 'Top 100 Higher-Ed Pioneering Digital Transformation',
    conferringBody: 'Digii100',
    year: '2023',
    category: 'Institutional',
    description: 'DAV University ranked among the Top 100 higher education institutions across India leading digital campus transformation.',
    significance: 'National Ranking'
  },
  {
    id: 'assocham-values-2023',
    title: 'Strengthening Social Fabric with Values & Ethics-Based Education & Life-Skills',
    conferringBody: 'ASSOCHAM (Associated Chambers of Commerce and Industry of India)',
    year: '2023',
    category: 'Institutional',
    description: 'Recognized for institutionalizing holistic value systems, ethical leadership, and student mental well-being.',
    significance: 'Apex Chamber of Commerce'
  },
  {
    id: 'assocham-innovation-2022',
    title: 'Driving Innovation and Inspiring Minds through Industry-Academia Alliance',
    conferringBody: 'ASSOCHAM',
    year: '2022',
    category: 'Institutional',
    description: 'Awarded for establishing multi-disciplinary corporate incubation hubs and industry-sponsored research labs.',
    significance: 'Apex Chamber of Commerce'
  },
  {
    id: 'assocham-digital-2022',
    title: 'Digital Distinction: Technology Conformance to NEP 2020',
    conferringBody: 'ASSOCHAM',
    year: '2022',
    category: 'Institutional',
    description: 'Honored for rapid adoption of National Education Policy 2020 digital directives, LMS systems, and blended learning models.',
    significance: 'NEP Conformance Award'
  },
  {
    id: 'dist-admin-2018',
    title: 'District Administration Independence Day Medallion & Certificate of Merit',
    conferringBody: 'District Administration, Jalandhar, Govt. of Punjab',
    year: '2018',
    category: 'Government',
    description: 'Awarded by the District Collector / Administration on Independence Day 2018 for outstanding contribution to education and implementation of government skill initiatives.',
    significance: 'State Government Distinction'
  },
  {
    id: 'nitttr-2018',
    title: 'Outstanding Institution Award (Engineering Colleges)',
    conferringBody: 'National Institute of Technical Teachers Training and Research (NITTTR), Chandigarh',
    year: '2018',
    category: 'Institutional',
    description: 'Conferred to DAVIET Jalandhar under Dr. Manoj Kumar’s leadership as Principal, for benchmark academic results, faculty research, and student placements.',
    significance: 'National Apex Technical Body'
  },
  {
    id: 'lma-manager-2017',
    title: 'LMA – Dayanand Munjal Award for Manager of the Year 2017',
    conferringBody: 'Ludhiana Management Association (under AIMA) & Hero Cycles Ltd.',
    year: '2017',
    category: 'Personal',
    description: 'The most prestigious annual executive leadership award in Punjab, instituted in 1984 and sponsored by Hero Cycles Limited, honoring exceptional institutional management and innovation.',
    significance: 'Prestigious Regional Executive Honor'
  },
  {
    id: 'indus-2017',
    title: 'Award for Education Excellence',
    conferringBody: 'The Indus Foundation during Indo-Global Education Summit & Expo 2017',
    year: '2017',
    category: 'Institutional',
    description: 'Conferred to DAVIET for international academic benchmarks, research output, and student exchange initiatives.',
    significance: 'Indo-Global Honor'
  },
  {
    id: 'naac-a-2017',
    title: 'NAAC Grade ‘A’ Accreditation & UGC 2(f) Recognition',
    conferringBody: 'National Assessment and Accreditation Council (NAAC) & UGC',
    year: '2017',
    category: 'Institutional',
    description: 'Spearheaded DAVIET to achieve the coveted Grade "A" accreditation with stellar scores across teaching-learning, research, and governance.',
    significance: 'Highest Quality Benchmark'
  },
  {
    id: 'msme-host-2018',
    title: 'Host Institution (HI) / Business Incubator (BI) Status',
    conferringBody: 'Ministry of Micro, Small and Medium Enterprises (MSME), Govt. of India',
    year: '2018',
    category: 'Institutional',
    description: 'Conferred Host Institution status with funding up to Rs. 15 Lakh per innovative business idea and Rs. 62.5 Lakh overall incubator ceiling.',
    significance: 'Central Ministry Grant & Incubator'
  },
  {
    id: 'jewel-of-india-2006',
    title: 'Jewel of India Award',
    conferringBody: 'Indian Solidarity Council',
    year: '2006',
    category: 'Personal',
    description: 'Conferred for outstanding individual achievement and distinguished service to the nation in technical education and research.',
    significance: 'National Civic Honor'
  },
  {
    id: 'best-pi-coordinator',
    title: 'Best PI Coordinator Award',
    conferringBody: 'Secretary, Department of Electronics (D.O.E.), Govt. of India / World Bank / Swiss Development Co-operation',
    year: '2001',
    category: 'Government',
    description: 'Awarded for exemplary project coordination under the IMPACT/SSS national project sponsored by GOI, World Bank, and Swiss Development Co-operation.',
    significance: 'World Bank / Govt. of India'
  },
  {
    id: 'mtech-silver-medal',
    title: 'University Silver Medal (M.Tech. ECE)',
    conferringBody: 'Punjab Technical University, Jalandhar',
    year: '2001',
    category: 'Personal',
    description: 'Awarded University Silver Medal for standing second in overall university merit across all affiliated institutions.',
    significance: 'Academic Gold Standard'
  }
];
