import app from './app.js';
import { prisma } from './config/database.js';
import env from './config/env.js';
import logger from './config/logger.js';
import { redis } from './config/redis.js';
import { bookingExpiryJob } from './jobs/bookingExpiry.job.js';

const PORT = env.PORT;

await prisma.$connect();
await redis.connect();

app.listen(PORT, () => {
  bookingExpiryJob();
  logger.info(`server is running on port http://localhost:${PORT}`);

  redis.on('connect', () => {
    logger.info('connected to redis');
  });

  redis.on('error', (error) => {
    logger.error(error, 'redis error');
  });

  redis.on('reconnecting', () => {
    logger.warn('redis is reconnecting');
  });

  process.on('SIGINT', async () => {
    await prisma.$disconnect();
    await redis.quit();
    process.exit(0);
  });
});
