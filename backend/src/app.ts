import express from 'express';
import { pinoHttp } from 'pino-http';
import logger from './config/logger.js';
import router from './routes/api.routes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(
  pinoHttp({
    logger,
  }),
);

// Base Routes
app.use('/api/v1', router);

export default app;
