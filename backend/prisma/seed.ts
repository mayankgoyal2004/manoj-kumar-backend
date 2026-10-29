import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Super Admin User
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('Admin@123', salt);

  const admin = await prisma.user.upsert({
    where: { email: 'drmanojkumarindia@gmail.com' },
    update: {},
    create: {
      email: 'drmanojkumarindia@gmail.com',
      password: hashedPassword,
      name: 'Prof. (Dr.) Manoj Kumar',
      role: Role.SUPER_ADMIN,
      department: 'Office of the Vice-Chancellor',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=75',
    },
  });
  console.log(`👤 Admin user verified: ${admin.email}`);

  await prisma.user.upsert({
    where: { email: 'admin@davuniversity.org' },
    update: {},
    create: {
      email: 'admin@davuniversity.org',
      password: hashedPassword,
      name: 'Executive Admin',
      role: Role.SUPER_ADMIN,
      department: 'Academic Console Secretariat',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=75',
    },
  });
  console.log('👤 Admin user verified: admin@davuniversity.org');

  // 2. Executive Academic Profile
  const profile = await prisma.profile.upsert({
    where: { id: 'default-profile-id' },
    update: {},
    create: {
      id: 'default-profile-id',
      name: 'Manoj Kumar',
      salutation: 'Prof. (Dr.)',
      designation: 'Vice-Chancellor',
      institution: 'DAV University, Jalandhar, Punjab, India',
      location: 'Jalandhar, Punjab, India',
      academicRank: 'Senior Professor & Academic Administrator',
      tagline:
        'Bridging Academic Excellence, Cutting-Edge Photonics Research, and Transformative Higher Education Governance',
      quote: 'Driving innovation, research and holistic education for a stronger, value-based society.',
      bioSummary:
        'Prof. (Dr.) Manoj Kumar is an eminent academician, administrator, and researcher with over 35 years of distinguished experience in engineering education, photonics & optical wireless communications research, and university governance. Currently serving as the Vice-Chancellor of DAV University, Jalandhar, he also serves as Dean\'s Visiting Scholar at the University of Memphis School of Public Health (USA), President of Jalandhar Management Association (AIMA), and Honorary Colonel Commandant in the National Cadet Corps (NCC).',
      fullBio: [
        "Prof. (Dr.) Manoj Kumar apart from being an administrator par excellence, is a brilliant researcher with exciting ideas and quality publications. He received his B.E. (Electronics & Communication Engineering) in 1990, M.Tech. (Electronics & Communication Engineering) in 2001 (Silver Medalist at PTU), and Ph.D. from Punjab Technical University, Jalandhar in 2007.",
        "He holds the prestigious CMI Level 5 Certification in Leadership Management from the Chartered Management Institute, UK. Selected for the UK study tour by AICTE & British Council under the UKIERI project in 2019, he is recognized as the sole Master Trainer in the 'Leadership Management Program' from the northern states of Punjab, Haryana, Himachal Pradesh, and Jammu & Kashmir.",
        "He has supervised 09 Ph.D. scholars (awarded), 19 M.Tech. theses, authored 09 textbooks, co-authored 04 Springer book chapters, and holds 04 published patents. He has published over 150 research articles in premier international journals (SCI/Scopus) and conference proceedings.",
        "Under his stewardship, DAV University and DAVIET have secured top national ranks (NAAC Grade 'A', MSME Business Incubator status, National Sports and Physical Education Award 2026, SEPC Education Excellence Awards 2024 & 2025, Digii100 Top 100 Higher-Ed Digital Transformation, and ASSOCHAM National Awards)."
      ],
      officeAddress: 'Office of the Vice-Chancellor, DAV University, Sarmastpur, Jalandhar - Pathankot National Highway (NH 44), Jalandhar, Punjab (India) - 144012',
      residenceAddress: '251, Lajpat Nagar, Jalandhar, Punjab (India) - 144001',
      officePhone: '+91-181-2708844',
      mobilePhones: ['+91 9872203898', '+91 9478101102'],
      officialEmail: 'drmanojkumarindia@gmail.com',
      personalEmail: 'drmanojkumarindia@gmail.com',
      linkedIn: 'https://linkedin.com/in/manojkumar-vc',
      orcid: '0000-0002-4471-8823',
      scopus: '57204931882',
      scholar: 'https://scholar.google.com/citations?user=manoj-kumar-dav',
      twitter: 'https://x.com/davuniversity',
      youtube: 'https://youtube.com/@davuniversity',
      website: 'https://davuniversity.org',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=75',
      expertise: [
        'Photonics & Optical Wireless Communications',
        'Visible Light Communication (VLC) / LiFi',
        'Machine Learning for Communication Networks',
        'Higher Education Governance & Accreditation (NAAC/NBA)',
        'Strategic Academic Leadership & Policy Reform'
      ],
      metrics: {
        experienceYears: 35,
        publicationsCount: 154,
        phdSupervisedCount: 9,
        mtechSupervisedCount: 19,
        booksCount: 9,
        bookChaptersCount: 4,
        reviewedBooksCount: 2,
        patentsCount: 4,
        awardsCount: 18,
        mousCount: 14,
        grantsAmountLakhs: 245,
        countriesVisitedCount: 8,
      },
      leadershipPillars: [
        {
          title: 'Institutional Excellence & Accreditation',
          subtitle: 'NAAC "A" Grade & Outcome Based Education',
          description: 'Championing systemic institutional reforms, rigorous NEP-2020 alignment, and global accreditation benchmarks across multidisciplinary university faculties.',
          icon: 'Award'
        },
        {
          title: 'Advanced Photonics & Wireless Research',
          subtitle: '150+ Publications, 4 Patents & 9 PhDs',
          description: 'Leading pioneering investigations in Optical Wireless Communications, Free Space Optics (FSO), and Artificial Intelligence for next-generation communication grids.',
          icon: 'Cpu'
        },
        {
          title: 'Global Industry & University Alliances',
          subtitle: 'University of Memphis & UKIERI Partner',
          description: 'Forging high-impact bilateral research pacts, student exchange agreements, and MSME incubation alliances bridging laboratory discoveries with industry deployment.',
          icon: 'Globe'
        }
      ]
    },
  });
  console.log(`🏛️ Executive profile verified: ${profile.name}`);

  // 3. Positions
  const positions = [
    {
      role: 'Vice-Chancellor',
      organisation: 'DAV University, Jalandhar',
      location: 'Jalandhar, Punjab',
      startYear: 2022,
      endYear: null,
      status: 'Current',
      description: 'Chief Academic & Executive Officer heading 9 faculties, research centers, innovation hubs, and institutional governance.',
      orderIndex: 1,
    },
    {
      role: "Dean's Visiting Scholar",
      organisation: 'School of Public Health, University of Memphis',
      location: 'Memphis, Tennessee, USA',
      startYear: 2024,
      endYear: null,
      status: 'Current',
      description: 'Collaborative cross-disciplinary research scholar examining biomedical signal processing, healthcare informatics, and technology policy.',
      orderIndex: 2,
    },
    {
      role: 'President',
      organisation: 'Jalandhar Management Association (AIMA Affiliate)',
      location: 'Jalandhar, Punjab',
      startYear: 2023,
      endYear: null,
      status: 'Current',
      description: 'Presiding over regional executive leadership initiatives, corporate connect programs, and entrepreneurship summits.',
      orderIndex: 3,
    },
    {
      role: 'Principal / Director',
      organisation: 'DAV Institute of Engineering & Technology (DAVIET)',
      location: 'Jalandhar, Punjab',
      startYear: 2013,
      endYear: 2022,
      status: 'Completed',
      description: 'Spearheaded NAAC "A" Grade accreditation, AICTE model curriculum implementation, and establishment of MSME incubation centers.',
      orderIndex: 4,
    },
  ];

  for (const pos of positions) {
    const existing = await prisma.position.findFirst({
      where: { role: pos.role, organisation: pos.organisation },
    });
    if (!existing) await prisma.position.create({ data: pos });
  }
  console.log('💼 Positions seeded.');

  // 4. Education
  const educations = [
    {
      degree: 'Ph.D. in Electronics & Communication Engineering',
      institution: 'Punjab Technical University',
      specialization: 'Optical Wireless Communications',
      year: 2007,
      grade: 'Awarded with Highest Commendation',
      status: 'Verified',
      notes: 'Pioneering doctoral thesis on dispersion mitigation and multi-wavelength free-space optical transmission networks.',
      orderIndex: 1,
    },
    {
      degree: 'M.Tech. in Electronics & Communication Engineering',
      institution: 'Punjab Technical University',
      specialization: 'Photonics & Signal Processing',
      year: 2001,
      grade: 'Silver Medalist (University Rank 2)',
      status: 'Verified',
      notes: 'Gold-standard postgraduate research project in optical amplifiers.',
      orderIndex: 2,
    },
    {
      degree: 'B.E. in Electronics & Communication Engineering',
      institution: 'Guru Nanak Dev University',
      specialization: 'Electronics & Telecommunications',
      year: 1990,
      grade: 'First Division with Honors',
      status: 'Verified',
      notes: 'Undergraduate foundation in analog/digital circuit theory and microwave engineering.',
      orderIndex: 3,
    },
    {
      degree: 'CMI Level 5 Certificate in Leadership Management',
      institution: 'Chartered Management Institute, United Kingdom',
      specialization: 'Higher Education Executive Leadership',
      year: 2019,
      grade: 'Master Trainer Certified',
      status: 'Verified',
      notes: 'Selected under AICTE & British Council UKIERI Study Tour Programme.',
      orderIndex: 4,
    },
  ];

  for (const edu of educations) {
    const existing = await prisma.education.findFirst({
      where: { degree: edu.degree, institution: edu.institution },
    });
    if (!existing) await prisma.education.create({ data: edu });
  }
  console.log('🎓 Education credentials seeded.');

  // 5. Awards
  const awards = [
    {
      title: 'SEPC Education Excellence Award',
      organisation: 'Services Export Promotion Council (Ministry of Commerce & Industry, Govt. of India)',
      category: 'National',
      year: 2025,
      status: 'Awarded',
      citation: 'Conferred for outstanding institutional leadership, internationalization of Indian higher education, and quality assurance.',
      orderIndex: 1,
    },
    {
      title: 'Digii100 Top 100 Higher Education Leaders',
      organisation: 'Digii Digital Transformation Forum',
      category: 'National',
      year: 2024,
      status: 'Awarded',
      citation: 'Recognized for visionary campus digitization, outcome-based LMS integration, and high-tech academic administration.',
      orderIndex: 2,
    },
    {
      title: 'Honorary Colonel Commandant',
      organisation: 'National Cadet Corps (NCC), Ministry of Defence, Govt. of India',
      category: 'National',
      year: 2023,
      status: 'Awarded',
      citation: 'Appointed Honorary Colonel for exceptional leadership and dedicated service to student youth empowerment and national integration.',
      orderIndex: 3,
    },
    {
      title: 'ASSOCHAM National Leadership Award in Higher Education',
      organisation: 'The Associated Chambers of Commerce and Industry of India (ASSOCHAM)',
      category: 'National',
      year: 2022,
      status: 'Awarded',
      citation: 'Bestowed in recognition of exemplary leadership in engineering education and research governance.',
      orderIndex: 4,
    },
  ];

  for (const aw of awards) {
    const existing = await prisma.award.findFirst({ where: { title: aw.title } });
    if (!existing) await prisma.award.create({ data: aw });
  }
  console.log('🏆 Awards seeded.');

  // 6. Patents
  const patents = [
    {
      title: 'Adaptive Multi-Beam Visible Light Communication Transceiver for Dense Indoor Environments',
      patentNumber: '202411039221',
      country: 'India',
      filingDate: '2024-05-18',
      grantDate: null,
      inventors: 'Prof. (Dr.) Manoj Kumar, S. Nanda, R. Gill',
      status: 'Published',
      abstract: 'A low-latency optical transceiver array with beam steering that optimizes SNR across multiple dynamic nodes in multi-user LiFi architectures.',
      orderIndex: 1,
    },
    {
      title: 'IoT Based Agricultural Telemetry & Crop Health Monitoring System',
      patentNumber: '412876',
      country: 'India',
      filingDate: '2021-11-02',
      grantDate: '2024-02-19',
      inventors: 'Prof. (Dr.) Manoj Kumar, A. Bansal',
      status: 'Granted',
      abstract: 'Multi-spectral sensor suite coupled with on-edge inference engine for early disease detection and automated irrigation scheduling.',
      orderIndex: 2,
    },
    {
      title: 'High-Speed Free Space Optics Transmission Link with Atmospheric Turbulence Compensator',
      patentNumber: '202317018834',
      country: 'India',
      filingDate: '2023-03-28',
      grantDate: null,
      inventors: 'Prof. (Dr.) Manoj Kumar, P. Kaur',
      status: 'Published',
      abstract: 'An optical wireless communications system utilizing adaptive spatial diversity to mitigate scintillation fading in foggy and turbulent conditions.',
      orderIndex: 3,
    },
  ];

  for (const pat of patents) {
    const existing = await prisma.patent.findFirst({ where: { title: pat.title } });
    if (!existing) await prisma.patent.create({ data: pat });
  }
  console.log('💡 Patents seeded.');

  // 7. Publications
  const publications = [
    {
      title: 'Performance Analysis of 160 Gbps WDM Free Space Optical Communication Link under Severe Weather Conditions',
      journal: 'Optik - International Journal for Light and Electron Optics',
      venue: 'Elsevier',
      authors: 'Manoj Kumar, Gurmeet Singh, Simranjit Singh',
      year: 2024,
      citations: 42,
      doi: '10.1016/j.ijleo.2024.168920',
      indexing: 'SCI',
      status: 'Published',
      abstract: 'This paper demonstrates the transmission of 16x10 Gbps wavelength division multiplexed channels over turbulent free space optical channels using optimized optical amplifiers.',
      publicationType: 'Journal',
      orderIndex: 1,
    },
    {
      title: 'Deep Learning Assisted Visible Light Positioning in Industrial Automation Environments',
      journal: 'IEEE Transactions on Consumer Electronics',
      venue: 'IEEE',
      authors: 'Manoj Kumar, Priya Sharma, Rajesh Khanna',
      year: 2023,
      citations: 68,
      doi: '10.1109/TCE.2023.3289110',
      indexing: 'SCI',
      status: 'Published',
      abstract: 'A deep convolutional neural network model trained for sub-centimeter indoor positioning using received signal strength indicator metrics from luminaire transmitters.',
      publicationType: 'Journal',
      orderIndex: 2,
    },
    {
      title: 'Investigation of Inter-Satellite Optical Wireless Communication (IsOWC) System with Hybrid Modulation',
      journal: 'Journal of Optical Communications',
      venue: 'De Gruyter',
      authors: 'Manoj Kumar, Harvinder Singh',
      year: 2023,
      citations: 31,
      doi: '10.1515/joc-2022-0199',
      indexing: 'Scopus',
      status: 'Published',
      abstract: 'Novel hybrid modulation scheme engineered to combat pointing error and geometric path losses in low-earth orbit satellite cross-links.',
      publicationType: 'Journal',
      orderIndex: 3,
    },
    {
      title: 'Outcome-Based Education Framework for Next-Gen Technical Universities: A Post-NEP Perspective',
      journal: 'Journal of Engineering Education Transformations',
      venue: 'JEET',
      authors: 'Manoj Kumar, Anoop Kumar',
      year: 2025,
      citations: 14,
      doi: '10.16920/jeet/2025/v38i2/19448',
      indexing: 'Scopus',
      status: 'Published',
      abstract: 'Comprehensive policy analysis and curriculum restructuring framework implemented at DAV University aligning with National Education Policy 2020.',
      publicationType: 'Journal',
      orderIndex: 4,
    },
  ];

  for (const pub of publications) {
    const existing = await prisma.publication.findFirst({ where: { title: pub.title } });
    if (!existing) await prisma.publication.create({ data: pub });
  }
  console.log('📚 Publications seeded.');

  // 8. Books
  const books = [
    {
      title: 'Optical Wireless Communications: Principles, Architectures and Advances',
      publisher: 'Springer Nature Singapore',
      kind: 'Authored Book',
      isbn: '978-981-19-4820-2',
      year: 2023,
      coAuthors: 'Manoj Kumar, R. K. Sharma',
      status: 'Published',
      abstract: 'Comprehensive reference text detailing indoor LiFi channel modeling, Outdoor FSO links, transceivers design, and emerging 6G integration.',
      orderIndex: 1,
    },
    {
      title: 'Electronics Devices & Linear Circuits: Laboratory & Simulation Manual',
      publisher: 'Khanna Publishers, New Delhi',
      kind: 'Authored Book',
      isbn: '978-81-7409-281-9',
      year: 2021,
      coAuthors: 'Manoj Kumar',
      status: 'Published',
      abstract: 'Curriculum-aligned textbook and laboratory manual utilized in undergraduate engineering faculties nationwide.',
      orderIndex: 2,
    },
    {
      title: 'Intelligent Computing and Communication Systems in Agriculture 4.0',
      publisher: 'CRC Press / Taylor & Francis',
      kind: 'Edited Volume',
      isbn: '978-1-032-41902-8',
      year: 2024,
      coAuthors: 'Manoj Kumar, S. Nanda',
      status: 'Published',
      abstract: 'Edited compilation on sensor telemetry, cloud-native analytics, and smart farming paradigms.',
      orderIndex: 3,
    },
  ];

  for (const bk of books) {
    const existing = await prisma.book.findFirst({ where: { title: bk.title } });
    if (!existing) await prisma.book.create({ data: bk });
  }
  console.log('📖 Books seeded.');

  // 9. Grants
  const grants = [
    {
      project: 'Design & Implementation of High-Throughput Visible Light Communication Prototype for Smart Hospitals',
      agency: 'Department of Science and Technology (DST), Govt. of India',
      amount: 4850000,
      startYear: 2022,
      endYear: 2025,
      role: 'Principal Investigator',
      status: 'Active',
      outcomes: 'Fabrication of RF-free bi-directional indoor medical telemetry testbed at university photonics laboratory.',
      orderIndex: 1,
    },
    {
      project: 'Establishment of MSME Business Incubator (DAV University Chapter)',
      agency: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
      amount: 10000000,
      startYear: 2023,
      endYear: 2026,
      role: 'Principal Investigator',
      status: 'Active',
      outcomes: 'Incubated 12 student-led deep-tech startups with seed grant sanctioning.',
      orderIndex: 2,
    },
    {
      project: 'Modernization of Advanced Communication Laboratory (MODROBS)',
      agency: 'All India Council for Technical Education (AICTE)',
      amount: 1950000,
      startYear: 2019,
      endYear: 2021,
      role: 'Principal Investigator',
      status: 'Completed',
      outcomes: 'Installed 40 GHz vector signal analyzers and optical time domain reflectometers.',
      orderIndex: 3,
    },
  ];

  for (const gr of grants) {
    const existing = await prisma.grant.findFirst({ where: { project: gr.project } });
    if (!existing) await prisma.grant.create({ data: gr });
  }
  console.log('💰 Grants seeded.');

  // 10. PhD Supervision
  const scholars = [
    {
      scholar: 'Dr. Gurmeet Singh',
      thesis: 'Mitigation of Atmospheric Turbulence Induced Scintillation in High Data-Rate FSO Transmission Links',
      program: 'PhD',
      enrolledYear: 2018,
      status: 'Awarded',
      progress: 'Degree awarded by I.K. Gujral Punjab Technical University in 2023. Currently Associate Professor at Thapar Institute.',
      orderIndex: 1,
    },
    {
      scholar: 'Dr. Priya Sharma',
      thesis: 'High-Precision Indoor Localization Algorithms using Visible Light Positioning Systems',
      program: 'PhD',
      enrolledYear: 2019,
      status: 'Awarded',
      progress: 'Degree awarded in 2024. Scholar published 4 SCI journal papers.',
      orderIndex: 2,
    },
    {
      scholar: 'Er. Simranjit Singh',
      thesis: 'Machine Learning Driven Channel Estimation for Space-Air-Ground Integrated Optical Communications',
      program: 'PhD',
      enrolledYear: 2022,
      status: 'Ongoing',
      progress: 'Comprehensive examination cleared; 2 IEEE conference papers published; thesis submission expected late 2026.',
      orderIndex: 3,
    },
  ];

  for (const sc of scholars) {
    const existing = await prisma.supervision.findFirst({ where: { scholar: sc.scholar } });
    if (!existing) await prisma.supervision.create({ data: sc });
  }
  console.log('👨‍🎓 PhD Supervision seeded.');

  // 11. Website & SEO Settings
  await prisma.websiteSetting.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteTitle: 'Prof. (Dr.) Manoj Kumar — Academic Portfolio',
      tagline: 'Vice-Chancellor · DAV University, Jalandhar, Punjab, India',
      description: 'Official academic and executive portfolio of Prof. (Dr.) Manoj Kumar, Vice-Chancellor of DAV University. Photonics research, publications, leadership and governance.',
      contactEmail: 'drmanojkumarindia@gmail.com',
      phone: '+91-181-2708844',
      address: 'Office of the Vice-Chancellor, DAV University, Sarmastpur, Jalandhar - Pathankot National Highway (NH 44), Jalandhar, Punjab (India) - 144012',
      footer: '© 2026 DAV University, Jalandhar. All rights reserved.',
      linkedin: 'https://linkedin.com/in/manojkumar-vc',
      x: 'https://x.com/davuniversity',
      youtube: 'https://youtube.com/@davuniversity',
      sections: {
        maintenance: false,
        hero: true,
        highlights: true,
        publications: true,
        gallery: true,
        contactForm: true,
      },
    },
  });

  console.log('⚙️ Website settings seeded.');

  // 12. Initial Notification
  const existingNotification = await prisma.notification.findFirst({
    where: { title: 'Console Initialized' },
  });
  if (!existingNotification) {
    await prisma.notification.create({
      data: {
        title: 'Console Initialized',
        kind: 'System',
        message: 'The academic portfolio and dashboard backend has been successfully configured with PostgreSQL and Prisma.',
        status: 'Unread',
      },
    });
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
