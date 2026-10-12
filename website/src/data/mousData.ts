export interface StrategicMoU {
  id: string;
  partnerName: string;
  type: 'International' | 'Corporate' | 'National Institute';
  country: string;
  scope: string;
  institutionAtSigning: string;
  link?: string;
}

export const strategicMoUsList: StrategicMoU[] = [
  // International MoUs
  {
    id: 'MOU-INT-01',
    partnerName: 'University of Memphis, School of Public Health',
    type: 'International',
    country: 'USA',
    scope: 'Joint academic programs, public health curriculum sharing, faculty-student exchange, collaborative research publications, and joint international conferences.',
    institutionAtSigning: 'DAV University, Jalandhar',
    link: 'https://www.memphis.edu/publichealth/news/archive/2024/mou-davuniv-uofsph-20240129.php'
  },
  {
    id: 'MOU-INT-02',
    partnerName: 'International Consortium of Universities (IIE), Boston & DCAC',
    type: 'International',
    country: 'USA & Denmark',
    scope: 'Tripartite collaboration with IIE Boston and The Danish Consortium for Academic Craftsmanship (DCAC) for vocational craft benchmarking and higher education exchange.',
    institutionAtSigning: 'DAV University, Jalandhar'
  },
  {
    id: 'MOU-INT-03',
    partnerName: 'International Skill Development Corporation (ISDC)',
    type: 'International',
    country: 'United Kingdom',
    scope: 'Implementation of value-added global qualification programs in business analytics, finance, and digital leadership.',
    institutionAtSigning: 'DAV University, Jalandhar'
  },
  {
    id: 'MOU-INT-04',
    partnerName: 'PUM Netherlands Senior Experts',
    type: 'International',
    country: 'Netherlands',
    scope: 'Setting up university incubation centre, mentoring student startups, and technology transfer advisory by senior European industrial experts.',
    institutionAtSigning: 'DAV University, Jalandhar'
  },
  {
    id: 'MOU-INT-05',
    partnerName: 'Lahti University of Applied Sciences',
    type: 'International',
    country: 'Finland',
    scope: 'Faculty exchange, pedagogical workshops, and collaborative international student projects.',
    institutionAtSigning: 'CT Group of Institutions'
  },
  {
    id: 'MOU-INT-06',
    partnerName: 'University of Sri Jayewardenepura',
    type: 'International',
    country: 'Sri Lanka',
    scope: 'Joint academic research, international conferences, and South-Asian university leadership dialogue.',
    institutionAtSigning: 'CT Group of Institutions'
  },
  {
    id: 'MOU-INT-07',
    partnerName: 'University of Ontario Institute of Technology (UOIT), Oshawa',
    type: 'International',
    country: 'Canada',
    scope: 'Postgraduate progression pathway and faculty research collaboration in photonics and engineering sciences.',
    institutionAtSigning: 'DAVIET, Jalandhar'
  },
  {
    id: 'MOU-INT-08',
    partnerName: 'Trent University',
    type: 'International',
    country: 'Canada',
    scope: 'Student exchange, credit transfer framework, and environmental science research synergy.',
    institutionAtSigning: 'DAVIET, Jalandhar'
  },
  {
    id: 'MOU-INT-09',
    partnerName: 'Southern Alberta Institute of Technology (SAIT)',
    type: 'International',
    country: 'Canada',
    scope: 'Applied technology vocational curriculum benchmarks and faculty development.',
    institutionAtSigning: 'DAVIET, Jalandhar'
  },
  {
    id: 'MOU-INT-10',
    partnerName: 'Rsoft Design Group',
    type: 'International',
    country: 'USA',
    scope: 'Signing of MoU for advanced photonics simulation software suite and joint research in optical fiber waveguides.',
    institutionAtSigning: 'DAVIET, Jalandhar'
  },

  // Corporate & National MoUs
  {
    id: 'MOU-CORP-01',
    partnerName: 'Larsen & Toubro EduTech Limited (L&T EduTech)',
    type: 'Corporate',
    country: 'India',
    scope: 'Integrated Program in Mechatronics with Specialization in Electric Vehicle (EV) Engineering.',
    institutionAtSigning: 'DAV University, Jalandhar'
  },
  {
    id: 'MOU-CORP-02',
    partnerName: 'Intel Technology India Pvt. Ltd.',
    type: 'Corporate',
    country: 'India / USA',
    scope: 'Establishment of Intel Centre of Excellence for Artificial Intelligence and Edge Computing.',
    institutionAtSigning: 'DAV University, Jalandhar'
  },
  {
    id: 'MOU-CORP-03',
    partnerName: 'Bajaj Finserv Limited',
    type: 'Corporate',
    country: 'India',
    scope: 'Banking, Financial Services and Insurance (BFSI) certified professional training programs for undergraduates.',
    institutionAtSigning: 'DAV University, Jalandhar'
  },
  {
    id: 'MOU-CORP-04',
    partnerName: 'Cambridge University Press & Assessment India',
    type: 'Corporate',
    country: 'UK / India',
    scope: 'English language proficiency certification, faculty linguistic pedagogy, and international testing centers.',
    institutionAtSigning: 'DAV University, Jalandhar'
  },
  {
    id: 'MOU-CORP-05',
    partnerName: 'Maruti Suzuki India Limited',
    type: 'Corporate',
    country: 'India / Japan',
    scope: 'Automobile engineering industry-collaborative training programs and campus talent pipeline.',
    institutionAtSigning: 'DAV University, Jalandhar'
  },
  {
    id: 'MOU-CORP-06',
    partnerName: 'ERP Logic India Pvt. Ltd.',
    type: 'Corporate',
    country: 'India',
    scope: 'Industry collaborative enterprise resource planning curriculum with specialization in SAP modules.',
    institutionAtSigning: 'DAV University, Jalandhar'
  },
  {
    id: 'MOU-CORP-07',
    partnerName: 'National Institute of Technology (NIT), Delhi',
    type: 'National Institute',
    country: 'India',
    scope: 'Collaborative research projects, faculty/student exchange programs, co-sponsored national seminars and shared lab access.',
    institutionAtSigning: 'DAV University & DAVIET'
  },
  {
    id: 'MOU-CORP-08',
    partnerName: 'Texas Instruments & EdGate Technologies',
    type: 'Corporate',
    country: 'India / USA',
    scope: 'Establishment of TI Innovation Center, Embedded Systems Lab, and Analog Electronics Lab at DAVIET.',
    institutionAtSigning: 'DAVIET, Jalandhar'
  },
  {
    id: 'MOU-CORP-09',
    partnerName: 'Siemens Industry Software',
    type: 'Corporate',
    country: 'Germany / India',
    scope: 'Siemens Centre of Excellence & Authorized Training Center (ATC) for Solid Edge and CAD/CAM.',
    institutionAtSigning: 'CT Group of Institutions'
  },
  {
    id: 'MOU-CORP-10',
    partnerName: 'Oracle Academy',
    type: 'Corporate',
    country: 'USA / India',
    scope: 'Enterprise database architecture, Java programming curriculum, and certified cloud infrastructure training.',
    institutionAtSigning: 'DAVIET, Jalandhar'
  },
  {
    id: 'MOU-CORP-11',
    partnerName: 'IBM India',
    type: 'Corporate',
    country: 'USA / India',
    scope: 'Establishment of IBM Centre of Excellence in Cloud Computing and Big Data Analytics.',
    institutionAtSigning: 'CT Group of Institutions'
  },
  {
    id: 'MOU-CORP-12',
    partnerName: 'Sedulity Solutions & Technologies',
    type: 'Corporate',
    country: 'India',
    scope: 'Centre of Excellence in Cyber Security & Cyber Forensics for law enforcement agencies, corporate professionals, and researchers.',
    institutionAtSigning: 'DAVIET, Jalandhar'
  },
  {
    id: 'MOU-CORP-13',
    partnerName: 'NIT Hamirpur & NIT Jalandhar',
    type: 'National Institute',
    country: 'India',
    scope: 'Joint doctoral research co-supervision, inter-library resource sharing, and co-convening national conferences.',
    institutionAtSigning: 'DAVIET, Jalandhar'
  }
];
