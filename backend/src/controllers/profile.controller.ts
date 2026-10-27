import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { sendError, sendSuccess } from '../utils/response';
import { logActivity } from '../utils/auditLogger';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const raw: any = await prisma.$queryRawUnsafe('SELECT * FROM "Profile" LIMIT 1');
    let profile = raw && raw[0] ? raw[0] : await prisma.profile.findFirst();

    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          name: 'Prof. (Dr.) Manoj Kumar',
          salutation: 'Prof. (Dr.)',
          designation: 'Vice-Chancellor',
          institution: 'DAV University, Jalandhar',
          bioSummary:
            'Prof. (Dr.) Manoj Kumar serves as Vice-Chancellor of DAV University, Jalandhar, leading academic strategy, research governance and institutional quality assurance.',
        },
      });
    }
    return sendSuccess(res, profile, 'Profile retrieved successfully');
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to retrieve profile', 500);
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const existing = await prisma.profile.findFirst();
    if (!existing) {
      return sendError(res, 'Profile not found', 404);
    }

    const { headerPhoto, sidebarPhoto, bioPhoto, headerPositions, metrics, ...prismaSafeBody } = req.body;

    const mergedMetrics = metrics && typeof metrics === 'object'
      ? { ...((existing.metrics as any) || {}), ...metrics }
      : (existing.metrics as any);

    let updated: any;
    try {
      updated = await prisma.profile.update({
        where: { id: existing.id },
        data: {
          ...prismaSafeBody,
          ...(mergedMetrics ? { metrics: mergedMetrics } : {}),
        },
      });
    } catch {
      updated = existing;
    }

    if (headerPhoto !== undefined || sidebarPhoto !== undefined || bioPhoto !== undefined || headerPositions !== undefined) {
      await prisma.$executeRawUnsafe(
        'UPDATE "Profile" SET "headerPhoto" = COALESCE($1, "headerPhoto"), "sidebarPhoto" = COALESCE($2, "sidebarPhoto"), "bioPhoto" = COALESCE($3, "bioPhoto"), "headerPositions" = CASE WHEN $4::jsonb IS NOT NULL THEN $4::jsonb ELSE "headerPositions" END WHERE id = $5',
        headerPhoto ?? null,
        sidebarPhoto ?? null,
        bioPhoto ?? null,
        headerPositions !== undefined ? JSON.stringify(headerPositions) : null,
        existing.id
      );
    }

    const raw: any = await prisma.$queryRawUnsafe('SELECT * FROM "Profile" WHERE id = $1', existing.id);
    const finalProfile = raw && raw[0] ? raw[0] : updated;

    await logActivity({
      req,
      action: 'updated',
      module: 'Executive Profile',
      target: finalProfile.name || 'Executive Profile',
      kind: 'update',
    });

    return sendSuccess(res, finalProfile, 'Profile updated successfully');
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to update profile', 500);
  }
};

// Consolidated overview endpoint for fast initial website loading
export const getPublicOverview = async (req: Request, res: Response) => {
  try {
    const rawProfilePromise: any = prisma.$queryRawUnsafe('SELECT * FROM "Profile" LIMIT 1');

    const [
      rawProfileResult,
      positions,
      education,
      recentPublications,
      recentNews,
      patentsCount,
      publicationsCount,
      awardsCount,
      grantsCount,
      supervisionCount,
      mousCount,
      galleryPreview,
      settings,
    ] = await Promise.all([
      rawProfilePromise,
      prisma.position.findMany({ where: { status: 'Current' }, orderBy: [{ orderIndex: 'asc' }, { startYear: 'desc' }], take: 50 }),
      prisma.education.findMany({ orderBy: { year: 'desc' }, take: 4 }),
      prisma.publication.findMany({ where: { status: 'Published' }, orderBy: { year: 'desc' }, take: 6 }),
      prisma.news.findMany({ where: { status: 'Published' }, orderBy: { date: 'desc' }, take: 4 }),
      prisma.patent.count(),
      prisma.publication.count({ where: { status: 'Published' } }),
      prisma.award.count(),
      prisma.grant.count(),
      prisma.supervision.count(),
      prisma.mou.count({ where: { status: 'Active' } }),
      prisma.galleryItem.findMany({ where: { status: 'Published' }, take: 6, orderBy: { orderIndex: 'asc' } }),
      prisma.websiteSetting.findFirst(),
    ]);

    const profile = (rawProfileResult && rawProfileResult[0]) || (await prisma.profile.findFirst());

    return sendSuccess(
      res,
      {
        profile,
        positions,
        education,
        recentPublications,
        recentNews,
        galleryPreview,
        settings,
        liveMetrics: {
          patentsCount,
          publicationsCount,
          awardsCount,
          grantsCount,
          supervisionCount,
          mousCount,
        },
      },
      'Public overview retrieved'
    );
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to fetch public overview', 500);
  }
};
