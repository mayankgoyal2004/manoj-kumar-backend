import { Router } from 'express';
import { getProfile, getPublicOverview } from '../controllers/profile.controller';
import { getWebsiteSettings } from '../controllers/settings.controller';
import { submitPublicContact } from '../controllers/contact.controller';
import { validateBody, validateQuery } from '../middlewares/validate.middleware';
import { contactMessageSchema, paginationQuerySchema } from '../validators/modules.validator';
import {
  positionsController,
  educationController,
  awardsController,
  patentsController,
  publicationsController,
  supervisionController,
  booksController,
  grantsController,
  mousController,
  affiliationsController,
  conferencesController,
  galleryController,
  newsController,
  documentsController,
} from '../controllers/modules.controllers';

const router = Router();

// Fast consolidated landing bundle for the portfolio website
router.get('/overview', getPublicOverview);

// Executive Profile & Academic Bio
router.get('/profile', getProfile);

// Website Identity Configuration
router.get('/settings', getWebsiteSettings);

// Public Resource Collections (Supports ?search, ?category, ?page, ?pageSize)
router.get('/positions', validateQuery(paginationQuerySchema), positionsController.getPublic);
router.get('/education', validateQuery(paginationQuerySchema), educationController.getPublic);
router.get('/awards', validateQuery(paginationQuerySchema), awardsController.getPublic);
router.get('/patents', validateQuery(paginationQuerySchema), patentsController.getPublic);
router.get('/publications', validateQuery(paginationQuerySchema), publicationsController.getPublic);
router.get('/supervision', validateQuery(paginationQuerySchema), supervisionController.getPublic);
router.get('/books', validateQuery(paginationQuerySchema), booksController.getPublic);
router.get('/grants', validateQuery(paginationQuerySchema), grantsController.getPublic);
router.get('/mous', validateQuery(paginationQuerySchema), mousController.getPublic);
router.get('/affiliations', validateQuery(paginationQuerySchema), affiliationsController.getPublic);
router.get('/conferences', validateQuery(paginationQuerySchema), conferencesController.getPublic);
router.get('/gallery', validateQuery(paginationQuerySchema), galleryController.getPublic);
router.get('/news', validateQuery(paginationQuerySchema), newsController.getPublic);
router.get('/documents', validateQuery(paginationQuerySchema), documentsController.getPublic);

// Single Item View
router.get('/publications/:id', publicationsController.getById);
router.get('/books/:id', booksController.getById);
router.get('/patents/:id', patentsController.getById);
router.get('/news/:id', newsController.getById);

// Public Contact & Secretariat Submission
router.post('/contact', validateBody(contactMessageSchema), submitPublicContact);

export default router;
