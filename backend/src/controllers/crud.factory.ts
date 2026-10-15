import { Request, Response } from 'express';
import prisma from '../config/prisma';
import { Prisma } from '@prisma/client';
import { sendError, sendSuccess } from '../utils/response';
import { logActivity } from '../utils/auditLogger';

export interface CrudOptions {
  modelName: keyof typeof prisma;
  moduleTitle: string;
  searchFields?: string[];
  filterFields?: string[];
  titleField?: string;
  defaultSort?: { field: string; order: 'asc' | 'desc' };
}

// Build allowed fields set per model from Prisma DMMF
const MODEL_FIELDS_MAP: Record<string, Set<string>> = {};
if (Prisma.dmmf?.datamodel?.models) {
  for (const m of Prisma.dmmf.datamodel.models) {
    MODEL_FIELDS_MAP[m.name.toLowerCase()] = new Set(m.fields.map((f: any) => f.name));
  }
}

const FIELD_ALIAS_MAP: Record<string, string> = {
  start_year: 'startYear',
  end_year: 'endYear',
  patent_number: 'patentNumber',
  filing_date: 'filingDate',
  grant_date: 'grantDate',
  co_authors: 'coAuthors',
  enrolled_year: 'enrolledYear',
  co_supervisor: 'coSupervisor',
  signed_date: 'signedDate',
};

function normalizeCrudData(raw: any, modelName?: string): any {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return raw;
  const result: any = {};

  for (const [key, value] of Object.entries(raw)) {
    // Convert snake_case key to camelCase if known
    const targetKey = FIELD_ALIAS_MAP[key] || key;

    // Convert empty strings to null for nullable fields
    if (value === '') {
      result[targetKey] = null;
    } else {
      result[targetKey] = value;
    }
  }

  // Remove temporary or redundant snake_case keys if mapped
  for (const snakeKey of Object.keys(FIELD_ALIAS_MAP)) {
    if (snakeKey in result && FIELD_ALIAS_MAP[snakeKey] in result) {
      delete result[snakeKey];
    }
  }

  // Strip id or auto fields if passed in update/create payload
  delete result.id;
  delete result.createdAt;
  delete result.updatedAt;

  // Filter against model's schema if modelName is provided
  if (modelName) {
    const allowed = MODEL_FIELDS_MAP[modelName.toLowerCase()];
    if (allowed) {
      // Handle model-specific aliases:
      // If model has both kind and category (e.g. Affiliation)
      if (allowed.has('kind') && allowed.has('category')) {
        if (result.kind && !result.category) result.category = result.kind;
        if (result.category && !result.kind) result.kind = result.category;
      } else if (allowed.has('category') && !allowed.has('kind')) {
        if (result.kind && !result.category) result.category = result.kind;
        delete result.kind;
      } else if (allowed.has('kind') && !allowed.has('category')) {
        if (result.category && !result.kind) result.kind = result.category;
        delete result.category;
      }

      // Strictly strip any field not present in the Prisma model schema!
      for (const field of Object.keys(result)) {
        if (!allowed.has(field)) {
          delete result[field];
        }
      }
    }
  }

  return result;
}

export function createCrudController(options: CrudOptions) {
  const { modelName, moduleTitle, searchFields = ['title', 'name'], filterFields = ['status'], titleField = 'title', defaultSort = { field: 'createdAt', order: 'desc' } } = options;

  const model = prisma[modelName] as any;

  return {
    // List records with pagination, filtering, search, sorting
    getAll: async (req: Request, res: Response) => {
      try {
        const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
        const pageSize = Math.min(100, Math.max(1, parseInt((req.query.pageSize as string) || '20', 10)));
        const search = (req.query.search as string)?.trim();
        const sortField = (req.query.sort as string) || defaultSort.field;
        const sortOrder = ((req.query.order as string) || defaultSort.order).toLowerCase() === 'asc' ? 'asc' : 'desc';

        const where: any = {};

        // Dynamic filters (e.g. status, category, indexing, album, kind, role, visibility)
        filterFields.forEach((field) => {
          if (req.query[field] && req.query[field] !== 'all') {
            where[field] = req.query[field];
          }
        });

        // Other common query filters
        ['category', 'indexing', 'album', 'folder', 'kind', 'role', 'status', 'visibility', 'fileType'].forEach((key) => {
          if (req.query[key] && req.query[key] !== 'all' && !where[key]) {
            where[key] = req.query[key];
          }
        });

        // Fulltext / search contains across configured fields
        if (search && searchFields.length > 0) {
          where.OR = searchFields.map((field) => ({
            [field]: { contains: search, mode: 'insensitive' },
          }));
        }

        const [total, rows] = await Promise.all([
          model.count({ where }),
          model.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { [sortField]: sortOrder },
          }),
        ]);

        return sendSuccess(res, rows, `${moduleTitle} records retrieved`, 200, {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        });
      } catch (error: any) {
        return sendError(res, error.message || `Failed to fetch ${moduleTitle}`, 500);
      }
    },

    // Public list endpoint (for website visitors - only published/verified/current records)
    getPublic: async (req: Request, res: Response) => {
      try {
        const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
        const pageSize = Math.min(1000, Math.max(1, parseInt((req.query.pageSize as string) || '500', 10)));
        const search = (req.query.search as string)?.trim();

        const where: any = {};

        // If the model has a status column, default to public-friendly status
        if (filterFields.includes('status')) {
          if (req.query.status && req.query.status !== 'all') {
            where.status = req.query.status;
          } else if (modelName === 'position') {
            // all positions are public
          } else if (modelName === 'education') {
            where.status = 'Verified';
          } else if (modelName === 'award') {
            where.status = { in: ['Awarded', 'Nominated'] };
          } else if (modelName === 'patent') {
            where.status = { in: ['Granted', 'Published', 'Filed'] };
          } else if (modelName === 'publication') {
            where.status = { in: ['Published', 'In Press'] };
          } else if (modelName === 'supervision') {
            where.status = { in: ['Awarded', 'Ongoing', 'Submitted'] };
          } else if (modelName === 'book') {
            where.status = { in: ['Published', 'In Press'] };
          } else if (modelName === 'grant') {
            where.status = { in: ['Active', 'Completed', 'Sanctioned'] };
          } else if (modelName === 'mou') {
            where.status = { in: ['Active', 'Signed'] };
          } else if (modelName === 'affiliation') {
            where.status = { in: ['Current', 'Completed'] };
          } else if (modelName === 'conference') {
            where.status = { in: ['Delivered', 'Scheduled'] };
          } else if (modelName === 'document') {
            where.status = 'Published';
            where.visibility = 'Public';
          } else {
            where.status = 'Published';
          }
        }

        ['category', 'indexing', 'album', 'folder', 'kind', 'role'].forEach((key) => {
          if (req.query[key] && req.query[key] !== 'all') {
            where[key] = req.query[key];
          }
        });

        if (search && searchFields.length > 0) {
          where.OR = searchFields.map((field) => ({
            [field]: { contains: search, mode: 'insensitive' },
          }));
        }

        const [total, rows] = await Promise.all([
          model.count({ where }),
          model.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: [{ orderIndex: 'asc' }, { [defaultSort.field]: defaultSort.order }],
          }),
        ]);

        return sendSuccess(res, rows, `${moduleTitle} retrieved`, 200, {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        });
      } catch (error: any) {
        return sendError(res, error.message || `Failed to fetch ${moduleTitle}`, 500);
      }
    },

    // Get single record by ID
    getById: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const record = await model.findUnique({ where: { id } });
        if (!record) {
          return sendError(res, `${moduleTitle} record not found`, 404);
        }
        return sendSuccess(res, record, `${moduleTitle} record retrieved`);
      } catch (error: any) {
        return sendError(res, error.message || `Failed to retrieve ${moduleTitle}`, 500);
      }
    },

    // Create a new record
    create: async (req: Request, res: Response) => {
      try {
        const data = normalizeCrudData(req.body, String(modelName));
        const record = await model.create({
          data,
        });

        const targetTitle = record[titleField] || record.name || record.caption || record.id;

        await logActivity({
          req,
          action: 'created',
          module: moduleTitle,
          target: String(targetTitle),
          kind: 'create',
        });

        return sendSuccess(res, record, `${moduleTitle} record created successfully`, 201);
      } catch (error: any) {
        return sendError(res, error.message || `Failed to create ${moduleTitle}`, 500);
      }
    },

    // Update an existing record
    update: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const data = normalizeCrudData(req.body, String(modelName));
        const record = await model.update({
          where: { id },
          data,
        });

        const targetTitle = record[titleField] || record.name || record.caption || record.id;

        await logActivity({
          req,
          action: 'updated',
          module: moduleTitle,
          target: String(targetTitle),
          kind: 'update',
        });

        return sendSuccess(res, record, `${moduleTitle} record updated successfully`);
      } catch (error: any) {
        return sendError(res, error.message || `Failed to update ${moduleTitle}`, 500);
      }
    },

    // Delete a record
    delete: async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const existing = await model.findUnique({ where: { id } });
        if (!existing) {
          return sendError(res, `${moduleTitle} record not found`, 404);
        }

        const targetTitle = existing[titleField] || existing.name || existing.caption || id;

        await model.delete({ where: { id } });

        await logActivity({
          req,
          action: 'deleted',
          module: moduleTitle,
          target: String(targetTitle),
          kind: 'delete',
        });

        return sendSuccess(res, { id }, `${moduleTitle} record deleted successfully`);
      } catch (error: any) {
        return sendError(res, error.message || `Failed to delete ${moduleTitle}`, 500);
      }
    },
  };
}
