export interface ExecutiveProfile {
  name: string;
  salutation: string;
  fullName: string;
  designation: string;
  institution: string;
  location: string;
  academicRank: string;
  tagline: string;
  quote: string;
  bioSummary: string;
  fullBio: string[];
  contact: {
    officeAddress: string;
    residenceAddress: string;
    officePhone: string;
    mobilePhones: string[];
    officialEmail: string;
    personalEmail: string;
    linkedIn: string;
  };
  metrics: {
    experienceYears: number;
    publicationsCount: number;
    phdSupervisedCount: number;
    mtechSupervisedCount: number;
    booksCount: number;
    bookChaptersCount: number;
    reviewedBooksCount: number;
    patentsCount: number;
    awardsCount: number;
    mousCount: number;
    grantsAmountLakhs: number;
    countriesVisitedCount: number;
  };
  specializations: string[];
  leadershipPillars: {
    title: string;
    subtitle: string;
    description: string;
    icon: string;
  }[];
}

export const executiveProfile: ExecutiveProfile = {
  name: "Manoj Kumar",
  salutation: "Prof. (Dr.)",
  fullName: "Prof. (Dr.) Manoj Kumar",
  designation: "Vice-Chancellor",
  institution: "DAV University, Jalandhar, Punjab, India",
  location: "Jalandhar, Punjab, India",
  academicRank: "Senior Professor & Academic Administrator",
  tagline: "Bridging Academic Excellence, Cutting-Edge Photonics Research, and Transformative Higher Education Governance",
  quote: "Driving innovation, research and holistic education for a stronger, value-based society.",
  bioSummary: "Prof. (Dr.) Manoj Kumar is an eminent academician, administrator, and researcher with over 35 years of distinguished experience in engineering education, photonics & optical wireless communications research, and university governance. Currently serving as the Vice-Chancellor of DAV University, Jalandhar, he also serves as Dean's Visiting Scholar at the University of Memphis School of Public Health (USA), President of Jalandhar Management Association (AIMA), and Honorary Colonel Commandant in the National Cadet Corps (NCC).",
  fullBio: [
    "Prof. (Dr.) Manoj Kumar apart from being an administrator par excellence, is a brilliant researcher with exciting ideas and quality publications. He received his B.E. (Electronics & Communication Engineering) in 1990, M.Tech. (Electronics & Communication Engineering) in 2001 (Silver Medalist at Punjab Technical University), and Ph.D. from Punjab Technical University, Jalandhar in 2007.",
    "He holds the prestigious CMI Level 5 Certification in Leadership Management from the Chartered Management Institute, UK. Selected for the UK study tour by AICTE & British Council under the UKIERI project in 2019, he is recognized as the sole Master Trainer in the 'Leadership Management Program' from the northern states of Punjab, Haryana, Himachal Pradesh, and Jammu & Kashmir.",
    "He has supervised 09 Ph.D. scholars (awarded), 19 M.Tech. theses, authored 09 textbooks, co-authored 04 Springer book chapters, and holds 04 published patents. He has published over 150 research articles in premier international journals (SCI/Scopus) and conference proceedings. In addition to serving as Vice-Chancellor of DAV University since Sept 2022, he serves as Dean's Visiting Scholar at the University of Memphis School of Public Health, USA (since Aug 2024).",
    "Under his stewardship, DAV University and DAVIET have secured top national ranks (NAAC Grade 'A', MSME Business Incubator status, National Sports and Physical Education Award 2026, SEPC Education Excellence Awards 2024 & 2025, Digii100 Top 100 Higher-Ed Digital Transformation, and ASSOCHAM National Awards)."
  ],
  contact: {
    officeAddress: "Office of the Vice-Chancellor, DAV University, Sarmastpur, Jalandhar - Pathankot National Highway (NH 44), Jalandhar, Punjab (India) - 144012",
    residenceAddress: "251, Lajpat Nagar, Jalandhar, Punjab (India) - 144001",
    officePhone: "+91-181-2708844",
    mobilePhones: ["+91 9872203898", "+91 9478101102"],
    officialEmail: "drmanojkumarindia@gmail.com",
    personalEmail: "drmanojkumarindia@gmail.com",
    linkedIn: "https://in.linkedin.com/in/dr-manoj-kumar-56183928"
  },
  metrics: {
    experienceYears: 35,
    publicationsCount: 151,
    phdSupervisedCount: 9,
    mtechSupervisedCount: 19,
    booksCount: 9,
    bookChaptersCount: 4,
    reviewedBooksCount: 5,
    patentsCount: 4,
    awardsCount: 26,
    mousCount: 26,
    grantsAmountLakhs: 85,
    countriesVisitedCount: 10
  },
  specializations: [
    "Optical & Wireless Communication Systems",
    "Broadband Optical Wireless Networks & Dispersion Compensation",
    "Fibre Nonlinearities & Optical Soliton Transmission",
    "WDM Systems & Radio-over-Fibre (RoF)",
    "Wireless Sensor Networks (WSN) & Cognitive Radios",
    "Leadership & Strategic University Governance",
    "NEP 2020 Conformance & Higher Education Accreditation (NBA & NAAC)"
  ],
  leadershipPillars: [
    {
      title: "Academic & Institutional Stewardship",
      subtitle: "35+ Years of Visionary Leadership",
      description: "Steered premier institutions including DAV University, DAVIET (NAAC 'A' Accredited), and CT Group of Institutions towards world-class academic standards, research facilities, and national recognitions.",
      icon: "Landmark"
    },
    {
      title: "Pioneering Photonics & Wireless Research",
      subtitle: "150+ Papers, 4 Patents, 9 Ph.D. Scholars",
      description: "Authored pathbreaking studies in optical soliton propagation, dispersion management, and IoT health/surveillance devices published in top-tier SCI/Scopus indexed journals.",
      icon: "Lightbulb"
    },
    {
      title: "Global Alliances & Industry Integration",
      subtitle: "26+ International & Corporate MoUs",
      description: "Established landmark collaborations with University of Memphis USA, IIE Boston, L&T EduTech, Intel, Texas Instruments, Siemens, and MSME Incubation Centres.",
      icon: "Globe2"
    },
    {
      title: "Pedagogical & Values-Based Innovation",
      subtitle: "UKIERI & Harvard Mentor Master Trainer",
      description: "Certified CMI Level 5 Leader and AICTE/British Council Master Trainer driving student-centric pedagogy, research incubators, and ethics-based technical education.",
      icon: "Award"
    }
  ]
};
