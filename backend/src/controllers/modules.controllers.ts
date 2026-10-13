import { createCrudController } from './crud.factory';

export const positionsController = createCrudController({
  modelName: 'position',
  moduleTitle: 'Academic & Executive Positions',
  searchFields: ['role', 'organisation', 'location', 'description'],
  filterFields: ['status'],
  titleField: 'role',
  defaultSort: { field: 'startYear', order: 'desc' },
});

export const educationController = createCrudController({
  modelName: 'education',
  moduleTitle: 'Education & Credentials',
  searchFields: ['degree', 'institution', 'specialization', 'notes'],
  filterFields: ['status'],
  titleField: 'degree',
  defaultSort: { field: 'year', order: 'desc' },
});

export const awardsController = createCrudController({
  modelName: 'award',
  moduleTitle: 'Awards & Recognitions',
  searchFields: ['title', 'organisation', 'citation'],
  filterFields: ['status', 'category'],
  titleField: 'title',
  defaultSort: { field: 'year', order: 'desc' },
});

export const patentsController = createCrudController({
  modelName: 'patent',
  moduleTitle: 'Patents & Intellectual Property',
  searchFields: ['title', 'patentNumber', 'inventors', 'abstract'],
  filterFields: ['status', 'country'],
  titleField: 'title',
  defaultSort: { field: 'createdAt', order: 'desc' },
});

export const publicationsController = createCrudController({
  modelName: 'publication',
  moduleTitle: 'Research Publications',
  searchFields: ['title', 'journal', 'authors', 'abstract', 'doi'],
  filterFields: ['status', 'indexing'],
  titleField: 'title',
  defaultSort: { field: 'year', order: 'desc' },
});

export const supervisionController = createCrudController({
  modelName: 'supervision',
  moduleTitle: 'PhD Supervision & Mentorship',
  searchFields: ['scholar', 'thesis', 'coSupervisor', 'progress'],
  filterFields: ['status', 'program'],
  titleField: 'scholar',
  defaultSort: { field: 'enrolledYear', order: 'desc' },
});

export const booksController = createCrudController({
  modelName: 'book',
  moduleTitle: 'Books Authored & Chapters',
  searchFields: ['title', 'publisher', 'isbn', 'coAuthors', 'abstract'],
  filterFields: ['status', 'kind'],
  titleField: 'title',
  defaultSort: { field: 'year', order: 'desc' },
});

export const grantsController = createCrudController({
  modelName: 'grant',
  moduleTitle: 'Research Grants & Funding',
  searchFields: ['project', 'agency', 'outcomes'],
  filterFields: ['status', 'role'],
  titleField: 'project',
  defaultSort: { field: 'startYear', order: 'desc' },
});

export const mousController = createCrudController({
  modelName: 'mou',
  moduleTitle: 'MoUs & Strategic Alliances',
  searchFields: ['partner', 'country', 'scope', 'notes'],
  filterFields: ['status'],
  titleField: 'partner',
  defaultSort: { field: 'createdAt', order: 'desc' },
});

export const affiliationsController = createCrudController({
  modelName: 'affiliation',
  moduleTitle: 'Affiliations & Governance',
  searchFields: ['body', 'position', 'notes'],
  filterFields: ['status', 'kind'],
  titleField: 'body',
  defaultSort: { field: 'since', order: 'desc' },
});

export const conferencesController = createCrudController({
  modelName: 'conference',
  moduleTitle: 'Conferences & Keynotes',
  searchFields: ['title', 'event', 'location', 'summary'],
  filterFields: ['status', 'role'],
  titleField: 'title',
  defaultSort: { field: 'date', order: 'desc' },
});

export const galleryController = createCrudController({
  modelName: 'galleryItem',
  moduleTitle: 'Campus & Leadership Gallery',
  searchFields: ['caption', 'credit', 'album'],
  filterFields: ['status', 'album'],
  titleField: 'caption',
  defaultSort: { field: 'orderIndex', order: 'asc' },
});

export const newsController = createCrudController({
  modelName: 'news',
  moduleTitle: 'News & Media Coverage',
  searchFields: ['headline', 'outlet', 'summary'],
  filterFields: ['status', 'category'],
  titleField: 'headline',
  defaultSort: { field: 'date', order: 'desc' },
});

export const mediaController = createCrudController({
  modelName: 'mediaAsset',
  moduleTitle: 'Media Library',
  searchFields: ['name'],
  filterFields: ['status', 'kind', 'folder'],
  titleField: 'name',
  defaultSort: { field: 'createdAt', order: 'desc' },
});

export const documentsController = createCrudController({
  modelName: 'document',
  moduleTitle: 'Document Management',
  searchFields: ['name', 'notes'],
  filterFields: ['status', 'category', 'visibility', 'fileType'],
  titleField: 'name',
  defaultSort: { field: 'createdAt', order: 'desc' },
});

export const usersController = createCrudController({
  modelName: 'user',
  moduleTitle: 'Users & Roles',
  searchFields: ['name', 'email', 'department'],
  filterFields: ['status', 'role'],
  titleField: 'name',
  defaultSort: { field: 'createdAt', order: 'desc' },
});

export const notificationsController = createCrudController({
  modelName: 'notification',
  moduleTitle: 'Notifications',
  searchFields: ['title', 'message'],
  filterFields: ['status', 'kind'],
  titleField: 'title',
  defaultSort: { field: 'time', order: 'desc' },
});

export const activityLogsController = createCrudController({
  modelName: 'activityLog',
  moduleTitle: 'Activity Logs',
  searchFields: ['actor', 'action', 'module', 'target', 'ip'],
  filterFields: ['kind', 'action', 'module'],
  titleField: 'target',
  defaultSort: { field: 'time', order: 'desc' },
});
