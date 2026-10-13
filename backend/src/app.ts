import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { env } from './config/env';
import publicRoutes from './routes/public.routes';
import adminRoutes from './routes/admin.routes';
import { errorHandler } from './middlewares/error.middleware';
import { sendError, sendSuccess } from './utils/response';

const app: Application = express();

// Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration supporting both website and dashboard
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (
        env.CORS_ORIGINS.includes('*') ||
        env.CORS_ORIGINS.includes(origin) ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1')
      ) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Logging
if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));
}

// Body parsing
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static uploads directory
const uploadsPath = path.resolve(process.cwd(), env.UPLOAD_DIR);
app.use('/uploads', express.static(uploadsPath));
const publicImagesPath = path.resolve(process.cwd(), 'public/images');
app.use('/images', express.static(publicImagesPath));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  return sendSuccess(res, { status: 'healthy', timestamp: new Date().toISOString() }, 'Portfolio API is operational');
});

// API Root documentation / status
app.get('/api', (req: Request, res: Response) => {
  return sendSuccess(
    res,
    {
      name: 'Executive Portfolio & Dashboard Backend API',
      version: '1.0.0',
      publicEndpoints: '/api/public',
      adminEndpoints: '/api/admin',
      health: '/health',
    },
    'Welcome to the Academic Portfolio Backend'
  );
});

// API Routes
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);

// Catch 404
app.use((req: Request, res: Response) => {
  return sendError(res, `Route ${req.method} ${req.originalUrl} not found`, 404);
});

// Global Error Handler
app.use(errorHandler);

export default app;
