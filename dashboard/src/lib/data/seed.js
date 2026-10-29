// Realistic mock content for the portfolio console. Front-end only.

const D = (days) => new Date(Date.UTC(2026, 9, 12) - days * 86400000).toISOString();
const IMG = {
  campus: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=70",
  library: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=70",
  lecture: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=70",
  ceremony: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=70",
  lab: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=70",
  meeting: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=70",
  students: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=70",
  podium: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=70",
  portrait: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=75",
  press: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=70",
};

export const SEED = {
  positions: [
    { role: "Vice-Chancellor", organisation: "DAV University, Jalandhar", location: "Jalandhar, Punjab", start_year: 2021, end_year: "", status: "Current", description: "Chief executive of the university; academic, administrative and financial governance across 9 schools.", updated_date: D(3) },
    { role: "Professor & Head, Department of Computer Science", organisation: "DAV University, Jalandhar", location: "Jalandhar, Punjab", start_year: 2016, end_year: 2021, status: "Completed", description: "Led curriculum reform, NAAC accreditation documentation and research lab setup.", updated_date: D(28) },
    { role: "Dean, Faculty of Engineering", organisation: "DAV University, Jalandhar", location: "Jalandhar, Punjab", start_year: 2018, end_year: 2020, status: "Completed", description: "Oversaw five departments, faculty recruitment and industry internship pipelines.", updated_date: D(96) },
    { role: "Professor, School of Computer Applications", organisation: "Lovely Professional University", location: "Phagwara, Punjab", start_year: 2011, end_year: 2016, status: "Completed", description: "Taught postgraduate programmes; established the AI and Data Science research group.", updated_date: D(180) },
    { role: "Associate Professor", organisation: "Chandigarh University", location: "Mohali, Punjab", start_year: 2008, end_year: 2011, status: "Completed", description: "Coordinated doctoral programme admissions and research evaluation.", updated_date: D(240) },
    { role: "Member Secretary, Internal Quality Assurance Cell", organisation: "DAV University, Jalandhar", location: "Jalandhar, Punjab", start_year: 2022, end_year: "", status: "Current", description: "Drives NAAC/NIRF submissions and continuous quality improvement.", updated_date: D(12) },
  ],

  education: [
    { degree: "Post-Doctoral Fellowship", institution: "University of Melbourne", specialization: "Machine Learning Systems", year: 2014, grade: "Awarded", status: "Verified", notes: "Visiting research fellowship in scalable learning systems.", updated_date: D(60) },
    { degree: "Ph.D. in Computer Science", institution: "Punjabi University, Patiala", specialization: "Soft Computing & Optimization", year: 2010, grade: "Supervisor: Prof. R. K. Sharma", status: "Verified", notes: "Thesis on metaheuristic optimisation for network design.", updated_date: D(120) },
    { degree: "M.Tech, Computer Science & Engineering", institution: "Punjab Technical University", specialization: "Data Engineering", year: 2005, grade: "First Division with Distinction", status: "Verified", updated_date: D(150) },
    { degree: "M.Sc. Information Technology", institution: "Panjab University, Chandigarh", specialization: "Information Systems", year: 2002, grade: "First Division", status: "Verified", updated_date: D(200) },
    { degree: "B.Sc. Computer Science", institution: "DAV College, Jalandhar", specialization: "Computer Science", year: 2000, grade: "First Division", status: "Verified", updated_date: D(210) },
    { degree: "Certified Data Protection Officer", institution: "International Association of Privacy Professionals", specialization: "Data Governance", year: 2021, grade: "Certification", status: "Pending", notes: "Renewal documentation awaited.", updated_date: D(22) },
  ],

  awards: [
    { title: "Vice-Chancellor of the Year — Higher Education", organisation: "Academic Excellence Council of India", category: "National", year: 2025, status: "Awarded", citation: "For transformational reform in outcome-based education and research governance.", updated_date: D(6) },
    { title: "Distinguished Scientist Award", organisation: "IEEE India Council", category: "International", year: 2024, status: "Awarded", citation: "Recognition of sustained contributions to computational intelligence.", updated_date: D(45) },
    { title: "Best Research Guide Award", organisation: "Punjab Technical University", category: "Institutional", year: 2023, status: "Awarded", citation: "For outstanding doctoral supervision and research mentoring.", updated_date: D(88) },
    { title: "Eminent Academician Honour", organisation: "Institution of Engineers (India)", category: "Professional Body", year: 2023, status: "Awarded", updated_date: D(130) },
    { title: "National Teacher Award — Nomination", organisation: "Ministry of Education", category: "National", year: 2026, status: "Nominated", citation: "Shortlisted for contribution to rural technology outreach.", updated_date: D(14) },
    { title: "Innovation Leadership Award", organisation: "G20 University Connect", category: "International", year: 2024, status: "Awarded", updated_date: D(160) },
  ],

  patents: [
    { title: "Adaptive Precision Irrigation Controller Using Edge Intelligence", patent_number: "202411039221", country: "India", filing_date: "2024-05-18", grant_date: "", inventors: "Manoj Kumar, S. Nanda, R. Gill", status: "Published", abstract: "A low-power controller that schedules irrigation from soil and weather telemetry without cloud dependency.", updated_date: D(9) },
    { title: "IoT Based Crop Health Monitoring System", patent_number: "412876", country: "India", filing_date: "2021-11-02", grant_date: "2024-02-19", inventors: "Manoj Kumar, A. Bansal", status: "Granted", abstract: "Multi-spectral imaging array with on-device disease classification for smallholder farms.", updated_date: D(40) },
    { title: "Blockchain Framework for Academic Credential Verification", patent_number: "202317018834", country: "India", filing_date: "2023-03-28", grant_date: "", inventors: "Manoj Kumar, P. Kaur", status: "Filed", updated_date: D(70) },
    { title: "Smart Water Quality Analyser with Predictive Alerts", patent_number: "4391221", country: "United States", filing_date: "2022-08-14", grant_date: "2025-06-03", inventors: "Manoj Kumar, V. Sharma", status: "Granted", abstract: "Electrochemical sensing unit coupled with a predictive contamination model.", updated_date: D(20) },
    { title: "Assistive Learning Device for Visually Impaired Learners", patent_number: "202211045612", country: "India", filing_date: "2022-09-09", grant_date: "", inventors: "Manoj Kumar, N. Rani", status: "Published", updated_date: D(112) },
    { title: "Legacy Telemetry Protocol Gateway", patent_number: "388112", country: "India", filing_date: "2016-04-11", grant_date: "2019-07-22", inventors: "Manoj Kumar", status: "Expired", updated_date: D(300) },
  ],

  publications: [
    { title: "Federated Learning for Privacy-Preserving Crop Disease Detection in Smallholder Networks", journal: "IEEE Transactions on AgriFood Electronics", authors: "M. Kumar, S. Nanda, P. Kaur", year: 2026, citations: 48, doi: "10.1109/TAFE.2026.3312881", indexing: "SCI", status: "Published", abstract: "A federated architecture that trains disease classifiers across farms without sharing raw imagery.", updated_date: D(2) },
    { title: "Explainable Gradient Boosting Models for Energy Demand Forecasting in University Campuses", journal: "Applied Energy", authors: "M. Kumar, R. Gill", year: 2025, citations: 112, doi: "10.1016/j.apenergy.2025.121944", indexing: "SCI", status: "Published", updated_date: D(18) },
    { title: "A Systematic Review of Deep Learning for Precision Irrigation", journal: "Computers and Electronics in Agriculture", authors: "M. Kumar, A. Bansal, S. Nanda", year: 2025, citations: 164, doi: "10.1016/j.compag.2025.108772", indexing: "Web of Science", status: "Published", updated_date: D(34) },
    { title: "Graph Neural Networks for Institutional Collaboration Mapping", journal: "Scientometrics", authors: "M. Kumar, V. Sharma", year: 2025, citations: 57, doi: "10.1007/s11192-025-04812-x", indexing: "Scopus", status: "Published", updated_date: D(52) },
    { title: "Low-Cost Air Quality Sensing Networks for Tier-2 Indian Cities", journal: "Journal of Environmental Informatics", authors: "M. Kumar, H. Singh", year: 2026, citations: 0, doi: "", indexing: "Scopus", status: "In Press", updated_date: D(8) },
    { title: "Adaptive Assessment Models for Outcome Based Education", journal: "IEEE Transactions on Education", authors: "M. Kumar, N. Rani, P. Kaur", year: 2026, citations: 0, doi: "", indexing: "SCI", status: "Under Review", updated_date: D(5) },
    { title: "Resource Optimisation in Edge-Assisted Smart Classrooms", journal: "Springer — Advances in Intelligent Systems", authors: "M. Kumar, R. Gill", year: 2026, citations: 0, doi: "", indexing: "Conference", status: "Draft", updated_date: D(1) },
    { title: "Metaheuristic Scheduling for Distributed Examination Systems", journal: "Soft Computing", authors: "M. Kumar", year: 2023, citations: 96, doi: "10.1007/s00500-023-08123-9", indexing: "SCI", status: "Published", updated_date: D(210) },
  ],

  supervision: [
    { scholar: "Simran Nanda", thesis: "Federated Learning Architectures for Agricultural Decision Support", program: "PhD", enrolled_year: 2022, co_supervisor: "Prof. A. Sharma", status: "Ongoing", progress: "Coursework complete; two SCI publications accepted. Synopsis scheduled for March 2027.", updated_date: D(4) },
    { scholar: "Rahul Gill", thesis: "Explainable Models for Campus Energy Optimisation", program: "PhD", enrolled_year: 2021, co_supervisor: "Dr. K. Menon", status: "Submitted", progress: "Thesis submitted; viva voce awaited.", updated_date: D(11) },
    { scholar: "Pooja Kaur", thesis: "Blockchain Credentialing for Higher Education Institutions", program: "PhD", enrolled_year: 2020, co_supervisor: "—", status: "Awarded", progress: "Degree awarded in 2025. Best thesis citation.", updated_date: D(64) },
    { scholar: "Harshit Singh", thesis: "Low-Cost Sensor Networks for Urban Air Quality", program: "PhD", enrolled_year: 2023, co_supervisor: "Dr. M. Bhandari", status: "Ongoing", progress: "Field deployment in Jalandhar complete; data analysis underway.", updated_date: D(7) },
    { scholar: "Neha Rani", thesis: "Assistive Learning Technologies for Inclusive Classrooms", program: "PhD", enrolled_year: 2022, co_supervisor: "Prof. S. Verma", status: "Ongoing", progress: "Patent filed; third paper under review.", updated_date: D(16) },
    { scholar: "Arjun Mehta", thesis: "Edge Inference for Industrial Telemetry", program: "M.Tech", enrolled_year: 2025, co_supervisor: "—", status: "Ongoing", progress: "Dissertation proposal approved.", updated_date: D(26) },
  ],

  books: [
    { title: "Computational Intelligence for Sustainable Agriculture", publisher: "Springer Nature", kind: "Authored Book", isbn: "978-981-99-4412-7", year: 2025, co_authors: "S. Nanda", status: "Published", abstract: "A practitioner-oriented treatment of learning systems deployed in agricultural value chains.", updated_date: D(10) },
    { title: "Machine Learning Systems: Design, Deployment and Governance", publisher: "Cambridge University Press", kind: "Authored Book", isbn: "978-1-009-44812-3", year: 2024, co_authors: "", status: "Published", updated_date: D(76) },
    { title: "Handbook of Outcome Based Education in Indian Universities", publisher: "Routledge", kind: "Edited Volume", isbn: "978-1-032-77821-0", year: 2025, co_authors: "P. Kaur, R. Gill (Eds.)", status: "Published", updated_date: D(36) },
    { title: "Privacy Engineering in Distributed Learning", publisher: "Springer", kind: "Chapter", isbn: "978-3-031-77881-2", year: 2026, co_authors: "S. Nanda", status: "In Press", abstract: "Chapter 7 — differential privacy budgets in cross-silo federated training.", updated_date: D(15) },
    { title: "Data Governance for Higher Education Institutions", publisher: "Taylor & Francis", kind: "Chapter", isbn: "978-1-003-55821-8", year: 2025, co_authors: "V. Sharma", status: "Published", updated_date: D(120) },
    { title: "Applied Metaheuristics for Network Design", publisher: "Wiley", kind: "Monograph", isbn: "", year: 2026, co_authors: "", status: "Draft", abstract: "Manuscript in preparation; two chapters drafted.", updated_date: D(3) },
  ],

  grants: [
    { project: "Centre for AI in Agriculture — Research Infrastructure", agency: "Department of Science & Technology", amount: 42500000, start_year: 2024, end_year: 2028, role: "Principal Investigator", status: "Active", outcomes: "Three labs commissioned; two patents filed.", updated_date: D(5) },
    { project: "Federated Learning Testbed for Distributed Sensing", agency: "Science and Engineering Research Board", amount: 12800000, start_year: 2023, end_year: 2026, role: "Principal Investigator", status: "Active", outcomes: "Six SCI publications; one PhD awarded.", updated_date: D(21) },
    { project: "Smart Campus Energy Optimisation Programme", agency: "Ministry of Education — RUSA", amount: 21600000, start_year: 2022, end_year: 2025, role: "Co-Investigator", status: "Completed", outcomes: "18% reduction in campus energy consumption.", updated_date: D(90) },
    { project: "Industry Consultancy — Precision Irrigation Deployment", agency: "AgriTech Industries Pvt. Ltd.", amount: 6800000, start_year: 2025, end_year: 2026, role: "Principal Investigator", status: "Active", outcomes: "Field trials across 40 hectares.", updated_date: D(13) },
    { project: "Inclusive Learning Technologies for Rural Schools", agency: "ICSSR", amount: 4200000, start_year: 2024, end_year: 2027, role: "Mentor", status: "Sanctioned", outcomes: "Sanction letter received; hiring in progress.", updated_date: D(8) },
    { project: "Water Quality Monitoring Network — Punjab Belt", agency: "Punjab State Council for Science & Technology", amount: 5600000, start_year: 2021, end_year: 2024, role: "Principal Investigator", status: "Completed", outcomes: "12 monitoring stations established.", updated_date: D(150) },
  ],

  mous: [
    { partner: "Tata Consultancy Services", country: "India", scope: "Joint research, internships and faculty development", signed_date: "2024-02-14", validity: "2024 – 2029", status: "Active", notes: "Renewed for a further five years with expanded scope.", updated_date: D(17) },
    { partner: "University of Melbourne", country: "Australia", scope: "Doctoral exchange and joint supervision", signed_date: "2023-08-09", validity: "2023 – 2028", status: "Active", updated_date: D(44) },
    { partner: "AgriTech Industries Pvt. Ltd.", country: "India", scope: "Precision agriculture deployment and consultancy", signed_date: "2025-01-22", validity: "2025 – 2028", status: "Signed", updated_date: D(29) },
    { partner: "Siemens Technology India", country: "India", scope: "Industry 4.0 laboratory and certification track", signed_date: "2022-11-30", validity: "2022 – 2025", status: "Expired", notes: "Renewal under negotiation.", updated_date: D(70) },
    { partner: "National Institute of Technology, Kurukshetra", country: "India", scope: "Shared instrumentation and research collaboration", signed_date: "2025-06-18", validity: "2025 – 2030", status: "Signed", updated_date: D(23) },
    { partner: "EduSkills Foundation", country: "India", scope: "Global immersion and digital skilling", signed_date: "2024-09-05", validity: "2024 – 2026", status: "Active", updated_date: D(58) },
  ],

  affiliations: [
    { body: "Association of Indian Universities — Governing Council", position: "Member", kind: "Governing Council", since: 2020, status: "Current", notes: "Represents North-Zone universities on policy matters.", updated_date: D(19) },
    { body: "IEEE Computational Intelligence Society", position: "Senior Member", kind: "Professional Body", since: 2012, status: "Current", updated_date: D(83) },
    { body: "UGC Committee on Outcome Based Education", position: "Invited Expert", kind: "Statutory Committee", since: 2022, status: "Current", notes: "Contributed to the national OBE framework draft.", updated_date: D(37) },
    { body: "Academic Senate, DAV University", position: "Chairperson", kind: "Academic Senate", since: 2021, status: "Current", updated_date: D(9) },
    { body: "Institution of Engineers (India)", position: "Fellow", kind: "Professional Body", since: 2015, status: "Current", updated_date: D(140) },
    { body: "Board of Studies, Punjabi University", position: "External Member", kind: "Statutory Committee", since: 2018, status: "Completed", updated_date: D(220) },
  ],

  conferences: [
    { title: "Responsible AI in Public Institutions", event: "IEEE International Conference on Technology and Society", location: "Tokyo, Japan", date: "2026-11-04", role: "Keynote", status: "Scheduled", summary: "Keynote on governance frameworks for institutional AI adoption.", updated_date: D(6) },
    { title: "Federated Learning for Agriculture at Scale", event: "ACM COMPASS", location: "New Delhi, India", date: "2026-07-19", role: "Invited Talk", status: "Delivered", updated_date: D(30) },
    { title: "Outcome Based Education — Implementation Realities", event: "AIU National Convention", location: "Bengaluru, India", date: "2026-04-11", role: "Panelist", status: "Delivered", updated_date: D(88) },
    { title: "Edge Intelligence for Sustainability", event: "Springer ICSCS", location: "Singapore", date: "2026-12-08", role: "Session Chair", status: "Scheduled", updated_date: D(12) },
    { title: "Institutional Data Governance", event: "Higher Education Summit", location: "Mumbai, India", date: "2025-10-02", role: "Invited Talk", status: "Delivered", updated_date: D(160) },
    { title: "Low-Cost Sensing for Urban Air Quality", event: "IEEE Sensors Conference", location: "Orlando, United States", date: "2026-09-21", role: "Paper Presentation", status: "Scheduled", summary: "Presented results from the Jalandhar deployment.", updated_date: D(3) },
  ],

  gallery: [
    { caption: "Convocation 2025 — Chancellor's procession", album: "Convocation", image: IMG.ceremony, date: "2025-12-14", credit: "University Media Cell", status: "Published", updated_date: D(4) },
    { caption: "Central library reading hall, restored wing", album: "Campus", image: IMG.library, date: "2025-08-02", credit: "Estates Office", status: "Published", updated_date: D(40) },
    { caption: "Inaugural address, International Research Conclave", album: "Leadership", image: IMG.podium, date: "2026-02-20", credit: "University Media Cell", status: "Published", updated_date: D(15) },
    { caption: "Centre for AI in Agriculture — instrumentation lab", album: "Research Labs", image: IMG.lab, date: "2026-05-11", credit: "Research Office", status: "Published", updated_date: D(26) },
    { caption: "Delegation meeting with industry partners", album: "Leadership", image: IMG.meeting, date: "2026-03-08", credit: "Corporate Relations", status: "Published", updated_date: D(33) },
    { caption: "Postgraduate seminar in session", album: "Campus", image: IMG.lecture, date: "2025-11-19", credit: "Faculty of Engineering", status: "Published", updated_date: D(58) },
    { caption: "Open day — student orientation on the main lawn", album: "Events", image: IMG.students, date: "2026-07-27", credit: "Admissions Office", status: "Published", updated_date: D(21) },
    { caption: "Faculty of Engineering building at dusk", album: "Campus", image: IMG.campus, date: "2026-01-16", credit: "Estates Office", status: "Draft", updated_date: D(2) },
  ],

  news: [
    { headline: "DAV University signs five-year research pact with TCS", outlet: "The Tribune", category: "Press Release", date: "2026-02-16", link: "https://www.tribuneindia.com", status: "Published", summary: "Coverage of the renewed partnership spanning joint research and student internships.", updated_date: D(7) },
    { headline: "NIRF 2026: Jalandhar university enters top 100 in engineering", outlet: "Hindustan Times", category: "Feature", date: "2026-08-24", link: "", status: "Published", summary: "Ranking improvement attributed to research output and placement reform.", updated_date: D(24) },
    { headline: "Interview — 'Outcome based education needs institutional courage'", outlet: "Education World", category: "Interview", date: "2026-06-09", link: "", status: "Published", updated_date: D(52) },
    { headline: "Vice-Chancellor conferred Distinguished Scientist Award", outlet: "Punjab Kesari", category: "Announcement", date: "2026-03-30", link: "", status: "Published", updated_date: D(72) },
    { headline: "Opinion: India's universities must publish in the open", outlet: "The Indian Express", category: "Opinion", date: "2026-09-18", link: "", status: "Draft", summary: "Draft commissioned column on open access mandates.", updated_date: D(1) },
    { headline: "Campus to host IEEE sensors conference regional round", outlet: "University Press Office", category: "Press Release", date: "2026-05-02", link: "", status: "Archived", updated_date: D(130) },
  ],

  media: [
    { name: "University crest — primary", kind: "Logo", folder: "Brand", image: IMG.campus, size: "180 KB", status: "Published", updated_date: D(11) },
    { name: "Convocation 2025 highlights", kind: "Video", folder: "Events", image: IMG.ceremony, size: "142 MB", status: "Published", updated_date: D(18) },
    { name: "Campus aerial collection", kind: "Image", folder: "Campus", image: IMG.campus, size: "8.4 MB", status: "Published", updated_date: D(27) },
    { name: "Research lab portfolio", kind: "Image", folder: "Campus", image: IMG.lab, size: "12.1 MB", status: "Published", updated_date: D(35) },
    { name: "Press kit — Vice-Chancellor portrait", kind: "Image", folder: "Press Kit", image: IMG.portrait, size: "3.2 MB", status: "Published", updated_date: D(9) },
    { name: "Annual Report 2026 (print)", kind: "Document", folder: "Publications", image: IMG.library, size: "6.8 MB", status: "Draft", updated_date: D(2) },
    { name: "Convocation stage backdrop artwork", kind: "Image", folder: "Events", image: IMG.podium, size: "14.6 MB", status: "Published", updated_date: D(48) },
    { name: "Faculty media briefing stills", kind: "Image", folder: "Press Kit", image: IMG.meeting, size: "5.3 MB", status: "Draft", updated_date: D(5) },
  ],

  documents: [
    { name: "Curriculum Vitae — Prof. (Dr.) Manoj Kumar", category: "Curriculum Vitae", file_type: "PDF", size: "420 KB", updated: "2026-09-30", visibility: "Public", status: "Published", notes: "Updated after the 2026 award cycle.", updated_date: D(12) },
    { name: "PhD degree certificate", category: "Certificates", file_type: "PDF", size: "1.1 MB", updated: "2026-04-12", visibility: "Internal", status: "Published", updated_date: D(80) },
    { name: "Research integrity and ethics policy", category: "Policy", file_type: "DOCX", size: "310 KB", updated: "2026-08-08", visibility: "Public", status: "Published", updated_date: D(30) },
    { name: "NIRF 2026 submission dossier", category: "Administration", file_type: "XLSX", size: "4.6 MB", updated: "2026-09-05", visibility: "Internal", status: "Published", updated_date: D(20) },
    { name: "Sponsored research guidelines", category: "Policy", file_type: "PDF", size: "780 KB", updated: "2026-06-21", visibility: "Public", status: "Draft", notes: "Awaiting legal review.", updated_date: D(6) },
    { name: "Consolidated publication list (2002 – 2026)", category: "Research", file_type: "PDF", size: "2.3 MB", updated: "2026-10-01", visibility: "Public", status: "Published", updated_date: D(3) },
    { name: "Board of Studies minutes — 2025", category: "Administration", file_type: "DOCX", size: "540 KB", updated: "2025-11-14", visibility: "Internal", status: "Archived", updated_date: D(200) },
  ],

  users: [
    { name: "Prof. (Dr.) Manoj Kumar", email: "drmanojkumarindia@gmail.com", role: "Super Admin", department: "Office of the Vice-Chancellor", last_active: "2026-10-12", status: "Active", updated_date: D(0) },
    { name: "Dr. Simran Nanda", email: "simran.nanda@davuniversity.org", role: "Editor", department: "Research Office", last_active: "2026-10-10", status: "Active", updated_date: D(2) },
    { name: "Rahul Gill", email: "rahul.gill@davuniversity.org", role: "Contributor", department: "Department of Computer Science", last_active: "2026-10-08", status: "Active", updated_date: D(4) },
    { name: "Pooja Kaur", email: "pooja.kaur@davuniversity.org", role: "Admin", department: "Academic Affairs", last_active: "2026-10-11", status: "Active", updated_date: D(1) },
    { name: "Vikram Sharma", email: "vikram.sharma@davuniversity.org", role: "Editor", department: "Media & Communications", last_active: "2026-09-29", status: "Active", updated_date: D(13) },
    { name: "Neha Rani", email: "neha.rani@davuniversity.org", role: "Viewer", department: "Internal Quality Assurance Cell", last_active: "2026-09-18", status: "Suspended", updated_date: D(24) },
    { name: "Estates Office", email: "estates@davuniversity.org", role: "Contributor", department: "Estates", last_active: "", status: "Invited", updated_date: D(7) },
  ],

  notifications: [
    { title: "12 publications imported from ORCID", kind: "Publishing", message: "The ORCID sync added 12 records to Research Publications. Review indexing metadata before publishing.", time: "2026-10-12", status: "Unread", updated_date: D(0) },
    { title: "MoU with Siemens Technology India has expired", kind: "System", message: "The MoU validity lapsed on 30 November 2025. Renewal documentation is pending.", time: "2026-10-11", status: "Unread", updated_date: D(1) },
    { title: "Two PhD progress reports awaiting review", kind: "Review", message: "Half-yearly progress reports for Simran Nanda and Neha Rani are ready for your review.", time: "2026-10-09", status: "Unread", updated_date: D(3) },
    { title: "New sign-in from an unrecognised device", kind: "Security", message: "A sign-in to this console was recorded from Chrome on Windows, Mohali. If this was not you, secure the account.", time: "2026-10-05", status: "Read", updated_date: D(7) },
    { title: "Annual Report 2026 draft is ready for approval", kind: "Review", message: "The media team submitted the 2026 annual report for final sign-off.", time: "2026-10-02", status: "Read", updated_date: D(10) },
    { title: "NIRF dossier submitted successfully", kind: "System", message: "The NIRF 2026 submission was accepted with a reference number.", time: "2026-09-05", status: "Read", updated_date: D(37) },
  ],
};

export const SEED_ACTIVITY = [
  { actor: "Prof. (Dr.) Manoj Kumar", action: "updated", module: "Research Publications", target: "Federated Learning for Privacy-Preserving Crop Disease Detection", time: D(0), ip: "10.24.6.18", kind: "update" },
  { actor: "Dr. Simran Nanda", action: "published", module: "News & Media", target: "DAV University signs five-year research pact with TCS", time: D(0), ip: "10.24.6.42", kind: "publish" },
  { actor: "Pooja Kaur", action: "created", module: "MoUs & Strategic Alliances", target: "EduSkills Foundation", time: D(1), ip: "10.24.7.11", kind: "create" },
  { actor: "Prof. (Dr.) Manoj Kumar", action: "published", module: "Campus & Leadership Gallery", target: "Convocation 2025 — Chancellor's procession", time: D(1), ip: "10.24.6.18", kind: "publish" },
  { actor: "Rahul Gill", action: "updated", module: "PhD Supervision & Mentorship", target: "Harshit Singh", time: D(2), ip: "10.24.9.7", kind: "update" },
  { actor: "Vikram Sharma", action: "archived", module: "News & Media", target: "Campus to host IEEE sensors conference regional round", time: D(3), ip: "10.24.8.23", kind: "archive" },
  { actor: "Prof. (Dr.) Manoj Kumar", action: "created", module: "Research Grants & Funding", target: "Industry Consultancy — Precision Irrigation Deployment", time: D(4), ip: "10.24.6.18", kind: "create" },
  { actor: "Pooja Kaur", action: "invited", module: "Users & Roles", target: "estates@davuniversity.org", time: D(5), ip: "10.24.7.11", kind: "create" },
  { actor: "Dr. Simran Nanda", action: "updated", module: "Books Authored & Chapters", target: "Privacy Engineering in Distributed Learning", time: D(6), ip: "10.24.6.42", kind: "update" },
  { actor: "Prof. (Dr.) Manoj Kumar", action: "deleted", module: "Media Library", target: "Old convocation B-roll (duplicate)", time: D(8), ip: "10.24.6.18", kind: "delete" },
];