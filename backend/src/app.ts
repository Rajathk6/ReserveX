import express from 'express';
import { pinoHttp } from 'pino-http';
import cookieParser from 'cookie-parser';

import logger from './config/logger.js';
import router from './routes/api.routes.js';
import { AppError } from './errors/appErrors.js';
import { errorHandler } from './middleware/ErrorHandler.js';

const app = express();

// Middleware
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

app.use(
  pinoHttp({
    logger,
  }),
);

// Base Routes
app.use('/api/v1', router);

app.use((_req, _res, next) => {
  next(new AppError(404, 'Route Not Found'));
});

app.use(errorHandler);

export default app;
