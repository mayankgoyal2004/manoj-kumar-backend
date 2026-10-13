import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { sendError, sendSuccess } from '../utils/response';
import { logActivity } from '../utils/auditLogger';

export const submitPublicContact = async (req: Request, res: Response) => {
  try {
    const { fullName, organization, email, phone, purpose, message } = req.body;

    const savedMessage = await prisma.contactMessage.create({
      data: {
        fullName,
        organization: organization || null,
        email: email.toLowerCase().trim(),
        phone: phone || null,
        purpose: purpose || 'Academic Collaboration',
        message,
        status: 'Unread',
      },
    });

    // Create a notification for administrators
    await prisma.notification.create({
      data: {
        title: `New Inquiry from ${fullName}`,
        kind: 'Review',
        message: `${fullName} (${organization || email}) submitted an inquiry regarding "${purpose || 'Collaboration'}".`,
        status: 'Unread',
        link: `/contact-messages/${savedMessage.id}`,
      },
    });

    return sendSuccess(
      res,
      { id: savedMessage.id },
      'Your message has been delivered to the Secretariat of the Vice-Chancellor. Thank you.',
      201
    );
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to submit contact form', 500);
  }
};

export const listContactMessages = async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
    const pageSize = Math.min(100, Math.max(1, parseInt((req.query.pageSize as string) || '20', 10)));
    const status = (req.query.status as string)?.trim();
    const search = (req.query.search as string)?.trim();

    const where: any = {};
    if (status && status !== 'all') where.status = status;
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { organization: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, rows] = await Promise.all([
      prisma.contactMessage.count({ where }),
      prisma.contactMessage.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return sendSuccess(res, rows, 'Contact messages retrieved', 200, {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to fetch contact messages', 500);
  }
};

export const updateContactMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, replyNote } = req.body;

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(replyNote !== undefined ? { replyNote } : {}),
        ...(status === 'Responded' ? { repliedAt: new Date() } : {}),
      },
    });

    await logActivity({
      req,
      action: 'updated',
      module: 'Secretariat Messages',
      target: `Message from ${updated.fullName}`,
      kind: 'update',
    });

    return sendSuccess(res, updated, 'Message updated successfully');
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to update message', 500);
  }
};

export const deleteContactMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({ where: { id } });

    await logActivity({
      req,
      action: 'deleted',
      module: 'Secretariat Messages',
      target: `Message ID ${id}`,
      kind: 'delete',
    });

    return sendSuccess(res, { id }, 'Message deleted successfully');
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to delete message', 500);
  }
};
