import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { sendError, sendSuccess } from '../utils/response';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [
      publicationsCount,
      booksCount,
      awardsCount,
      patentsCount,
      grantsCount,
      supervisionCount,
      conferencesCount,
      newsCount,
      mousCount,
      positionsCount,
      educationCount,
      affiliationsCount,
      galleryCount,
      mediaCount,
      documentsCount,
      unreadNotificationsCount,
      unreadInquiriesCount,
      recentActivity,
      recentInquiries,
    ] = await Promise.all([
      prisma.publication.count(),
      prisma.book.count(),
      prisma.award.count(),
      prisma.patent.count(),
      prisma.grant.count(),
      prisma.supervision.count(),
      prisma.conference.count(),
      prisma.news.count(),
      prisma.mou.count(),
      prisma.position.count(),
      prisma.education.count(),
      prisma.affiliation.count(),
      prisma.galleryItem.count(),
      prisma.mediaAsset.count(),
      prisma.document.count(),
      prisma.notification.count({ where: { status: 'Unread' } }),
      prisma.contactMessage.count({ where: { status: 'Unread' } }),
      prisma.activityLog.findMany({
        take: 10,
        orderBy: { time: 'desc' },
      }),
      prisma.contactMessage.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    // Sum citations from publications
    const citationsAggregate = await prisma.publication.aggregate({
      _sum: { citations: true },
    });

    // Sum research grants amount
    const grantsAggregate = await prisma.grant.aggregate({
      _sum: { amount: true },
    });

    // Dynamic year-by-year research output trends strictly from database
    const publicationRecords = await prisma.publication.findMany({
      select: { year: true, citations: true },
      orderBy: { year: 'asc' },
    });
    const trendsMap: Record<string, { publications: number; citations: number }> = {};
    for (const pub of publicationRecords) {
      if (pub.year) {
        const y = String(pub.year);
        if (!trendsMap[y]) {
          trendsMap[y] = { publications: 0, citations: 0 };
        }
        trendsMap[y].publications += 1;
        trendsMap[y].citations += pub.citations || 0;
      }
    }
    const researchOutputTrends = Object.entries(trendsMap)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([year, val]) => ({ year, ...val }));

    // Dynamic year-by-year research funding trends strictly from database
    const grantRecords = await prisma.grant.findMany({
      select: { startYear: true, amount: true },
      orderBy: { startYear: 'asc' },
    });
    const fundingMap: Record<string, number> = {};
    for (const grant of grantRecords) {
      if (grant.startYear) {
        const y = String(grant.startYear);
        const crAmount = (grant.amount || 0) / 10000000;
        fundingMap[y] = Number(((fundingMap[y] || 0) + crAmount).toFixed(2));
      }
    }
    const fundingTrends = Object.entries(fundingMap)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([year, funding]) => ({ year, funding }));

    // Dynamic status breakdown across content tables
    const [pubStatus, bookStatus, grantStatus, patentStatus, awardStatus, newsStatus, supStatus] = await Promise.all([
      prisma.publication.groupBy({ by: ['status'], _count: { id: true } }),
      prisma.book.groupBy({ by: ['status'], _count: { id: true } }),
      prisma.grant.groupBy({ by: ['status'], _count: { id: true } }),
      prisma.patent.groupBy({ by: ['status'], _count: { id: true } }),
      prisma.award.groupBy({ by: ['status'], _count: { id: true } }),
      prisma.news.groupBy({ by: ['status'], _count: { id: true } }),
      prisma.supervision.groupBy({ by: ['status'], _count: { id: true } }),
    ]);
    const statusMap: Record<string, number> = {};
    for (const group of [pubStatus, bookStatus, grantStatus, patentStatus, awardStatus, newsStatus, supStatus]) {
      for (const item of group) {
        if (item.status) {
          statusMap[item.status] = (statusMap[item.status] || 0) + item._count.id;
        }
      }
    }
    const statusBreakdown = Object.entries(statusMap)
      .sort((a, b) => b[1] - a[1])
      .map(([status, count]) => ({ status, count }));

    // Truly recently updated records across modules
    const [recentPubs, recentBooks, recentGrants, recentPatents, recentAwards, recentNews, recentPositions] = await Promise.all([
      prisma.publication.findMany({ take: 3, orderBy: { updatedAt: 'desc' }, select: { id: true, title: true, status: true, updatedAt: true } }),
      prisma.book.findMany({ take: 3, orderBy: { updatedAt: 'desc' }, select: { id: true, title: true, status: true, updatedAt: true } }),
      prisma.grant.findMany({ take: 3, orderBy: { updatedAt: 'desc' }, select: { id: true, project: true, status: true, updatedAt: true } }),
      prisma.patent.findMany({ take: 3, orderBy: { updatedAt: 'desc' }, select: { id: true, title: true, status: true, updatedAt: true } }),
      prisma.award.findMany({ take: 3, orderBy: { updatedAt: 'desc' }, select: { id: true, title: true, status: true, updatedAt: true } }),
      prisma.news.findMany({ take: 3, orderBy: { updatedAt: 'desc' }, select: { id: true, headline: true, status: true, updatedAt: true } }),
      prisma.position.findMany({ take: 3, orderBy: { updatedAt: 'desc' }, select: { id: true, role: true, organisation: true, status: true, updatedAt: true } }),
    ]);

    const recentlyUpdated = [
      ...recentPubs.map((r) => ({ id: r.id, key: 'publications', title: r.title, module: 'Publications', status: r.status, updated: r.updatedAt })),
      ...recentBooks.map((r) => ({ id: r.id, key: 'books', title: r.title, module: 'Books & Chapters', status: r.status, updated: r.updatedAt })),
      ...recentGrants.map((r) => ({ id: r.id, key: 'grants', title: r.project, module: 'Grants', status: r.status, updated: r.updatedAt })),
      ...recentPatents.map((r) => ({ id: r.id, key: 'patents', title: r.title, module: 'Patents', status: r.status, updated: r.updatedAt })),
      ...recentAwards.map((r) => ({ id: r.id, key: 'awards', title: r.title, module: 'Awards', status: r.status, updated: r.updatedAt })),
      ...recentNews.map((r) => ({ id: r.id, key: 'news', title: r.headline, module: 'News & Media', status: r.status, updated: r.updatedAt })),
      ...recentPositions.map((r) => ({ id: r.id, key: 'positions', title: `${r.role} · ${r.organisation}`, module: 'Positions', status: r.status, updated: r.updatedAt })),
    ]
      .sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
      .slice(0, 6);

    const summaryCards = {
      publications: publicationsCount,
      totalCitations: citationsAggregate._sum.citations || 0,
      books: booksCount,
      patents: patentsCount,
      grantsAmount: grantsAggregate._sum.amount || 0,
      activeGrants: grantsCount,
      supervision: supervisionCount,
      awards: awardsCount,
      conferences: conferencesCount,
      mous: mousCount,
      news: newsCount,
      unreadInquiries: unreadInquiriesCount,
      unreadNotifications: unreadNotificationsCount,
    };

    const contentDistribution = [
      { key: 'publications', label: 'Publications', count: publicationsCount },
      { key: 'books', label: 'Books & Chapters', count: booksCount },
      { key: 'awards', label: 'Awards', count: awardsCount },
      { key: 'patents', label: 'Patents', count: patentsCount },
      { key: 'grants', label: 'Grants', count: grantsCount },
      { key: 'conferences', label: 'Conferences', count: conferencesCount },
      { key: 'news', label: 'News & Media', count: newsCount },
      { key: 'mous', label: 'MoUs & Alliances', count: mousCount },
      { key: 'supervision', label: 'Supervision', count: supervisionCount },
      { key: 'positions', label: 'Positions', count: positionsCount },
      { key: 'education', label: 'Education', count: educationCount },
      { key: 'affiliations', label: 'Affiliations', count: affiliationsCount },
      { key: 'gallery', label: 'Gallery', count: galleryCount },
      { key: 'media', label: 'Media Library', count: mediaCount },
      { key: 'documents', label: 'Documents', count: documentsCount },
    ];

    return sendSuccess(
      res,
      {
        summary: summaryCards,
        contentDistribution,
        researchOutputTrends,
        fundingTrends,
        statusBreakdown,
        recentlyUpdated,
        recentActivity,
        recentInquiries,
      },
      'Dashboard stats loaded'
    );
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to retrieve stats', 500);
  }
};
