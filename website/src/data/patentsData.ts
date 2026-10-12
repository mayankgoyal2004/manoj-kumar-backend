export interface Patent {
  id: string;
  patentNumber: string;
  title: string;
  filingDate: string;
  publicationDate: string;
  status: 'Published' | 'Granted';
  domain: string;
  description: string;
  inventors: string[];
  keyUtility: string[];
}

export const patentsList: Patent[] = [
  {
    id: 'PAT-01',
    patentNumber: '202011044438 A',
    title: 'Integrated Digital Communication System for Sending, Receiving and Managing Emails and Short Messages',
    filingDate: '13/10/2020',
    publicationDate: '19/03/2021',
    status: 'Published',
    domain: 'Telecommunications & Secure Messaging Protocols',
    description: 'A novel unified hardware-software architecture for high-throughput, encrypted cross-network transmission and synchronized management of multi-format electronic mail and cellular short messages.',
    inventors: ['Prof. (Dr.) Manoj Kumar et al.'],
    keyUtility: [
      'Seamless multi-channel message aggregation across disparate networks',
      'End-to-end cryptographic integrity verification for mission-critical enterprise communications',
      'Optimized bandwidth utilization for low-latency transmission in constrained bandwidth environments'
    ]
  },
  {
    id: 'PAT-02',
    patentNumber: '202211020135 A',
    title: 'Illegal Activities Detection Through CCTV Scanning Using Image Processing',
    filingDate: '04/04/2022',
    publicationDate: '22/04/2022',
    status: 'Published',
    domain: 'Computer Vision & Automated Intelligent Surveillance',
    description: 'An AI-powered real-time computer vision system that continuously processes CCTV visual video streams to automatically identify, classify, and alert authorities regarding suspicious behaviors, weapon detection, and unauthorized perimeter breaches.',
    inventors: ['Prof. (Dr.) Manoj Kumar et al.'],
    keyUtility: [
      'Real-time anomaly detection using edge-optimized deep learning convolutional filters',
      'Low false-positive rate through spatiotemporal motion boundary modeling',
      'Automated dispatch alerts integrated with municipal and campus security infrastructure'
    ]
  },
  {
    id: 'PAT-03',
    patentNumber: '475097-001',
    title: 'Energy Harvesting Health Monitoring Device',
    filingDate: '27/09/2025',
    publicationDate: '18/12/2025',
    status: 'Published',
    domain: 'Biomedical IoT & Self-Powered Wearable Electronics',
    description: 'A wearable non-invasive health monitoring device integrating piezoelectric and thermoelectric energy harvesting mechanisms to power continuous multi-parameter physiological sensors without requiring frequent external battery recharging.',
    inventors: ['Prof. (Dr.) Manoj Kumar et al.'],
    keyUtility: [
      'Self-sustaining ambient and kinetic thermal energy harvesting modules',
      'Continuous remote monitoring of vital biomedical biomarkers (ECG, SpO2, Temperature)',
      'Direct synchronization with cloud electronic health records (EHR) for remote telemedicine'
    ]
  },
  {
    id: 'PAT-04',
    patentNumber: '475095-001',
    title: 'Multisensor Equipped Water Monitoring Machine',
    filingDate: '27/09/2025',
    publicationDate: '15/01/2026',
    status: 'Published',
    domain: 'Environmental IoT & Smart Water Quality Diagnostics',
    description: 'An advanced multi-sensor autonomous monitoring unit for continuous in-situ physicochemical and microbiological testing of potable and industrial water supplies with real-time remote dashboard analytics.',
    inventors: ['Prof. (Dr.) Manoj Kumar et al.'],
    keyUtility: [
      'Simultaneous multi-parameter telemetry (pH, turbidity, heavy metal trace ions, TDS, dissolved oxygen)',
      'Decentralized remote fleet management for urban and university campus water networks',
      'Predictive contamination outbreak alerts using onboard statistical anomaly algorithms'
    ]
  }
];
