import prisma from '../config/prisma';
import { Request } from 'express';

export interface AuditParams {
  req?: Request;
  actor?: string;
  email?: string;
  action: 'created' | 'updated' | 'deleted' | 'login' | 'status_change';
  module: string;
  target: string;
  kind?: 'create' | 'update' | 'delete' | 'security' | 'info';
  details?: any;
}

export const logActivity = async (params: AuditParams) => {
  try {
    const actorName = params.actor || params.req?.user?.name || 'System';
    const actorEmail = params.email || params.req?.user?.email || null;
    const ip =
      (params.req?.headers['x-forwarded-for'] as string) ||
      params.req?.socket.remoteAddress ||
      '127.0.0.1';

    await prisma.activityLog.create({
      data: {
        actor: actorName,
        email: actorEmail,
        action: params.action,
        module: params.module,
        target: params.target,
        kind: params.kind || 'info',
        ip: ip.replace('::ffff:', ''),
        details: params.details || null,
      },
    });
  } catch (error) {
    console.error('Audit log failure (non-blocking):', error);
  }
};
