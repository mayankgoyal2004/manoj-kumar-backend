import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { sendError } from '../utils/response';
import { env } from '../config/env';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Unhandled Application Error:', err);

  // Prisma unique constraint violation (P2002)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = (err.meta?.target as string[]) || [];
      return sendError(
        res,
        `A record with this ${target.join(', ') || 'field'} already exists.`,
        409,
        err.meta
      );
    }
    if (err.code === 'P2025') {
      return sendError(res, 'Record not found.', 404);
    }
    return sendError(res, `Database error: ${err.message}`, 400);
  }

  // Multer file upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return sendError(res, 'File size exceeds maximum permitted limit (15MB)', 400);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected internal error occurred';
  const details = env.NODE_ENV === 'development' ? err.stack : undefined;

  return sendError(res, message, statusCode, details);
};
