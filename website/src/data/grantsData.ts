export interface ResearchGrant {
  id: string;
  scheme: string;
  agency: string;
  institution: string;
  amount: string;
  year: string;
  purpose: string;
}

export const researchGrantsList: ResearchGrant[] = [
  {
    id: 'GRANT-01',
    scheme: 'Mission LiFE (Lifestyle for Environment)',
    agency: 'Punjab State Council for Science & Technology (PSCST)',
    institution: 'DAV University, Jalandhar',
    amount: '₹7.00 Lakhs',
    year: '2022-23',
    purpose: 'Grant-in-aid for driving environmental awareness, circular economy workshops, and green technologies across Punjab.'
  },
  {
    id: 'GRANT-02',
    scheme: 'GRIP – Grass Root Innovators of Punjab Project',
    agency: 'Punjab State Council for Science & Technology (PSCST)',
    institution: 'DAV University, Jalandhar',
    amount: '₹1.00 Lakh',
    year: '2022-23',
    purpose: 'Fostering local grassroots innovators, prototyping rural technology solutions, and intellectual property enablement.'
  },
  {
    id: 'GRANT-03',
    scheme: 'Faculty Development Programme (FDP)',
    agency: 'Indian Society for Technical Education (ISTE)',
    institution: 'DAVIET, Jalandhar',
    amount: '₹2.31 Lakhs',
    year: '2020-21 & 2021-22',
    purpose: 'National FDPs upskilling faculty in emerging photonics, IoT architectures, and AI in technical pedagogy.'
  },
  {
    id: 'GRANT-04',
    scheme: 'Faculty Development Programme (FDP)',
    agency: 'IKG Punjab Technical University (IKGPTU)',
    institution: 'DAVIET, Jalandhar',
    amount: '₹1.50 Lakhs',
    year: '2019-20',
    purpose: 'Advanced faculty training on optical communication and signal processing simulation algorithms.'
  },
  {
    id: 'GRANT-05',
    scheme: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY)',
    agency: 'AICTE, New Delhi',
    institution: 'DAVIET, Jalandhar',
    amount: '₹3.23 Lakhs',
    year: '2018-19 & 2019-20',
    purpose: 'Government of India skill training initiative empowering underprivileged youth with certified technical skills.'
  },
  {
    id: 'GRANT-06',
    scheme: 'DST – NIMAT Project',
    agency: 'Entrepreneurship Development Institute of India (EDII) / DST',
    institution: 'DAVIET, Jalandhar',
    amount: '₹0.56 Lakh',
    year: '2017-18 & 2018-19',
    purpose: 'Conducting Entrepreneurship Awareness Camps (EAC) to spark student technology ventures.'
  },
  {
    id: 'GRANT-07',
    scheme: 'National Science & Mathematics Day Celebrations',
    agency: 'Punjab State Council for Science & Technology (PSCST)',
    institution: 'DAVIET, Jalandhar',
    amount: '₹0.35 Lakh (Annual)',
    year: '2017-18 to 2021-22',
    purpose: 'Annual science exhibition, olympiads, and inter-institutional innovation competitions.'
  },
  {
    id: 'GRANT-08',
    scheme: 'National Conference & Short-Term Training Programme (STTP)',
    agency: 'AICTE, New Delhi',
    institution: 'DAVIET, Jalandhar',
    amount: '₹4.47 Lakhs (₹3.22L + ₹1.25L)',
    year: '2008-09',
    purpose: 'AICTE grant for convening National Conference on Optical and Wireless Communications (NCOW) and STTP on Fiber Networks.'
  },
  {
    id: 'GRANT-09',
    scheme: 'Host Institution / Business Incubator Scheme',
    agency: 'Ministry of MSME, Govt. of India',
    institution: 'DAVIET, Jalandhar',
    amount: '₹62.50 Lakhs (Max Ceiling, ₹15L per idea)',
    year: '2018',
    purpose: 'Establishment of certified Host Institution / Business Incubator providing early-stage capital and commercialization mentorship for startup ideas.'
  },
  {
    id: 'GRANT-10',
    scheme: 'IMPACT / SSS National Project',
    agency: 'Dept of Electronics (D.O.E.), GOI / World Bank / Swiss Development Co-operation',
    institution: 'Mehr Chand Polytechnic',
    amount: 'Major World Bank Grant',
    year: '1998-2001',
    purpose: 'Institution modernization and specialized technician skill development (Awarded Best Project Coordinator).'
  }
];
