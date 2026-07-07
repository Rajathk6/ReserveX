import express from 'express';
import { pinoHttp } from 'pino-http';
import logger from './config/logger.js';

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
app.get('/', (req, res) => {
  return res.status(200).send('hello');
});

app.get('/health', (_req, res) => {
  return res.status(200).json({
    status: 'UP',
  });
});

export default app;
