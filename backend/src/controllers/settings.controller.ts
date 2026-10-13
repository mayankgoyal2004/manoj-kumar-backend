import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { sendError, sendSuccess } from '../utils/response';
import { logActivity } from '../utils/auditLogger';

// Website Settings
export const getWebsiteSettings = async (req: Request, res: Response) => {
  try {
    let settings = await prisma.websiteSetting.findUnique({ where: { id: 'default' } });
    if (!settings) {
      settings = await prisma.websiteSetting.create({
        data: {
          id: 'default',
          siteTitle: 'Prof. (Dr.) Manoj Kumar',
          tagline: 'Vice-Chancellor · DAV University, Jalandhar',
          description:
            'The academic portfolio of Prof. (Dr.) Manoj Kumar — research in machine learning systems, computational intelligence and technology for sustainable agriculture.',
          contactEmail: 'vc@davuniversity.org',
          phone: '+91 181 662 8000',
          address: 'Office of the Vice-Chancellor, Administrative Block, DAV University, Jalandhar, Punjab 144012',
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
    }
    return sendSuccess(res, settings, 'Website settings retrieved');
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to fetch website settings', 500);
  }
};

export const updateWebsiteSettings = async (req: Request, res: Response) => {
  try {
    const updated = await prisma.websiteSetting.upsert({
      where: { id: 'default' },
      update: req.body,
      create: { id: 'default', ...req.body },
    });

    await logActivity({
      req,
      action: 'updated',
      module: 'Website Settings',
      target: updated.siteTitle,
      kind: 'update',
    });

    return sendSuccess(res, updated, 'Website settings updated successfully');
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to update website settings', 500);
  }
};
