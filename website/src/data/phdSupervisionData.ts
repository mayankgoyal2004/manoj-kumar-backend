export interface PhdScholar {
  id: number;
  scholarName: string;
  thesisTitle: string;
  awardDate: string;
  institution: string;
  domain: string;
  impactSummary: string;
}

export interface MtechThesis {
  id: number;
  scholarName: string;
  thesisTitle: string;
  year: number;
}

export const phdScholarsList: PhdScholar[] = [
  {
    id: 1,
    scholarName: 'Dr. Jagjit Singh Malhotra',
    thesisTitle: 'Performance evaluation of multi-channel optical transmission systems & networks',
    awardDate: '09th May, 2014',
    institution: 'IKGPTU, Jalandhar',
    domain: 'Optical Soliton & WDM Transmission',
    impactSummary: 'Evaluated nonlinear optical impairments and proposed path-averaged dispersion compensation maps for ultra-long haul links.'
  },
  {
    id: 2,
    scholarName: 'Dr. Manisha',
    thesisTitle: 'Simulative Performance Investigations on OCDMA System based on Advance Modulation & coding Techniques',
    awardDate: '10th October, 2017',
    institution: 'IKGPTU, Jalandhar',
    domain: 'Optical CDMA & Advanced Modulation',
    impactSummary: 'Designed novel 2D/3D optical orthogonal codes with improved bit-error-rate under high user capacity optical access networks.'
  },
  {
    id: 3,
    scholarName: 'Dr. Manwinder Singh',
    thesisTitle: 'Development of Quality of Service (QoS) Provisioning in Cognitive Radios',
    awardDate: '02nd August, 2019',
    institution: 'IKGPTU, Jalandhar',
    domain: 'Cognitive Radio & Dynamic Spectrum Allocation',
    impactSummary: 'Formulated dynamic spectrum sensing and priority queuing protocols ensuring high QoS for primary and secondary users.'
  },
  {
    id: 4,
    scholarName: 'Dr. Harpreet Kaur',
    thesisTitle: 'Investigations on Mobility Management of Wireless Networks',
    awardDate: '28th January, 2020',
    institution: 'IKGPTU, Jalandhar',
    domain: 'Wireless Mobility & Handoff Protocols',
    impactSummary: 'Developed seamless vertical handoff algorithms minimizing latency and packet loss across heterogeneous LTE/WiFi networks.'
  },
  {
    id: 5,
    scholarName: 'Dr. Sanjeev Kumar',
    thesisTitle: 'Information security through Robust and secure Image Steganography technique without perceptual distortion for Secret communication system',
    awardDate: '02nd April, 2021',
    institution: 'IKGPTU, Jalandhar',
    domain: 'Information Security & Digital Steganography',
    impactSummary: 'Pioneered distortion-free spatial and transform domain embedding algorithms resistant to RS and chi-square steganalysis.'
  },
  {
    id: 6,
    scholarName: 'Dr. Varsha',
    thesisTitle: 'Hybrid Energy Efficient Protocol in WSN',
    awardDate: '04th August, 2021',
    institution: 'IKGPTU, Jalandhar',
    domain: 'Wireless Sensor Networks (WSN)',
    impactSummary: 'Invented hybrid cluster-head selection algorithms significantly extending lifetime of sensor nodes in remote telemetry.'
  },
  {
    id: 7,
    scholarName: 'Dr. Ria Kalra',
    thesisTitle: 'Optimization and performance investigation of a Novel UWB Planar Antenna for UWB applications',
    awardDate: '2023',
    institution: 'IKGPTU, Jalandhar',
    domain: 'Ultra-Wideband Antennas & RF Design',
    impactSummary: 'Engineered compact planar microstrip antennas with triple band-notched characteristics filtering WLAN/WiMAX interference.'
  },
  {
    id: 8,
    scholarName: 'Dr. Vikram Dhiman',
    thesisTitle: 'Performance Investigation of Wireless Sensor Network on SDN SMAC Network',
    awardDate: '2023',
    institution: 'IKGPTU, Jalandhar',
    domain: 'Software-Defined Networking (SDN) & WSN',
    impactSummary: 'Integrated OpenFlow SDN controllers with sensor MAC protocols to optimize packet routing and energy consumption in IoT networks.'
  },
  {
    id: 9,
    scholarName: 'Dr. Shippu Sachdeva',
    thesisTitle: 'Investigations on High-Capacity Long Reach Passive Optical Networks',
    awardDate: '2023',
    institution: 'IKGPTU, Jalandhar',
    domain: 'Long-Reach PON & Optical Access',
    impactSummary: 'Modeled symmetric 40 Gbps TWDM-PON architectures extending reach to 100 km with optical amplification and electronic dispersion compensation.'
  }
];

export const mtechSupervisionList: MtechThesis[] = [
  { id: 1, scholarName: 'Manju Bala', thesisTitle: 'Performance Analysis of Switched and Routed Network in Wireless Communication Based on OPNET', year: 2007 },
  { id: 2, scholarName: 'Jagjit Singh Malhotra', thesisTitle: 'Performance Analysis of Data Formats in Optical Soliton Transmission Link under the impact of TOD & chirp', year: 2007 },
  { id: 3, scholarName: 'Gaurav Sethi', thesisTitle: 'Simulative Analysis of Routing Protocols in Mobile Ad-hoc Networks', year: 2007 },
  { id: 4, scholarName: 'Kamaljit Singh Bhatia', thesisTitle: 'Investigations on Design issues for Long-haul Optical Transmission System', year: 2007 },
  { id: 5, scholarName: 'Neeru Malhotra', thesisTitle: 'Investigations on PMD Induced Penalties in High Bit Rate Optical Transmission Links', year: 2008 },
  { id: 6, scholarName: 'Vasudha', thesisTitle: 'Performance Enhancement of Routing Internet Protocols using OPNET', year: 2008 },
  { id: 7, scholarName: 'Harsimran Jit Kaur', thesisTitle: 'Performance Evaluation of Digital Modulation Techniques on Radio over Fiber for 3G and Beyond', year: 2009 },
  { id: 8, scholarName: 'Bindiya Jain', thesisTitle: 'Performance analysis of data formats in Pre-and Post-compensated dispersion managed long-haul WDM optical transmission link', year: 2009 },
  { id: 9, scholarName: 'Vanita Kamra', thesisTitle: 'Analysis of a Single & Multi-tone Radio over Fibre system comparing four different system set-ups', year: 2009 },
  { id: 10, scholarName: 'Sandeep Kath', thesisTitle: 'Improving the request routing mechanism in CDN', year: 2010 },
  { id: 11, scholarName: 'Navneet Gill', thesisTitle: 'Comparative Studies on Hybrid and IPv6 Networks', year: 2010 },
  { id: 12, scholarName: 'Parwinder Singh', thesisTitle: 'High Data Rate TR-UWB system with resolved inter-frame interface using AWGN channel model', year: 2010 },
  { id: 13, scholarName: 'Gurkirat Kaur', thesisTitle: 'Performance Evaluation of Soft RoCE over 1 gigabit Ethernet', year: 2014 },
  { id: 14, scholarName: 'Parambir Singh', thesisTitle: 'Design & Performance Investigation of Multiuser OCDMA Network', year: 2014 },
  { id: 15, scholarName: 'Harjit Singh', thesisTitle: 'Investigation of Routing Protocols Based on VANETS', year: 2014 },
  { id: 16, scholarName: 'Balwinder Kaur', thesisTitle: 'Fuzzy Based Probability and Direction of Wildfire Detection with Wireless Sensor Networks', year: 2014 },
  { id: 17, scholarName: 'Gurminder Kaur', thesisTitle: 'Performance Evaluation of Routing Protocols Using Wormhole Attack under VANETs', year: 2015 },
  { id: 18, scholarName: 'Narpat Singh', thesisTitle: 'Face Recognition and Detection Technique Based on SURF & LDA', year: 2015 },
  { id: 19, scholarName: 'Bhupinder Singh', thesisTitle: 'A Modified Weight Balanced Algorithm For Influential Users Community Detection in Online Social Network', year: 2016 }
];
