import { Router } from 'express';
import env from '../../../config/env.js';
import { successResponse } from '../../../utils/apiResponse.js';

const router = Router();

router.get('/', (req, res) => {
  return successResponse(res, 'Welcome to ReserveX API', {
    message: 'ReserveX API is running successfully',
    version: '0.2.0',
  });
});

router.get('/health', (req, res) => {
  return successResponse(res, 'Health check completed', {
    status: 'UP',
    service: 'ReserveX API',
    version: '0.2.0',
    environment: env.NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;
