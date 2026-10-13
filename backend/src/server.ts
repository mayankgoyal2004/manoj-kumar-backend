import app from './app';
import { env } from './config/env';
import prisma from './config/prisma';

const PORT = env.PORT;

async function startServer() {
  try {
    // Test database connection
    console.log('🔄 Connecting to PostgreSQL database with Prisma...');
    await prisma.$connect();
    console.log('✅ PostgreSQL Database connected successfully via Prisma!');

    const server = app.listen(PORT, () => {
      console.log(`🚀 Portfolio & Dashboard Backend running on http://localhost:${PORT}`);
      console.log(`📡 Public API: http://localhost:${PORT}/api/public`);
      console.log(`🔐 Admin API:  http://localhost:${PORT}/api/admin`);
      console.log(`🩺 Health:     http://localhost:${PORT}/health`);
    });

    const shutdown = async (signal: string) => {
      console.log(`\n🛑 Received ${signal}. Initiating graceful shutdown...`);
      server.close(async () => {
        console.log('🔌 HTTP server closed.');
        await prisma.$disconnect();
        console.log('🔌 Prisma disconnected.');
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (error: any) {
    console.error('❌ Failed to start server:', error.message);
    console.log('💡 Note: Verify that your PostgreSQL database is running and DATABASE_URL in backend/.env is correct.');
    console.log('Starting HTTP server in offline mode so that health checks and non-DB handlers still work...');
    app.listen(PORT, () => {
      console.log(`🚀 Portfolio Backend listening on http://localhost:${PORT} (Database pending connection)`);
    });
  }
}

startServer();
