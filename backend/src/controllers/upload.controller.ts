import { Request, Response } from 'express';
import { sendError, sendSuccess } from '../utils/response';
import prisma from '../config/prisma';
import { logActivity } from '../utils/auditLogger';

export const handleFileUpload = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return sendError(res, 'No file was uploaded', 400);
    }

    const file = req.file;
    const megabytes = file.size / 1048576;
    const formattedSize =
      megabytes >= 1 ? `${megabytes.toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`;

    const relativeUrl = `/uploads/${file.filename}`;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fullUrl = `${baseUrl}${relativeUrl}`;

    // Optionally auto-register into mediaAsset library
    const kind = file.mimetype.startsWith('video')
      ? 'Video'
      : file.mimetype.startsWith('image')
      ? 'Image'
      : 'Document';

    const asset = await prisma.mediaAsset.create({
      data: {
        name: file.originalname.replace(/\.[^.]+$/, ''),
        kind,
        folder: 'Brand',
        image: fullUrl,
        size: formattedSize,
        status: 'Draft',
      },
    });

    await logActivity({
      req,
      action: 'created',
      module: 'Media Library',
      target: file.originalname,
      kind: 'create',
    });

    return sendSuccess(
      res,
      {
        filename: file.filename,
        originalName: file.originalname,
        size: formattedSize,
        mimetype: file.mimetype,
        url: fullUrl,
        relativeUrl,
        asset,
      },
      'File uploaded successfully',
      201
    );
  } catch (error: any) {
    return sendError(res, error.message || 'File upload failed', 500);
  }
};
