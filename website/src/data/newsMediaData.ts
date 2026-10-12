export interface NewsMediaItem {
  id: string;
  title: string;
  headline: string;
  source: string;
  category: 'Press Release' | 'Print Media' | 'Digital News' | 'Interviews' | 'Institutional';
  date: string;
  readTime?: string;
  location?: string;
  excerpt: string;
  fullContent?: string[];
  keyHighlights?: string[];
  imageUrl?: string;
  sourceUrl?: string;
  tags: string[];
  isFeatured?: boolean;
}

export const newsMediaItems: NewsMediaItem[] = [
  {
    id: 'news-01',
    title: 'DAV University Conferred National Sports and Physical Education Award 2026 Under Leadership of VC Dr. Manoj Kumar',
    headline: 'DAV University Honored for Exemplary Athletic Infrastructure, Sports Scholarships, and Holistic Student Development',
    source: 'The Tribune',
    category: 'Print Media',
    date: 'February 2026',
    readTime: '3 min read',
    location: 'New Delhi / Jalandhar',
    isFeatured: true,
    excerpt: 'DAV University, Jalandhar, under the visionary leadership of Vice-Chancellor Prof. (Dr.) Manoj Kumar, has been bestowed with the coveted National Sports and Physical Education Award 2026 for its state-of-the-art sports facilities, championship achievements, and active fitness promotion across disciplines.',
    fullContent: [
      'In a gala national summit held in New Delhi, DAV University was recognized among top Indian universities for its relentless focus on physical education, modern gymnasium infrastructure, all-weather athletic tracks, and comprehensive sports scholarship programs.',
      'Accepting the honor, Vice-Chancellor Prof. (Dr.) Manoj Kumar remarked: "Physical vigor, sportsmanship, and mental fortitude are indivisible from academic excellence. At DAV University, we are committed to nurturing well-rounded national champions who embody integrity, team spirit, and leadership."',
      'The award jury applauded the university\'s holistic approach towards blending National Education Policy (NEP 2020) curricular flexibility with competitive sports training, producing medalists at state, national, and inter-university championships.'
    ],
    keyHighlights: [
      'Conferred the prestigious National Sports and Physical Education Award 2026',
      'Over 100+ state and national athletic medalists supported with full sports scholarships',
      'Modern Olympic-standard athletic complex and multi-disciplinary fitness centers commended by the jury'
    ],
    tags: ['National Award', 'Sports Excellence', 'DAV University', 'Higher Education'],
    sourceUrl: 'https://www.davuniversity.org'
  },
  {
    id: 'news-02',
    title: 'Strategic Academic Alliance: DAV University & University of Memphis (USA) Expand Research & Faculty Exchange',
    headline: 'VC Dr. Manoj Kumar Champions Global Collaborative Research in Health Sciences and Photonics',
    source: 'Higher Education Digest',
    category: 'Institutional',
    date: 'October 2025',
    readTime: '4 min read',
    location: 'Memphis, TN (USA) / Jalandhar',
    isFeatured: true,
    excerpt: 'Deepening international partnerships, DAV University signed an expanded MoU with the University of Memphis School of Public Health, USA, where Dr. Manoj Kumar also serves as Dean\'s Visiting Scholar, enabling dual-degree exploration, joint research, and faculty exchange programs.',
    fullContent: [
      'The landmark bilateral collaboration between DAV University and the University of Memphis (USA) establishes a direct pipeline for joint scientific publications, international faculty sabbaticals, student mobility, and cross-border research symposiums.',
      'Dr. Manoj Kumar, serving as Dean\'s Visiting Scholar at the School of Public Health, University of Memphis, highlighted that internationalization of higher education is paramount for Indian universities under NEP 2020 to build research competitiveness.',
      'The agreement encompasses collaborative grants in optical sensor technologies for public health diagnostics, environmental monitoring, and data-driven healthcare systems.'
    ],
    keyHighlights: [
      'Expanded bilateral agreement with University of Memphis, USA',
      'Dean\'s Visiting Scholar appointment for VC Prof. (Dr.) Manoj Kumar',
      'Joint research in optical sensors, health informatics, and faculty exchange sabbaticals'
    ],
    tags: ['Global Collaboration', 'University of Memphis', 'MoU', 'International Research'],
    sourceUrl: 'https://www.davuniversity.org'
  },
  {
    id: 'news-03',
    title: 'Exclusive Interview: "Transforming Universities into Innovation & Incubation Engines" — VC Dr. Manoj Kumar',
    headline: 'Dr. Manoj Kumar Outlines 5-Year Vision on Intellectual Property, MSME Incubation, and Multidisciplinary Pedagogy',
    source: 'Education World & JMA Forum',
    category: 'Interviews',
    date: 'August 2025',
    readTime: '5 min read',
    location: 'Jalandhar',
    excerpt: 'In a wide-ranging leadership interview, Dr. Manoj Kumar, Vice-Chancellor of DAV University and President of Jalandhar Management Association (AIMA), discusses how higher education institutions must pivot from conventional degree-awarding models to vibrant startup and patent-generating ecosystems.',
    fullContent: [
      '"The youth of India possess remarkable inventive capacity. Our responsibility as university leaders is to provide seed grants, patent filing support, and cutting-edge prototyping laboratories," noted Dr. Manoj Kumar in the interview.',
      'Highlighting his dual role as academic leader and President of the Jalandhar Management Association (affiliated with All India Management Association - AIMA), he emphasized fostering strong synergy between regional MSME industries and university engineering labs.',
      'Dr. Kumar highlighted the operationalization of DAV University\'s MSME-approved Business Incubator, which provides seed funding and technical mentorship for student and faculty innovators.'
    ],
    keyHighlights: [
      'Focus on turning classroom projects into commercial patents and startup ventures',
      'Strengthening industry-academia tie-ups across Northern India through JMA (AIMA)',
      'Operationalization of funded MSME Host Institute and Business Incubation Centre'
    ],
    tags: ['Exclusive Interview', 'AIMA JMA', 'MSME Incubator', 'Innovation Ecosystem']
  },
  {
    id: 'news-04',
    title: 'DAV University Bags SEPC Education Excellence Award for Premier Vocational and Technological Training',
    headline: 'Services Export Promotion Council (SEPC) Felicitates DAV University for Global Standard Skill Development',
    source: 'Hindustan Times',
    category: 'Print Media',
    date: 'November 2025',
    readTime: '3 min read',
    location: 'New Delhi',
    excerpt: 'DAV University was honored with the prestigious SEPC Education Excellence Award by the Services Export Promotion Council (Ministry of Commerce and Industry, Govt. of India) for outstanding contributions to skill enrichment and international career readiness.',
    fullContent: [
      'The award was presented during the National Higher Education Summit in New Delhi, acknowledging DAV University\'s industry-aligned curricula, advanced laboratory infrastructure, and high graduate placement ratios in leading Fortune 500 companies.',
      'Vice-Chancellor Dr. Manoj Kumar attributed the recognition to the dedication of the faculty, innovative project-based learning modules, and corporate linkages established with technology leaders such as L&T EduTech, Siemens, and Intel.',
      'The university\'s curriculum revision in accordance with the National Credit Framework (NCrF) and NEP 2020 was singled out for appreciation by industry delegates.'
    ],
    keyHighlights: [
      'Conferred by SEPC, Ministry of Commerce and Industry, Government of India',
      'Recognized for exceptional vocational integration and corporate placement records',
      'Strategic MoUs with L&T EduTech, Siemens, and Intel cited as model partnerships'
    ],
    tags: ['SEPC Award', 'Ministry of Commerce', 'Industry Linkage', 'Skill Development']
  },
  {
    id: 'news-05',
    title: 'Dr. Manoj Kumar Leads Executive Workshop on Strategic Leadership & Institutional Governance',
    headline: '5-Day Intensive Leadership Management Program Equips Deans, Coordinators, and Senior Faculty',
    source: 'DAVU Press Bureau',
    category: 'Press Release',
    date: 'July 2026',
    readTime: '3 min read',
    location: 'Jalandhar',
    excerpt: 'Dr. Manoj Kumar, certified CMI Level 5 Leader (UK) and AICTE-British Council Master Trainer, conducted an intensive 5-day Leadership Management Workshop for university administrators, deans, and department heads on strategic planning and team agility.',
    fullContent: [
      'Drawing on methodologies from the UKIERI (UK-India Education and Research Initiative) program and Chartered Management Institute (CMI, UK), the workshop provided actionable frameworks in change management, academic auditing, KPI benchmarking, and crisis leadership.',
      'Participants engaged in case study simulations, institutional SWOT analysis, and roadmapping exercises designed to accelerate DAV University\'s journey towards premier national accreditation.',
      'Dr. Kumar emphasized: "True leadership is not about managing routine administration; it is about inspiring people, establishing an environment of intellectual freedom, and fostering institutional resilience."'
    ],
    keyHighlights: [
      'Delivered by certified CMI Level 5 Master Trainer Prof. (Dr.) Manoj Kumar',
      'Covered change management, KPI governance, and accreditation readiness',
      'Over 60 Deans, Directors, and Department Chairs participated'
    ],
    tags: ['Leadership Workshop', 'UKIERI', 'CMI Level 5', 'Governance']
  },
  {
    id: 'news-06',
    title: 'DAV University Recognized in Digii100 Top 100 Higher Education Institutions for Digital Transformation',
    headline: 'Pioneering Smart Campus Solutions, ERP Automation, and Paperless Academic Administration',
    source: 'Digital Learning Magazine',
    category: 'Digital News',
    date: 'January 2026',
    readTime: '3 min read',
    location: 'New Delhi',
    excerpt: 'DAV University, Jalandhar has been spotlighted among the prestigious Digii100 list of Top 100 Higher Education Institutions in India for excellence in digital transformation, automated governance, and hybrid learning adoption.',
    fullContent: [
      'The Digii100 recognition celebrates universities that have successfully transitioned to comprehensive cloud-based Campus ERP systems, automated grading workflows, digital library repositories, and high-speed Wi-Fi-enabled smart classrooms.',
      'Under Vice-Chancellor Dr. Manoj Kumar\'s stewardship, the university implemented end-to-end digital examination management, student grievance redressal portals, and LMS integrations.',
      '"Technology in education must serve as an enabler of equity and efficiency. Digital automation frees faculty from clerical burdens, enabling them to focus wholeheartedly on research and mentoring," stated Dr. Kumar.'
    ],
    keyHighlights: [
      'Selected among Top 100 Higher Education Institutions in India for Digital Transformation',
      'End-to-end cloud ERP adoption across admissions, examinations, and fee management',
      'Smart classrooms, high-speed fiber backbone, and digital library repositories'
    ],
    tags: ['Digii100', 'Digital Transformation', 'Smart Campus', 'EdTech']
  },
  {
    id: 'news-07',
    title: 'Dainik Bhaskar Feature: "Research with Societal Value is the Hallmark of Top Universities" — Dr. Manoj Kumar',
    headline: 'Regional Media Highlights Dr. Manoj Kumar\'s Dual Focus on Vedic Values and Frontier Photonics Research',
    source: 'Dainik Bhaskar',
    category: 'Print Media',
    date: 'May 2025',
    readTime: '4 min read',
    location: 'Punjab Region',
    excerpt: 'In a prominent full-column feature, Dainik Bhaskar highlighted the visionary leadership of Vice-Chancellor Dr. Manoj Kumar in steering DAV University to new heights while upholding the timeless values of Swami Dayanand Saraswati and Mahatma Hansraj.',
    fullContent: [
      'The feature traced Dr. Manoj Kumar\'s 35-year illustrious academic career from a young gold/silver medalist researcher to holding key leadership roles as Director CT Group, Principal DAVIET, and Vice-Chancellor DAV University.',
      'Special attention was drawn to his prolific research portfolio comprising 151+ research papers, 4 published patents, 13 books, and 9 Ph.D. scholars successfully guided in the field of optical wireless communication and dispersion compensation.',
      'The article commended Dr. Kumar\'s community outreach initiatives, including tree-planting drives, free rural literacy campaigns, and green campus sustainability certifications at DAV University.'
    ],
    keyHighlights: [
      'Spotlight on 35+ years of distinguished academic and administrative stewardship',
      'Harmonious integration of Arya Samaj educational ideals with modern science & technology',
      'Highlight of 151+ SCI/Scopus publications, 4 patents, and 13 authored textbooks'
    ],
    tags: ['Print Feature', 'Dainik Bhaskar', 'Vedic Values', 'Academic Leadership']
  },
  {
    id: 'news-08',
    title: 'Press Release: DAV University Inks Strategic MoU with L&T EduTech to Launch Industry-Integrated Engineering Tracks',
    headline: 'Students to Gain Direct Access to Larsen & Toubro Industry Certified Courses, Virtual Labs, and Internships',
    source: 'DAVU Media Bureau',
    category: 'Press Release',
    date: 'September 2025',
    readTime: '3 min read',
    location: 'Jalandhar / Chennai',
    excerpt: 'To bridge industry-academia skill gaps in core engineering and emerging technologies, DAV University signed a historic Memorandum of Understanding (MoU) with L&T EduTech, the digital learning initiative of Larsen & Toubro.',
    fullContent: [
      'The partnership enables engineering students across Computer Science, Electronics, Mechanical, and Civil branches to undergo industry-designed curriculum modules taught by practicing engineers from Larsen & Toubro.',
      'Dr. Manoj Kumar, Vice-Chancellor, stated: "Partnering with an engineering titan like L&T ensures our students graduate not just with degrees, but with job-ready industrial skills, live project experience, and accredited corporate credentials."',
      'The agreement also provides faculty immersion programs at L&T training centers and priority internship pathways for top-performing undergraduate scholars.'
    ],
    keyHighlights: [
      'Direct partnership with L&T EduTech (Larsen & Toubro Ltd.)',
      'Industry-vetted curriculum, virtual industrial labs, and real-world project portfolios',
      'Accelerated corporate internship and placement drives for engineering graduates'
    ],
    tags: ['Industry MoU', 'L&T EduTech', 'Engineering Education', 'Placements']
  },
  {
    id: 'news-09',
    title: 'Dr. Manoj Kumar Re-Elected as President of Jalandhar Management Association (JMA - AIMA)',
    headline: 'Management Fraternity Unanimously Re-Elects Eminent Educationist and Administrator for Another Term',
    source: 'Amar Ujala / AIMA News',
    category: 'Institutional',
    date: 'December 2025',
    readTime: '2 min read',
    location: 'Jalandhar',
    excerpt: 'The governing council and corporate members of the Jalandhar Management Association (affiliated with All India Management Association, New Delhi) unanimously re-elected Prof. (Dr.) Manoj Kumar as President for the ongoing term.',
    fullContent: [
      'Under Dr. Manoj Kumar\'s dynamic leadership, JMA has organized numerous national management conventions, CEO roundtables, MSME export workshops, and women leadership summits, bridging the corporate-academic divide across the Doaba region.',
      'Members congratulated Dr. Kumar for his visionary contributions, which elevated JMA into one of the most vibrant local management associations recognized by AIMA nationally.',
      'In his address, Dr. Kumar promised to expand industry mentorship clinics for budding student entrepreneurs and launch executive certification programs in Artificial Intelligence for business managers.'
    ],
    keyHighlights: [
      'Unanimously re-elected as President, Jalandhar Management Association (AIMA)',
      'Bridging regional MSME industries with academic research and executive talent',
      'Organized prestigious CEO conclaves and executive leadership masterclasses'
    ],
    tags: ['AIMA', 'JMA President', 'Corporate Governance', 'Executive Leadership']
  },
  {
    id: 'news-10',
    title: 'Punjab Kesari Coverage: "DAV University Hosts Grand National Conference on Photonics & Quantum Communications"',
    headline: 'Over 200 Scientists, Researchers, and Academicians Converge for 2-Day International Technical Conclave',
    source: 'Punjab Kesari',
    category: 'Print Media',
    date: 'April 2025',
    readTime: '3 min read',
    location: 'Jalandhar',
    excerpt: 'DAV University organized a high-level International Conference on Optical Wireless and Quantum Technologies, drawing distinguished photonics researchers from IITs, NITs, and premier foreign universities.',
    fullContent: [
      'Inaugurating the conference, Patron & Vice-Chancellor Prof. (Dr.) Manoj Kumar delivered the keynote address on "Soliton Propagation in Dispersion-Managed Optical Fibres and Next-Generation 6G Optical Wireless Networks".',
      'The conference featured over 120 peer-reviewed research papers, interactive poster sessions, and technical exhibits showcasing indigenous IoT surveillance and health telemetry patents developed by university researchers.',
      'The chief guest and keynote speakers lauded DAV University\'s research infrastructure, advanced optical communication laboratories, and the vibrant culture of student inquiry fostered under Dr. Kumar\'s leadership.'
    ],
    keyHighlights: [
      'Over 200+ delegates from leading IITs, NITs, and international research universities',
      'Keynote on Soliton Propagation and 6G Optical Wireless Networks by Dr. Manoj Kumar',
      'Peer-reviewed conference proceedings published in Scopus-indexed Springer series'
    ],
    tags: ['Photonics', 'Conference', 'Punjab Kesari', 'Research Conclave']
  }
];
