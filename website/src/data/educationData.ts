export interface Degree {
  degree: string;
  field: string;
  institution: string;
  year: number;
  honors?: string;
  description?: string;
}

export interface ExecutiveCertification {
  title: string;
  issuingBody: string;
  year?: string;
  badge?: string;
  description: string;
}

export const degrees: Degree[] = [
  {
    degree: 'Ph.D.',
    field: 'Electronics & Communication Engineering',
    institution: 'Punjab Technical University (IKGPTU), Jalandhar',
    year: 2007,
    honors: 'Doctor of Philosophy',
    description: 'Pioneering doctoral research in optical soliton transmission, dispersion compensation, and high-speed optical fiber communications.'
  },
  {
    degree: 'M.Tech.',
    field: 'Electronics & Communication Engineering',
    institution: 'Punjab Technical University (IKGPTU), Jalandhar',
    year: 2001,
    honors: 'Silver Medalist in University',
    description: 'Awarded University Silver Medal for academic distinction in postgraduate studies.'
  },
  {
    degree: 'B.E.',
    field: 'Electronics & Communication Engineering',
    institution: 'Gulbarga University, Karnataka',
    year: 1990,
    honors: 'First Class with Distinction',
    description: 'Foundational undergraduate degree in electronics, analog & digital communication engineering.'
  }
];

export const executiveCertifications: ExecutiveCertification[] = [
  {
    title: 'CMI Level 5 Certificate in Leadership Management',
    issuingBody: 'Chartered Management Institute (CMI), United Kingdom',
    year: '2019',
    badge: 'International Executive Credential',
    description: 'Globally recognized professional credential benchmarking strategic leadership, institutional performance management, and organizational transformation.'
  },
  {
    title: 'AICTE-UKIERI Technical Leadership Master Trainer',
    issuingBody: 'AICTE & British Council (UKIERI Project)',
    year: '2019',
    badge: 'National Distinction',
    description: 'Selected for the UK Study Tour to represent India under the UK-India Education and Research Initiative. Recognized as the ONLY Master Trainer selected from the northern Indian states of Punjab, Haryana, Himachal Pradesh, and Jammu & Kashmir.'
  },
  {
    title: 'Wipro Mission 10X Top 25 Academic Leaders of India',
    issuingBody: 'Wipro Mission 10X',
    year: '2012',
    badge: 'Pan-India Elite Selection',
    description: 'Identified among the Top 25 Academic Leaders across India following rigorous 3-tier national leadership workshops across universities.'
  },
  {
    title: 'Harvard Manage Mentor (HMM10) Professional Modules',
    issuingBody: 'Harvard Business Publishing / Mission 10X Level 2',
    year: 'Certified',
    badge: 'Executive Management',
    description: 'Certified in HMM10: Leading and Motivating, Goal Setting, Time Management, and Difficult Interactions.'
  },
  {
    title: 'Accreditation Assessor / Program Evaluator',
    issuingBody: 'National Board of Accreditation (NBA) & NAAC',
    year: 'Empanelled',
    badge: 'Quality Assurance',
    description: 'Empanelled expert peer evaluator for accreditation of engineering colleges, technical institutions, and universities across India.'
  },
  {
    title: 'Academic Advisor for Cyber Safety & Security Standards',
    issuingBody: 'National Cyber Safety and Security Standards (NCSSS), India',
    year: 'Empanelled',
    badge: 'National Security Standards',
    description: 'Advisory panelist contributing to national curriculum and security benchmarks for higher education institutions.'
  }
];
