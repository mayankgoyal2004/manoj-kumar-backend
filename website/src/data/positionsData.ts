export interface CareerPosition {
  id: string;
  role: string;
  institution: string;
  location: string;
  period: string;
  isCurrent: boolean;
  type: 'Executive' | 'Academic' | 'Administrative' | 'Honorary';
  description: string;
  keyHighlights: string[];
}

export const careerPositions: CareerPosition[] = [
  {
    id: 'vc-dav',
    role: 'Vice-Chancellor',
    institution: 'DAV University',
    location: 'Jalandhar, Punjab, India',
    period: 'September 26, 2022 – Present',
    isCurrent: true,
    type: 'Executive',
    description: 'Chief Academic and Executive Officer of DAV University, providing strategic vision, policy oversight, research expansion, industry integration, and institutional governance.',
    keyHighlights: [
      'Honoured with Outstanding Vice-Chancellor of India Award (2025 & 2026) by Indian Education Network.',
      'Conferred National Sports and Physical Education Award 2026 for Best Institution for Sports Laboratories and Research Facilities.',
      'Secured Education Excellence Awards (2024 & 2025) from Service Export Promotion Council (SEPC), Ministry of Commerce & Industry, Govt. of India.',
      'Ranked amongst Top 100 Higher-Ed Pioneering Digital Transformation by Digii100 (2023).',
      'Established landmark international MoUs with University of Memphis USA, IIE Boston, and DCAC Denmark.'
    ]
  },
  {
    id: 'visiting-scholar-memphis',
    role: "Dean's Visiting Scholar",
    institution: 'University of Memphis, School of Public Health',
    location: 'Memphis, Tennessee, USA',
    period: 'August 1, 2024 – Present',
    isCurrent: true,
    type: 'Academic',
    description: 'Collaborative academic and research leadership role facilitating joint public health technology curriculum, faculty-student exchange, and collaborative research initiatives.',
    keyHighlights: [
      'Facilitating joint academic programs and research publications in global health technologies and biomedical IoT.',
      'Co-authoring international research and book chapters published by Springer.'
    ]
  },
  {
    id: 'president-jma',
    role: 'President',
    institution: 'Jalandhar Management Association (JMA) under aegis of AIMA',
    location: 'Jalandhar, Punjab',
    period: '2024 – Present',
    isCurrent: true,
    type: 'Honorary',
    description: 'Leading the regional management forum under All India Management Association (AIMA), fostering executive leadership development, corporate-academia synergies, and industrial innovation.',
    keyHighlights: [
      'Organizing executive conclaves, management development programs, and industry masterclasses across Punjab.',
      'Strengthening regional industry-academia dialogue and student employability initiatives.'
    ]
  },
  {
    id: 'ncc-colonel',
    role: 'Honorary Colonel / Colonel Commandant',
    institution: 'National Cadet Corps (NCC) at DAV University',
    location: 'Jalandhar, Punjab',
    period: 'May 2026 – Present',
    isCurrent: true,
    type: 'Honorary',
    description: 'Honorary military rank bestowed in recognition of exemplary leadership, youth discipline development, and national service integration in higher education.',
    keyHighlights: [
      'Guiding NCC cadet battalions towards national integration, character building, and leadership excellence.'
    ]
  },
  {
    id: 'principal-daviet',
    role: 'Principal',
    institution: 'DAV Institute of Engineering & Technology (DAVIET)',
    location: 'Jalandhar, Punjab',
    period: 'September 07, 2015 – September 25, 2022',
    isCurrent: false,
    type: 'Executive',
    description: 'Led DAVIET as the executive head, spearheading academic accreditations, research infrastructure, incubation centers, and international rankings.',
    keyHighlights: [
      'Accredited DAVIET with Grade "A" by NAAC (October 2017) and UGC 2(f) recognition.',
      'Secured MSME Business Incubator (HI/BI) status with up to Rs. 62.5 Lakhs central government funding.',
      'Ranked 17th in Outstanding Engineering Colleges of Excellence in India (CSR-GHRDC 2022) and 66th by India Today (2021).',
      'Conferred Outstanding Institution Award by NITTTR Chandigarh (2018) and Indo-Global Education Excellence Award (2017).'
    ]
  },
  {
    id: 'group-director-ct',
    role: 'Group Director & Director (CTIEMT)',
    institution: 'CT Group of Institutions / CT Institute of Engg. Management & Technology',
    location: 'Jalandhar, Punjab',
    period: 'July 1, 2010 – September 7, 2015',
    isCurrent: false,
    type: 'Executive',
    description: 'Executive leadership across multiple engineering, management, and polytechnic campuses, driving multidisciplinary academic growth, international MoUs, and corporate CoEs.',
    keyHighlights: [
      'Established Siemens Centre of Excellence & Authorized Training Centre and IBM Centre of Excellence.',
      'Organized multiple DST & ISRO-sponsored International Multi-Track Conferences (IMTC).',
      'Established international collaborations with Lahti University (Finland) and University of Sri Jayewardenepura (Sri Lanka).'
    ]
  },
  {
    id: 'prof-head-daviet',
    role: 'Professor & Faculty Head, Department of ECE & Research Centre',
    institution: 'DAV Institute of Engineering & Technology (DAVIET)',
    location: 'Jalandhar, Punjab',
    period: 'October 12, 2007 – July 01, 2010',
    isCurrent: false,
    type: 'Academic',
    description: 'Headed the Electronics & Communication Engineering department and Advanced Research Centre, guiding doctoral research and securing major AICTE grants.',
    keyHighlights: [
      'Established state-of-the-art Optical Wireless Communication and DSP research laboratories.',
      'Convened national conferences on Optical & Wireless Communications and secured AICTE research grants.'
    ]
  },
  {
    id: 'assoc-prof-daviet',
    role: 'Associate Professor & Faculty Head, Department of ECE',
    institution: 'DAV Institute of Engineering & Technology (DAVIET)',
    location: 'Jalandhar, Punjab',
    period: 'May 01, 2003 – October 11, 2007',
    isCurrent: false,
    type: 'Academic',
    description: 'Senior faculty and departmental head, leading curriculum design, Rsoft USA simulation software collaborations, and postgraduate academic programs.',
    keyHighlights: [
      'Led faculty delegation to Columbia and Princeton Universities Lightwave Technology Labs (USA, Dec 2004).',
      'Signed collaborative MoU with Rsoft Design Group, USA.'
    ]
  },
  {
    id: 'sr-lecturer-daviet',
    role: 'Lecturer (Senior Scale) & Faculty Head, Department of ECE',
    institution: 'DAV Institute of Engineering & Technology (DAVIET)',
    location: 'Jalandhar, Punjab',
    period: 'July 10, 2001 – April 30, 2003',
    isCurrent: false,
    type: 'Academic',
    description: 'Founding departmental faculty and leadership, setting up core laboratories and academic syllabus under Punjab Technical University.',
    keyHighlights: [
      'Formulated PTU B.Tech. ECE syllabus and established early engineering laboratory infrastructure.'
    ]
  },
  {
    id: 'lecturer-mehr-chand',
    role: 'Lecturer',
    institution: 'Mehr Chand Polytechnic',
    location: 'Jalandhar, Punjab',
    period: 'February 1992 – July 2001',
    isCurrent: false,
    type: 'Academic',
    description: 'Taught diploma engineering students in electronics, instrumentation, and telecommunications.',
    keyHighlights: [
      'Served as Project Coordinator under D.O.E., World Bank & Swiss Development Co-operation project (Best PI Coordinator Award).'
    ]
  },
  {
    id: 'lecturer-seth-jai-prakash',
    role: 'Lecturer',
    institution: 'Seth Jai Prakash Polytechnic',
    location: 'Damla (Yamuna Nagar), Haryana',
    period: 'August 1991 – January 1992',
    isCurrent: false,
    type: 'Academic',
    description: 'Initiated teaching career in foundational electronics engineering.',
    keyHighlights: [
      'Delivered core coursework in electronic components, network theory, and basic telecommunications.'
    ]
  }
];
