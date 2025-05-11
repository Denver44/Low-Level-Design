import 'reflect-metadata'; // Add this at the top
import { env } from '@/common/utils/envConfig';
import { app, logger } from '@/server';
import { initializeDatabase } from './config/database';

const startServer = async () => {
  try {
    // Initialize database connection
    await initializeDatabase();
    logger.info('Database connection established successfully');

    const server = app.listen(env.PORT, () => {
      const { NODE_ENV, HOST, PORT } = env;
      logger.info(
        `Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`
      );
    });

    const onCloseSignal = () => {
      logger.info('sigint received, shutting down');
      server.close(() => {
        logger.info('server closed');
        process.exit();
      });
      setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
    };

    process.on('SIGINT', onCloseSignal);
    process.on('SIGTERM', onCloseSignal);
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
