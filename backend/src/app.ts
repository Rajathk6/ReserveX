import express from 'express';
import { pinoHttp } from 'pino-http';
import logger from './config/logger.js';
import router from './routes/api.routes.js';
import { AppError } from './errors/app-errors.js';
import { errorHandler } from './middleware/errorHandler.js';

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

app.use((req, res, next) => {
  next(new AppError(404, 'Route Not Found'));
});

app.use(errorHandler);

export default app;
