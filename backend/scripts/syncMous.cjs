/**
 * Script to synchronize and replace all MoU entries in PostgreSQL database
 * with the exact, verbatim MoUs from Prof. (Dr.) Manoj Kumar's Curriculum Vitae (Pages 12–14).
 *
 * Usage:
 *   node scripts/syncMous.cjs
 *   npm run mou:sync
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mousData = [
  // ==========================================
  // SECTION 1: MoUs signed with International Universities (CV Pages 13–14)
  // ==========================================
  {
    partner: "International Consortium of Universities (IIE), Boston, US & The Danish Consortium for Academic Craftsmanship (DCAC), Denmark",
    category: "International Universities",
    country: "USA & Denmark",
    scope: "MoU with ‘International Consortium of Universities (IIE), Boston, US’ and ‘The Danish Consortium for Academic Craftsmanship (DCAC), Denmark at DAV University, Jalandhar.",
    link: null,
    signedDate: null,
    validity: "Signed",
    status: "Signed",
    notes: "Established at: DAV University, Jalandhar",
    orderIndex: 1,
  },
  {
    partner: "International Skill Development Corporation (ISDC)",
    category: "International Universities",
    country: "International",
    scope: "MoU with ‘International Skill Development Corporation (ISDC)’ for starting value-added skill programmes at DAV University, Jalandhar.",
    link: null,
    signedDate: null,
    validity: "Signed",
    status: "Signed",
    notes: "Established at: DAV University, Jalandhar",
    orderIndex: 2,
  },
  {
    partner: "The University of Memphis, USA",
    category: "International Universities",
    country: "USA",
    scope: "Signed MoU with Provost, University of Memphis, School of Public Health, USA to facilitate sharing of innovative teaching methods and public health curriculum offering joint academic programmes, student-faculty development & exchange, collaborative research work leading to publications, fellowships and organization of joint workshops and conferences.",
    link: "https://www.memphis.edu/publichealth/news/archive/2024/mou-davuniv-uofsph-20240129.php",
    signedDate: "2023",
    validity: "2023 – Present (Active)",
    status: "Active",
    notes: "Established at: DAV University, Jalandhar",
    orderIndex: 3,
  },
  {
    partner: "PUM Netherlands Senior Experts",
    category: "International Universities",
    country: "Netherlands",
    scope: "MoU with ‘PUM Netherlands Senior Experts’, Netherlands for setting-up an Incubation Centre at DAV University.",
    link: null,
    signedDate: null,
    validity: "Signed",
    status: "Signed",
    notes: "Established at: DAV University, Jalandhar",
    orderIndex: 4,
  },
  {
    partner: "Lahti University of Applied Sciences, Finland",
    category: "International Universities",
    country: "Finland",
    scope: "MoU with Lahti University of Applied Sciences, Finland at CT Group of Institutions.",
    link: null,
    signedDate: null,
    validity: "Signed",
    status: "Signed",
    notes: "Established at: CT Group of Institutions",
    orderIndex: 5,
  },
  {
    partner: "University of Sri Jayewardenepura, Sri Lanka",
    category: "International Universities",
    country: "Sri Lanka",
    scope: "MoU with University of Sri Jayewardenepura, Sri Lanka at CT Group of Institutions.",
    link: null,
    signedDate: null,
    validity: "Signed",
    status: "Signed",
    notes: "Established at: CT Group of Institutions",
    orderIndex: 6,
  },
  {
    partner: "University of Ontario Institute of Technology, Oshawa",
    category: "International Universities",
    country: "Canada",
    scope: "MoU with University of Ontario Institute of Technology, Oshawa (Canada) at DAVIET, Jalandhar.",
    link: null,
    signedDate: null,
    validity: "Signed",
    status: "Signed",
    notes: "Established at: DAVIET, Jalandhar",
    orderIndex: 7,
  },
  {
    partner: "Trent University, Canada",
    category: "International Universities",
    country: "Canada",
    scope: "MoU with Trent University, Canada at DAVIET, Jalandhar.",
    link: null,
    signedDate: null,
    validity: "Signed",
    status: "Signed",
    notes: "Established at: DAVIET, Jalandhar",
    orderIndex: 8,
  },
  {
    partner: "SAIT, Canada",
    category: "International Universities",
    country: "Canada",
    scope: "MoU with SAIT, Canada at DAVIET, Jalandhar.",
    link: null,
    signedDate: null,
    validity: "Signed",
    status: "Signed",
    notes: "Established at: DAVIET, Jalandhar",
    orderIndex: 9,
  },

  // ==========================================
  // SECTION 2: MoUs / Centre of Excellence established (CV Pages 12–13)
  // ==========================================
  {
    partner: "Larsen & Toubro EduTech Limited (L&T EduTech)",
    category: "Universities of National Importance & Industry Alliances",
    country: "India",
    scope: "MoU with Larsen & Toubro EduTech Limited (L&T EduTech) for introducing ‘Integrated Program in Mechatronics with Specialization in Electric Vehicle Engineering’ at DAV University, Jalandhar.",
    link: null,
    signedDate: null,
    validity: "Active",
    status: "Active",
    notes: "Established at: DAV University, Jalandhar",
    orderIndex: 10,
  },
  {
    partner: "Bajaj Finserv",
    category: "Universities of National Importance & Industry Alliances",
    country: "India",
    scope: "MoU with Bajaj Finserv for training programmes at DAV University, Jalandhar.",
    link: null,
    signedDate: null,
    validity: "Active",
    status: "Active",
    notes: "Established at: DAV University, Jalandhar",
    orderIndex: 11,
  },
  {
    partner: "NIT, Delhi",
    category: "Universities of National Importance & Industry Alliances",
    country: "India",
    scope: "MoU with NIT, Delhi for academic & research collaboration at DAV University, Jalandhar.",
    link: null,
    signedDate: null,
    validity: "Active",
    status: "Active",
    notes: "Established at: DAV University, Jalandhar",
    orderIndex: 12,
  },
  {
    partner: "Intel Technology India Pvt. Ltd.",
    category: "Universities of National Importance & Industry Alliances",
    country: "India",
    scope: "MoU with Intel Technology India Pvt. Ltd. for establishing Centre of Excellence at DAV University, Jalandhar.",
    link: null,
    signedDate: null,
    validity: "Active",
    status: "Active",
    notes: "Established at: DAV University, Jalandhar",
    orderIndex: 13,
  },
  {
    partner: "Indian Pollution Control Board, New Delhi",
    category: "Universities of National Importance & Industry Alliances",
    country: "India",
    scope: "MoU with Indian Pollution Control Board, New Delhi for academic & research collaboration at DAV University, Jalandhar.",
    link: null,
    signedDate: null,
    validity: "Active",
    status: "Active",
    notes: "Established at: DAV University, Jalandhar",
    orderIndex: 14,
  },
  {
    partner: "Cambridge University Press & Assessment India Pvt. Ltd.",
    category: "Universities of National Importance & Industry Alliances",
    country: "India",
    scope: "MoU with Cambridge University Press & Assessment India Pvt. Ltd. for academic collaboration at DAV University, Jalandhar.",
    link: null,
    signedDate: null,
    validity: "Active",
    status: "Active",
    notes: "Established at: DAV University, Jalandhar",
    orderIndex: 15,
  },
  {
    partner: "Maruti Suzuki India Ltd.",
    category: "Universities of National Importance & Industry Alliances",
    country: "India",
    scope: "MoU with Maruti Suzuki India Ltd. for industry collaborative programmes at DAV University, Jalandhar.",
    link: null,
    signedDate: null,
    validity: "Active",
    status: "Active",
    notes: "Established at: DAV University, Jalandhar",
    orderIndex: 16,
  },
  {
    partner: "ERP Logic India Pvt. Ltd.",
    category: "Universities of National Importance & Industry Alliances",
    country: "India",
    scope: "MoU with ERP Logic India Pvt. Ltd. for industry collaborative programmes with specialization in SAP at DAV University, Jalandhar.",
    link: null,
    signedDate: null,
    validity: "Active",
    status: "Active",
    notes: "Established at: DAV University, Jalandhar",
    orderIndex: 17,
  },
  {
    partner: "Texas Instruments",
    category: "Universities of National Importance & Industry Alliances",
    country: "India",
    scope: "MoU with Texas Instruments for establishing two labs viz. Embedded Systems Lab and Analog Electronics Lab(s) at DAVIET, Jalandhar.",
    link: null,
    signedDate: null,
    validity: "Active",
    status: "Active",
    notes: "Established at: DAVIET, Jalandhar",
    orderIndex: 18,
  },
  {
    partner: "Siemens",
    category: "Universities of National Importance & Industry Alliances",
    country: "India",
    scope: "Siemens Centre of Excellence & Authorised Training Center (ATC) for imparting training on Solid Edge at CT Group of Institutions.",
    link: null,
    signedDate: null,
    validity: "Signed",
    status: "Signed",
    notes: "Established at: CT Group of Institutions",
    orderIndex: 19,
  },
  {
    partner: "Oracle Academy",
    category: "Universities of National Importance & Industry Alliances",
    country: "India",
    scope: "Oracle Academy at DAVIET Jalandhar.",
    link: null,
    signedDate: null,
    validity: "Active",
    status: "Active",
    notes: "Established at: DAVIET, Jalandhar",
    orderIndex: 20,
  },
  {
    partner: "IBM",
    category: "Universities of National Importance & Industry Alliances",
    country: "India",
    scope: "Established IBM Centre of Excellence at CT Group of Institutions.",
    link: null,
    signedDate: null,
    validity: "Signed",
    status: "Signed",
    notes: "Established at: CT Group of Institutions",
    orderIndex: 21,
  },
  {
    partner: "Sofcon India Pvt. Ltd.",
    category: "Universities of National Importance & Industry Alliances",
    country: "India",
    scope: "Established Centre of Excellence with M/s Sofcon India Pvt. Ltd. on Industrial Automation & Embedded Systems at DAVIET.",
    link: null,
    signedDate: null,
    validity: "Active",
    status: "Active",
    notes: "Established at: DAVIET, Jalandhar",
    orderIndex: 22,
  },
  {
    partner: "Sedulity Solutions & Technologies (SEDULITY), New Delhi",
    category: "Universities of National Importance & Industry Alliances",
    country: "India",
    scope: "MoU with M/s Sedulity Solutions & Technologies (SEDULITY), New Delhi to establish \"Centre of Excellence in Cyber Security & Cyber Forensics\" to organize various Research & Development and Training programs based on latest and emerging technologies for Students, Faculties, Law-Enforcement Agencies, Corporate Professionals, and Research Scholars.",
    link: null,
    signedDate: null,
    validity: "Active",
    status: "Active",
    notes: "Established at: DAVIET, Jalandhar",
    orderIndex: 23,
  },
  {
    partner: "NIT Delhi, NIT, Hamirpur, NIT Jalandhar",
    category: "Universities of National Importance & Industry Alliances",
    country: "India",
    scope: "MoU with NIT Delhi, NIT, Hamirpur, NIT Jalandhar for Collaborative research project, faculty/student exchange program, co-sponsored and jointly organized seminars, conferences and workshops at DAVIET, Jalandhar.",
    link: null,
    signedDate: null,
    validity: "Active",
    status: "Active",
    notes: "Established at: DAVIET, Jalandhar",
    orderIndex: 24,
  },
  {
    partner: "EdGate Technologies (A partner of TI India University Program)",
    category: "Universities of National Importance & Industry Alliances",
    country: "India",
    scope: "Established “TI Innovation Center” in collaboration with M/s EdGate Technologies (A partner of TI India University Program).",
    link: null,
    signedDate: null,
    validity: "Active",
    status: "Active",
    notes: "Established at: DAVIET, Jalandhar",
    orderIndex: 25,
  },
  {
    partner: "Rsoft Design Group, USA",
    category: "Universities of National Importance & Industry Alliances",
    country: "USA",
    scope: "Lead the faculty delegation to explore the collaborative interactions between Rsoft Design Group, USA & DAVIET and succeeded in signing of MoU between Rsoft, USA & DAVIET during Dec. 2004.",
    link: null,
    signedDate: "Dec. 2004",
    validity: "Signed",
    status: "Signed",
    notes: "Established at: DAVIET, Jalandhar",
    orderIndex: 26,
  },
];

async function main() {
  console.log('🔄 Starting Strategic MoUs Synchronization...');

  // 1. Delete all existing MoUs
  const deleted = await prisma.mou.deleteMany({});
  console.log(`🗑️  Deleted ${deleted.count} previous MoU records.`);

  // 2. Insert all 26 verbatim MoUs from CV
  console.log(`📦 Inserting ${mousData.length} genuine MoUs from CV...`);
  for (const item of mousData) {
    await prisma.mou.create({
      data: item,
    });
    console.log(`   ✓ Added: [${item.category}] ${item.partner}`);
  }

  // 3. Verify counts
  const finalCount = await prisma.mou.count();
  const intlCount = await prisma.mou.count({ where: { category: 'International Universities' } });
  const nationalCount = await prisma.mou.count({
    where: { category: 'Universities of National Importance & Industry Alliances' },
  });

  console.log('\n=============================================');
  console.log(`✅ Synchronization completed successfully!`);
  console.log(`📊 Total MoUs in database: ${finalCount}`);
  console.log(`   - International Universities: ${intlCount}`);
  console.log(`   - Universities of National Importance & Industry Alliances: ${nationalCount}`);
  console.log('=============================================\n');
}

main()
  .catch((err) => {
    console.error('❌ Failed to synchronize MoUs:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

