import { Router } from 'express';
import { login, register, getMe, updateAccount, changePassword } from '../controllers/auth.controller';
import { getProfile, updateProfile, updateProfileMetrics } from '../controllers/profile.controller';
import { getDashboardStats } from '../controllers/stats.controller';
import { getWebsiteSettings, updateWebsiteSettings } from '../controllers/settings.controller';
import { listContactMessages, updateContactMessage, deleteContactMessage } from '../controllers/contact.controller';
import { handleFileUpload } from '../controllers/upload.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validateBody, validateQuery } from '../middlewares/validate.middleware';
import { upload } from '../middlewares/upload.middleware';
import {
  loginSchema,
  registerSchema,
  updatePasswordSchema,
  updateAccountSchema,
} from '../validators/auth.validator';
import { profileUpdateSchema } from '../validators/profile.validator';
import {
  paginationQuerySchema,
  positionSchema,
  educationSchema,
  awardSchema,
  patentSchema,
  publicationSchema,
  supervisionSchema,
  bookSchema,
  grantSchema,
  mouSchema,
  affiliationSchema,
  conferenceSchema,
  gallerySchema,
  newsSchema,
  mediaSchema,
  documentSchema,
  userSchema,
  notificationSchema,
  websiteSettingSchema,
} from '../validators/modules.validator';
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
  mediaController,
  documentsController,
  usersController,
  notificationsController,
  activityLogsController,
} from '../controllers/modules.controllers';

const router = Router();

// ================= AUTHENTICATION (PUBLIC) =================
router.post('/auth/login', validateBody(loginSchema), login);
router.post('/auth/register', validateBody(registerSchema), register);

// ================= PROTECTED ADMIN ENDPOINTS =================
router.use(authenticate);

// Current User & Security
router.get('/auth/me', getMe);
router.put('/auth/account', validateBody(updateAccountSchema), updateAccount);
router.post('/auth/change-password', validateBody(updatePasswordSchema), changePassword);

// Dashboard Overview Analytics
router.get('/stats', getDashboardStats);

// File Upload Handler (Media & Document assets)
router.post('/upload', upload.single('file'), handleFileUpload);

// Executive Profile
router.get('/profile', getProfile);
router.put('/profile', validateBody(profileUpdateSchema), updateProfile);
router.put('/profile/metrics', updateProfileMetrics);

// Website Identity Configuration
router.get('/website-settings', getWebsiteSettings);
router.put('/website-settings', validateBody(websiteSettingSchema), updateWebsiteSettings);

// Secretariat Inquiries & Messages
router.get('/contact-messages', validateQuery(paginationQuerySchema), listContactMessages);
router.put('/contact-messages/:id', updateContactMessage);
router.delete('/contact-messages/:id', deleteContactMessage);

// Activity Logs (Read-only audit trail)
router.get('/activity-logs', validateQuery(paginationQuerySchema), activityLogsController.getAll);

// Notifications
router.get('/notifications', validateQuery(paginationQuerySchema), notificationsController.getAll);
router.post('/notifications', validateBody(notificationSchema), notificationsController.create);
router.put('/notifications/:id', validateBody(notificationSchema.partial()), notificationsController.update);
router.delete('/notifications/:id', notificationsController.delete);

// Helper for standard CRUD registration with validation
function registerCrud(
  path: string,
  controller: any,
  schema: any,
  roles?: any[]
) {
  const middlewares = roles ? [authorize(roles)] : [];
  router.get(path, validateQuery(paginationQuerySchema), controller.getAll);
  router.get(`${path}/:id`, controller.getById);
  router.post(path, ...middlewares, validateBody(schema), controller.create);
  router.put(`${path}/:id`, ...middlewares, validateBody(schema.partial()), controller.update);
  router.delete(`${path}/:id`, ...middlewares, controller.delete);
}

// 16 Portfolio & Dashboard Modules
registerCrud('/positions', positionsController, positionSchema);
registerCrud('/education', educationController, educationSchema);
registerCrud('/awards', awardsController, awardSchema);
registerCrud('/patents', patentsController, patentSchema);
registerCrud('/publications', publicationsController, publicationSchema);
registerCrud('/supervision', supervisionController, supervisionSchema);
registerCrud('/books', booksController, bookSchema);
registerCrud('/grants', grantsController, grantSchema);
registerCrud('/mous', mousController, mouSchema);
registerCrud('/affiliations', affiliationsController, affiliationSchema);
registerCrud('/conferences', conferencesController, conferenceSchema);
registerCrud('/gallery', galleryController, gallerySchema);
registerCrud('/news', newsController, newsSchema);
registerCrud('/media', mediaController, mediaSchema);
registerCrud('/documents', documentsController, documentSchema);
registerCrud('/users', usersController, userSchema, ['SUPER_ADMIN', 'ADMIN']);

export default router;
