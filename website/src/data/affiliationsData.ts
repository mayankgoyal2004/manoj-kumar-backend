export interface AffiliationItem {
  id: string;
  organization: string;
  role: string;
  category: 'Fellowship' | 'Life Member' | 'Board of Governors' | 'Academic Governance' | 'Editorial & Reviewer';
  period?: string;
  details?: string;
}

export const affiliationsList: AffiliationItem[] = [
  // Fellowships
  {
    id: 'AFF-F-01',
    organization: 'Punjab Forum for Science & Technology Communications',
    role: 'Founding Fellow',
    category: 'Fellowship',
    details: 'Founding member driving statewide science dissemination, environmental awareness, and public STEM education.'
  },
  {
    id: 'AFF-F-02',
    organization: 'The Institution of Engineers (India)',
    role: 'Fellow (F-1233471)',
    category: 'Fellowship',
    details: 'Elected Fellow in Electronics and Telecommunication Engineering Division.'
  },
  {
    id: 'AFF-F-03',
    organization: 'The Institution of Electronics & Telecommunication Engineers (IETE)',
    role: 'Fellow (F-222164)',
    category: 'Fellowship',
    details: 'Elected Fellow recognizing significant contributions to optical and wireless communications research.'
  },
  {
    id: 'AFF-F-04',
    organization: 'Association of Indian Principals (AIP)',
    role: 'Honorary Member, Advisory Council',
    category: 'Fellowship',
    period: '2024 – 2026',
    details: 'Advising national leadership on school and college administrative reforms and teacher quality frameworks.'
  },

  // Life Memberships
  {
    id: 'AFF-LM-01',
    organization: 'The Indian Science Congress Association (ISCA)',
    role: 'Life Member',
    category: 'Life Member'
  },
  {
    id: 'AFF-LM-02',
    organization: 'Computer Society of India (CSI)',
    role: 'Life Member',
    category: 'Life Member'
  },
  {
    id: 'AFF-LM-03',
    organization: 'Indian Society for Technical Education (ISTE)',
    role: 'Life Member',
    category: 'Life Member'
  },
  {
    id: 'AFF-LM-04',
    organization: 'Punjab Academy of Sciences (PAS)',
    role: 'Life Member & Former Executive Council Member (2009-12 & 2018-21)',
    category: 'Life Member'
  },

  // Board of Governors & Policy Councils
  {
    id: 'AFF-BOG-01',
    organization: 'DAV University, Jalandhar',
    role: 'Member, Board of Governors (BoG)',
    category: 'Board of Governors',
    details: 'Highest university executive body governing policy, academic expansion, and fiscal administration.'
  },
  {
    id: 'AFF-BOG-02',
    organization: 'Bharat Environment Program (BEP) 2027',
    role: 'Member, Punjab State Advisory Board',
    category: 'Board of Governors',
    details: 'State advisory council steering environmental conservation, net-zero university initiatives, and green campus benchmarks.'
  },
  {
    id: 'AFF-BOG-03',
    organization: 'CT University, Ludhiana',
    role: 'Member, Board of Governors (BoG)',
    category: 'Board of Governors'
  },
  {
    id: 'AFF-BOG-04',
    organization: 'DAV Institute of Engg. & Technology (DAVIET)',
    role: 'Member Secretary, Board of Governors (2015 – 2022)',
    category: 'Board of Governors'
  },

  // Academic Governance
  {
    id: 'AFF-AC-01',
    organization: 'IKG Punjab Technical University (IKGPTU)',
    role: 'Member, Academic Council',
    category: 'Academic Governance',
    period: '2022 – 2024'
  },
  {
    id: 'AFF-AC-02',
    organization: 'Board of Studies (ECE), IKGPTU',
    role: 'Chairman & Member',
    category: 'Academic Governance',
    period: '2003-09, 2018-21 & 2021-24',
    details: 'Chaired and shaped undergraduate and postgraduate Electronics & Communication Engineering curriculum across hundreds of affiliated engineering colleges.'
  },
  {
    id: 'AFF-AC-03',
    organization: 'IKG Punjab Technical University',
    role: 'Member, Committee for Ph.D. Admissions & Research Degree Committee (RDC)',
    category: 'Academic Governance'
  },
  {
    id: 'AFF-AC-04',
    organization: 'FICCI North Region Task Force on Higher Education',
    role: 'Task Force Member',
    category: 'Academic Governance',
    details: 'Formulating policy recommendations on industry-readiness, NEP 2020 rollout, and skill accreditation across northern states.'
  },
  {
    id: 'AFF-AC-05',
    organization: 'IKGPTU Online Education & Regional Centres Policy Committees',
    role: 'Committee Member',
    category: 'Academic Governance',
    details: 'Formulated University policy frameworks for launching digital/online degree programs and establishing regional learning centers.'
  },

  // Editorial & Reviewer Boards
  {
    id: 'AFF-REV-01',
    organization: 'Optical Fiber Technology (Elsevier Science)',
    role: 'Peer Reviewer',
    category: 'Editorial & Reviewer'
  },
  {
    id: 'AFF-REV-02',
    organization: 'Journal of Optics (Springer Nature)',
    role: 'Peer Reviewer',
    category: 'Editorial & Reviewer'
  },
  {
    id: 'AFF-REV-03',
    organization: 'ICFAI University Journals',
    role: 'Peer Reviewer',
    category: 'Editorial & Reviewer'
  },
  {
    id: 'AFF-REV-04',
    organization: 'World Scientific & Engineering Academy and Society (WSEAS)',
    role: 'International Conference Session Chair & Reviewer',
    category: 'Editorial & Reviewer'
  }
];
