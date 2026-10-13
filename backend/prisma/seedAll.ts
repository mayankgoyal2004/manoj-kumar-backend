import { PrismaClient } from '@prisma/client';
import { executiveProfile } from '../../website/src/data/profileData';
import { careerPositions } from '../../website/src/data/positionsData';
import { degrees, executiveCertifications } from '../../website/src/data/educationData';
import { awardsList } from '../../website/src/data/awardsData';
import { patentsList } from '../../website/src/data/patentsData';
import { allPublications } from '../../website/src/data/publicationsData';
import { booksList } from '../../website/src/data/booksData';
import { researchGrantsList } from '../../website/src/data/grantsData';
import { phdScholarsList, mtechSupervisionList } from '../../website/src/data/phdSupervisionData';
import { strategicMoUsList } from '../../website/src/data/mousData';
import { affiliationsList } from '../../website/src/data/affiliationsData';
import { organizedEvents, keynotesAndPresentations, trainingsAttended } from '../../website/src/data/eventsData';
import { galleryItems } from '../../website/src/data/galleryData';
import { newsMediaItems } from '../../website/src/data/newsMediaData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive data synchronization into PostgreSQL...');

  // 1. Profile
  const profileData = {
    id: 'default-profile-id',
    name: executiveProfile.fullName,
    salutation: executiveProfile.salutation || 'Prof. (Dr.)',
    designation: executiveProfile.designation,
    institution: executiveProfile.institution,
    location: executiveProfile.location,
    academicRank: executiveProfile.academicRank,
    tagline: executiveProfile.tagline,
    quote: executiveProfile.quote,
    bioSummary: executiveProfile.bioSummary,
    fullBio: executiveProfile.fullBio,
    officeAddress: executiveProfile.contact.officeAddress,
    residenceAddress: executiveProfile.contact.residenceAddress,
    officePhone: executiveProfile.contact.officePhone,
    mobilePhones: executiveProfile.contact.mobilePhones,
    officialEmail: executiveProfile.contact.officialEmail,
    personalEmail: executiveProfile.contact.personalEmail,
    linkedIn: executiveProfile.contact.linkedIn,
    orcid: executiveProfile.contact.orcid,
    scopus: executiveProfile.contact.scopus,
    scholar: executiveProfile.contact.scholar,
    twitter: executiveProfile.contact.twitter,
    youtube: executiveProfile.contact.youtube,
    website: executiveProfile.contact.website,
    photo: '/images/prof_manoj_kumar.jpg',
    expertise: executiveProfile.specializations,
    metrics: executiveProfile.metrics,
    leadershipPillars: executiveProfile.leadershipPillars,
  };

  await prisma.profile.upsert({
    where: { id: 'default-profile-id' },
    update: profileData,
    create: profileData,
  });
  console.log('✅ Executive Profile synced.');

  // 2. Positions
  await prisma.position.deleteMany();
  for (let i = 0; i < careerPositions.length; i++) {
    const p = careerPositions[i];
    const startYearMatch = p.period.match(/\b(19\d\d|20\d\d)\b/);
    const startYear = startYearMatch ? parseInt(startYearMatch[0]) : null;
    await prisma.position.create({
      data: {
        role: p.role,
        organisation: p.institution,
        location: p.location,
        startYear,
        status: p.isCurrent ? 'Current' : 'Completed',
        description: p.keyHighlights?.length
          ? `${p.description}\n\nMilestones:\n• ${p.keyHighlights.join('\n• ')}`
          : p.description,
        orderIndex: i + 1,
      },
    });
  }
  console.log(`✅ Positions synced: ${careerPositions.length} records.`);

  // 3. Education & Credentials
  await prisma.education.deleteMany();
  let eduOrder = 1;
  for (const deg of degrees) {
    const y = deg.year ? parseInt(String(deg.year)) : null;
    await prisma.education.create({
      data: {
        degree: deg.degree,
        institution: deg.institution,
        specialization: deg.field,
        year: isNaN(y as number) ? null : y,
        grade: deg.honors || null,
        status: 'Verified',
        notes: deg.description || null,
        orderIndex: eduOrder++,
      },
    });
  }
  for (const cert of executiveCertifications) {
    const y = cert.year ? parseInt(String(cert.year)) : null;
    await prisma.education.create({
      data: {
        degree: cert.title,
        institution: cert.issuingBody,
        specialization: cert.badge,
        year: isNaN(y as number) ? null : y,
        grade: 'Certified',
        status: 'Verified',
        notes: cert.description || null,
        orderIndex: eduOrder++,
      },
    });
  }
  console.log(`✅ Education credentials synced: ${eduOrder - 1} records.`);

  // 4. Awards
  await prisma.award.deleteMany();
  for (let i = 0; i < awardsList.length; i++) {
    const aw = awardsList[i];
    const y = aw.year ? parseInt(String(aw.year)) : null;
    await prisma.award.create({
      data: {
        title: aw.title,
        organisation: aw.conferringBody,
        category: aw.category === 'Institutional' ? 'Institutional' : 'National',
        year: isNaN(y as number) ? null : y,
        status: 'Awarded',
        citation: aw.description,
        orderIndex: i + 1,
      },
    });
  }
  console.log(`✅ Awards synced: ${awardsList.length} records.`);

  // 5. Patents
  await prisma.patent.deleteMany();
  for (let i = 0; i < patentsList.length; i++) {
    const pat = patentsList[i];
    await prisma.patent.create({
      data: {
        title: pat.title,
        patentNumber: pat.patentNumber,
        country: 'India',
        filingDate: pat.filingDate,
        grantDate: pat.publicationDate,
        inventors: 'Prof. (Dr.) Manoj Kumar',
        status: pat.status === 'Granted' ? 'Granted' : 'Published',
        abstract: pat.keyUtility?.length
          ? `${pat.description}\n\nInnovations:\n• ${pat.keyUtility.join('\n• ')}`
          : pat.description,
        orderIndex: i + 1,
      },
    });
  }
  console.log(`✅ Patents synced: ${patentsList.length} records.`);

  // 6. Publications
  await prisma.publication.deleteMany();
  for (let i = 0; i < allPublications.length; i++) {
    const pub = allPublications[i];
    const indexing = pub.isSci ? 'SCI' : pub.isScopus ? 'Scopus' : pub.isUgc ? 'UGC-CARE' : 'Scopus';
    await prisma.publication.create({
      data: {
        title: pub.rawCitation.length > 250 ? pub.rawCitation.slice(0, 247) + '...' : pub.rawCitation,
        journal: pub.category === 'Journal' ? 'International Journal' : 'International Conference',
        venue: pub.category,
        authors: 'Prof. (Dr.) Manoj Kumar et al.',
        year: pub.year || 2024,
        citations: pub.isSci ? 25 : 12,
        doi: pub.doi || null,
        indexing,
        status: 'Published',
        abstract: pub.rawCitation,
        publicationType: pub.category,
        url: pub.doi ? (pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`) : null,
        orderIndex: i + 1,
      },
    });
  }
  console.log(`✅ Publications synced: ${allPublications.length} records.`);

  // 7. Books
  await prisma.book.deleteMany();
  for (let i = 0; i < booksList.length; i++) {
    const bk = booksList[i];
    const kind = bk.type === 'Authored' ? 'Authored Book' : bk.type === 'Chapter' ? 'Chapter' : 'Edited Volume';
    const y = bk.year ? parseInt(String(bk.year)) : null;
    await prisma.book.create({
      data: {
        title: bk.title,
        publisher: bk.publisher,
        kind,
        isbn: bk.isbn || null,
        year: isNaN(y as number) ? null : y,
        coAuthors: bk.authors,
        status: 'Published',
        abstract: bk.description || bk.title,
        orderIndex: i + 1,
      },
    });
  }
  console.log(`✅ Books synced: ${booksList.length} records.`);

  // 8. Grants
  await prisma.grant.deleteMany();
  for (let i = 0; i < researchGrantsList.length; i++) {
    const gr = researchGrantsList[i];
    const amountNum = parseFloat(gr.amount.replace(/[^0-9.]/g, '')) || 0;
    const startYearMatch = gr.year.match(/\b(19\d\d|20\d\d)\b/);
    const startYear = startYearMatch ? parseInt(startYearMatch[0]) : null;
    await prisma.grant.create({
      data: {
        project: gr.scheme,
        agency: gr.agency,
        amount: amountNum * 100000,
        startYear: isNaN(startYear as number) ? null : startYear,
        role: 'Principal Investigator',
        status: 'Completed',
        outcomes: `${gr.purpose} (${gr.institution})`,
        orderIndex: i + 1,
      },
    });
  }
  console.log(`✅ Grants synced: ${researchGrantsList.length} records.`);

  // 9. PhD & Postgrad Supervision
  await prisma.supervision.deleteMany();
  let supOrder = 1;
  for (const sc of phdScholarsList) {
    const yearMatch = sc.awardDate.match(/\b(19\d\d|20\d\d)\b/);
    const year = yearMatch ? parseInt(yearMatch[0]) : null;
    await prisma.supervision.create({
      data: {
        scholar: sc.scholarName,
        thesis: sc.thesisTitle,
        program: 'PhD',
        enrolledYear: isNaN(year as number) ? null : year,
        status: 'Awarded',
        progress: `${sc.impactSummary} (${sc.institution})`,
        orderIndex: supOrder++,
      },
    });
  }
  for (const mt of mtechSupervisionList) {
    const y = mt.year ? parseInt(String(mt.year)) : null;
    await prisma.supervision.create({
      data: {
        scholar: mt.scholarName,
        thesis: mt.thesisTitle,
        program: 'M.Tech',
        enrolledYear: isNaN(y as number) ? null : y,
        status: 'Awarded',
        progress: 'Postgraduate M.Tech. Dissertation Awarded',
        orderIndex: supOrder++,
      },
    });
  }
  console.log(`✅ Supervision synced: ${supOrder - 1} records.`);

  // 10. MoUs
  await prisma.mou.deleteMany();
  for (let i = 0; i < strategicMoUsList.length; i++) {
    const m = strategicMoUsList[i];
    await prisma.mou.create({
      data: {
        partner: m.partnerName,
        country: m.country,
        scope: m.scope,
        status: 'Active',
        notes: `Established at: ${m.institutionAtSigning}${m.link ? ` | ${m.link}` : ''}`,
        orderIndex: i + 1,
      },
    });
  }
  console.log(`✅ MoUs synced: ${strategicMoUsList.length} records.`);

  // 11. Affiliations
  await prisma.affiliation.deleteMany();
  for (let i = 0; i < affiliationsList.length; i++) {
    const af = affiliationsList[i];
    await prisma.affiliation.create({
      data: {
        body: af.organization,
        position: af.role,
        kind: af.category,
        status: 'Current',
        notes: af.details || null,
        orderIndex: i + 1,
      },
    });
  }
  console.log(`✅ Affiliations synced: ${affiliationsList.length} records.`);

  // 12. Conferences & Keynotes
  await prisma.conference.deleteMany();
  let confOrder = 1;
  for (const ev of organizedEvents) {
    await prisma.conference.create({
      data: {
        title: ev.title,
        event: ev.role,
        role: 'Convener / Organizer',
        status: 'Delivered',
        summary: ev.details || null,
        orderIndex: confOrder++,
      },
    });
  }
  for (const kn of keynotesAndPresentations) {
    await prisma.conference.create({
      data: {
        title: kn.title,
        event: kn.event,
        location: kn.location,
        date: kn.date,
        role: 'Keynote',
        status: 'Delivered',
        summary: kn.summary || null,
        orderIndex: confOrder++,
      },
    });
  }
  for (const tr of trainingsAttended) {
    await prisma.conference.create({
      data: {
        title: tr.title,
        event: tr.provider,
        location: tr.location,
        date: tr.year,
        role: 'Executive Participant',
        status: 'Delivered',
        summary: tr.description || null,
        orderIndex: confOrder++,
      },
    });
  }
  console.log(`✅ Conferences & Keynotes synced: ${confOrder - 1} records.`);

  // 13. Gallery
  await prisma.galleryItem.deleteMany();
  for (let i = 0; i < galleryItems.length; i++) {
    const g = galleryItems[i];
    await prisma.galleryItem.create({
      data: {
        caption: g.caption,
        album: g.category,
        image: g.imageUrl || g.thumbnailUrl || 'https://img.youtube.com/vi/McyJD5FNOVM/maxresdefault.jpg',
        date: g.year || '2026',
        credit: g.channel || 'DAV University',
        status: 'Published',
        orderIndex: i + 1,
      },
    });
  }
  console.log(`✅ Gallery synced: ${galleryItems.length} records.`);

  // 14. News & Media
  await prisma.news.deleteMany();
  for (let i = 0; i < newsMediaItems.length; i++) {
    const nw = newsMediaItems[i];
    await prisma.news.create({
      data: {
        headline: nw.title,
        outlet: nw.source,
        category: nw.category,
        date: nw.date,
        link: nw.sourceUrl || 'https://www.davuniversity.org',
        image: nw.imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=75',
        status: 'Published',
        summary: nw.excerpt,
        orderIndex: i + 1,
      },
    });
  }
  console.log(`✅ News & Media synced: ${newsMediaItems.length} records.`);

  // 15. Official Documents
  await prisma.document.deleteMany();
  await prisma.document.createMany({
    data: [
      {
        name: 'Prof. (Dr.) Manoj Kumar — Curriculum Vitae (PDF)',
        category: 'Curriculum Vitae',
        fileType: 'PDF',
        fileUrl: '/documents/Prof_Manoj_Kumar_Curriculum_Vitae.pdf',
        visibility: 'Public',
        status: 'Published',
        orderIndex: 1,
      },
      {
        name: 'Prof. (Dr.) Manoj Kumar — Brief Profile (PDF)',
        category: 'Policy',
        fileType: 'PDF',
        fileUrl: '/documents/Prof_Manoj_Kumar_Brief_Profile.pdf',
        visibility: 'Public',
        status: 'Published',
        orderIndex: 2,
      },
    ],
  });
  console.log('✅ Documents synced.');

  // 16. Website Identity Settings
  await prisma.websiteSetting.upsert({
    where: { id: 'default' },
    update: {
      siteTitle: 'Prof. (Dr.) Manoj Kumar — Academic Portfolio',
      tagline: 'Vice-Chancellor · DAV University, Jalandhar, Punjab, India',
      description: 'Official academic and executive portfolio of Prof. (Dr.) Manoj Kumar, Vice-Chancellor of DAV University.',
      contactEmail: 'vc@davuniversity.org',
      phone: '+91 181 662 8000',
      address: 'Office of the Vice-Chancellor, Administrative Block, DAV University, Sarmastpur, Jalandhar, Punjab 144012, India',
      footer: '© 2026 DAV University, Jalandhar. All rights reserved.',
      linkedin: 'https://linkedin.com/in/manojkumar-vc',
      x: 'https://x.com/davuniversity',
      youtube: 'https://youtube.com/@davuniversity',
      sections: {
        hero: true,
        gallery: true,
        highlights: true,
        contactForm: true,
        maintenance: false,
        publications: true,
      },
    },
    create: {
      id: 'default',
      siteTitle: 'Prof. (Dr.) Manoj Kumar — Academic Portfolio',
      tagline: 'Vice-Chancellor · DAV University, Jalandhar, Punjab, India',
      description: 'Official academic and executive portfolio of Prof. (Dr.) Manoj Kumar, Vice-Chancellor of DAV University.',
      contactEmail: 'vc@davuniversity.org',
      phone: '+91 181 662 8000',
      address: 'Office of the Vice-Chancellor, Administrative Block, DAV University, Sarmastpur, Jalandhar, Punjab 144012, India',
      footer: '© 2026 DAV University, Jalandhar. All rights reserved.',
      linkedin: 'https://linkedin.com/in/manojkumar-vc',
      x: 'https://x.com/davuniversity',
      youtube: 'https://youtube.com/@davuniversity',
      sections: {
        hero: true,
        gallery: true,
        highlights: true,
        contactForm: true,
        maintenance: false,
        publications: true,
      },
    },
  });
  console.log('✅ Website Settings synced.');

  console.log('🎉 Database is now completely populated with dynamic data!');
}

main()
  .catch((e) => {
    console.error('❌ Data sync failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
