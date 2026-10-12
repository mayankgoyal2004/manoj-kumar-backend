export interface Book {
  id: string;
  title: string;
  authors: string;
  publisher: string;
  location: string;
  year: number | string;
  isbn?: string;
  doi?: string;
  type: 'Authored' | 'Chapter' | 'Reviewed';
  description?: string;
}

export const booksList: Book[] = [
  // Authored Textbooks (09)
  {
    id: 'BOOK-01',
    title: 'Programming with LabVIEW 2012: Fundamentals to Advanced Topics in LabVIEW 2012 & Dedicated Hardware - USRP 2920 and Vector Signal Transceiver VST 5644R',
    authors: 'Gaurav Soni & Manoj Kumar',
    publisher: 'ACET/AKDP Publications',
    location: 'International Edition',
    year: 2017,
    isbn: '1520929072',
    type: 'Authored',
    description: 'Comprehensive graduate-level handbook covering graphical programming, software-defined radio (SDR), USRP RF hardware interfacing, and VST signal synthesis.'
  },
  {
    id: 'BOOK-02',
    title: 'Principles of Communication Engineering',
    authors: 'Prof. (Dr.) Manoj Kumar',
    publisher: 'M/s Satya Prakashan',
    location: 'New Delhi',
    year: 2014,
    isbn: '81-7684-445-4',
    type: 'Authored',
    description: 'Standard university textbook covering analog modulation, pulse code modulation, digital signaling techniques, noise analysis, and wireless transmission.'
  },
  {
    id: 'BOOK-03',
    title: 'Troubleshooting & Maintenance of Electronics Equipment',
    authors: 'Prof. (Dr.) Manoj Kumar',
    publisher: 'M/s Satya Prakashan',
    location: 'New Delhi',
    year: 2014,
    isbn: '81-7684-387-3',
    type: 'Authored',
    description: 'Practical engineering guide on diagnostic methodologies, testing instruments, PCB repair procedures, and reliability engineering of industrial electronic systems.'
  },
  {
    id: 'BOOK-04',
    title: 'Electronic Components & Materials',
    authors: 'Prof. (Dr.) Manoj Kumar',
    publisher: 'M/s Satya Prakashan',
    location: 'New Delhi',
    year: 2014,
    isbn: '81-7684-148-X',
    type: 'Authored',
    description: 'Detailed treatise on semiconductor physics, passive and active discrete components, dielectric materials, magnetic alloys, and fabrication processes.'
  },
  {
    id: 'BOOK-05',
    title: 'Communication Systems-I',
    authors: 'Dr. Ajay Sharma & Manoj Kumar',
    publisher: 'M/s Satya Prakashan',
    location: 'New Delhi',
    year: 2012,
    isbn: '81-7684-099-8',
    type: 'Authored',
    description: 'Foundational undergraduate textbook covering AM, FM, PM modulators, demodulators, superheterodyne receivers, and noise performance.'
  },
  {
    id: 'BOOK-06',
    title: 'Electronic Devices & Circuits – I',
    authors: 'K.D. Prasad & Manoj Kumar',
    publisher: 'M/s Satya Prakashan',
    location: 'New Delhi',
    year: 2012,
    isbn: '81-7684-173-3',
    type: 'Authored',
    description: 'Authoritative textbook on PN junction diodes, BJT amplifier configurations, JFETs, MOSFETs, and small-signal low-frequency models.'
  },
  {
    id: 'BOOK-07',
    title: 'Applied Power Electronics',
    authors: 'Prof. (Dr.) Manoj Kumar',
    publisher: 'M/s Satya Prakashan',
    location: 'New Delhi',
    year: 2012,
    isbn: '81-7684-080-7',
    type: 'Authored',
    description: 'Focuses on power semiconductor devices, SCRs, TRIACs, phase-controlled rectifiers, inverters, choppers, and industrial motor drive controls.'
  },
  {
    id: 'BOOK-08',
    title: 'Analog Communication Systems',
    authors: 'Manoj Kumar & Manisha',
    publisher: 'M/s Satya Prakashan',
    location: 'New Delhi',
    year: 2012,
    isbn: '81-7684-431-4',
    type: 'Authored',
    description: 'Rigorous analytical treatment of Fourier analysis, continuous-wave amplitude and angle modulation systems, and mathematical noise models.'
  },
  {
    id: 'BOOK-09',
    title: 'Basic Electrical & Electronics Engineering',
    authors: 'Manoj Kumar, Sudhir Sharma & Jagjit Singh Malhotra',
    publisher: 'M/s Jaico Publishers',
    location: 'Bombay',
    year: 2005,
    isbn: '81-7992-360-6',
    type: 'Authored',
    description: 'Widely adopted multidisciplinary textbook across national engineering curricula covering network theorems, AC circuits, transformers, and electronic devices.'
  },

  // Springer Book Chapters (04)
  {
    id: 'CHAP-01',
    title: 'Renewable Energy and Sustainable Transportation',
    authors: 'Manoj Kumar & Sudhir Sharma',
    publisher: 'Springer Nature (in: Role of Science and Technology for Sustainable Future)',
    location: 'Singapore',
    year: 2024,
    isbn: '978-981-97-0709-6 (eBook: 978-981-97-0710-2)',
    doi: '10.1007/978-981-97-0710-2',
    type: 'Chapter',
    description: 'Pages 375-414. Explores smart electric grid integration, EV fast-charging network infrastructure, and lifecycle carbon sustainability.'
  },
  {
    id: 'CHAP-02',
    title: 'Role of Public Health in Sustainable Development',
    authors: 'Prof. (Dr.) Manoj Kumar',
    publisher: 'Springer Nature (in: Role of Science and Technology for Sustainable Future)',
    location: 'Singapore',
    year: 2024,
    isbn: '978-981-97-0709-6 (eBook: 978-981-97-0710-2)',
    doi: '10.1007/978-981-97-0710-2',
    type: 'Chapter',
    description: 'Pages 433-438. Synthesizes digital healthcare technologies, preventative public health frameworks, and UN Sustainable Development Goals (SDGs).'
  },
  {
    id: 'CHAP-03',
    title: 'Biomedical Devices for Remote Diagnosis and Monitoring Based on IOT',
    authors: 'Manoj Kumar & Vinay Chopra',
    publisher: 'Springer Nature (in: Role of Science and Technology for Sustainable Future)',
    location: 'Singapore',
    year: 2024,
    isbn: '978-981-97-5176-1 (eBook: 978-981-97-5177-8)',
    doi: '10.1007/978-981-97-5177-8',
    type: 'Chapter',
    description: 'Pages 141-168. In-depth analysis of wireless biomedical sensor telemetry, low-power wearable transceivers, and real-time remote diagnostics.'
  },
  {
    id: 'CHAP-04',
    title: 'Bibliometric Analysis of Biomedical IOT Devices for Remote Diagnosis and Monitoring',
    authors: 'Manik Sharma & Manoj Kumar',
    publisher: 'Springer Nature (in: Role of Science and Technology for Sustainable Future)',
    location: 'Singapore',
    year: 2024,
    isbn: '978-981-97-5176-1 (eBook: 978-981-97-5177-8)',
    doi: '10.1007/978-981-97-5177-8',
    type: 'Chapter',
    description: 'Pages 189-203. Quantitative scientometric and citation mapping of emerging IoT medical device innovations and global research trajectories.'
  },

  // Textbooks Reviewed (05)
  {
    id: 'REV-01',
    title: 'Principles of Communication Systems (International Edition)',
    authors: 'Taub & Schilling',
    publisher: 'Tata McGraw-Hill Education',
    location: 'International Edition',
    year: 'Reviewed',
    type: 'Reviewed',
    description: 'Academic expert peer review and editorial enhancement for the worldwide benchmark textbook in communication engineering.'
  },
  {
    id: 'REV-02',
    title: 'Fundamentals of Semiconductor Devices',
    authors: 'K.N. Bhat & M.K. Achuthan',
    publisher: 'Tata McGraw-Hill Education',
    location: 'New Delhi',
    year: 'Reviewed',
    type: 'Reviewed',
    description: 'Curriculum alignment and technical validation review for university undergraduate and graduate programs.'
  },
  {
    id: 'REV-03',
    title: 'Electrical Networks',
    authors: 'Ravish R. Singh',
    publisher: 'Tata McGraw-Hill Education',
    location: 'New Delhi',
    year: 'Reviewed',
    type: 'Reviewed',
    description: 'Technical evaluation of circuit analysis pedagogy, graph theory representations, and transient response problem sets.'
  },
  {
    id: 'REV-04',
    title: 'Digital Signal Processing',
    authors: 'Salivahanan, Vallavaraj & Gnanapriya',
    publisher: 'Tata McGraw-Hill Education',
    location: 'New Delhi',
    year: 'Reviewed',
    type: 'Reviewed',
    description: 'In-depth review of DSP filter synthesis algorithms, FFT implementations, and digital signal processors.'
  },
  {
    id: 'REV-05',
    title: 'Communication Systems – An Introduction to Signals and Noise in Electrical Communication (5th Edition)',
    authors: 'A. Bruce Carlson & Paul B. Crilly',
    publisher: 'Tata McGraw-Hill Education',
    location: 'Global / Indian Edition',
    year: 'Reviewed',
    type: 'Reviewed',
    description: 'Peer evaluation for the 5th edition of the globally renowned classic communication textbook.'
  }
];
