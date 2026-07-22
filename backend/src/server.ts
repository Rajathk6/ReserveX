import app from './app.js';
import env from './config/env.js';
import logger from './config/logger.js';
import { bookingExpiryJob } from './jobs/bookingExpiry.job.js';

const PORT = env.PORT;

app.listen(PORT, () => {
  bookingExpiryJob();
  logger.info(`server is running on port http://localhost:${PORT}`);
});
