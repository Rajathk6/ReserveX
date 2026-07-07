import { Router } from 'express';
import env from '../../../config/env.js';

const router = Router();

router.get('/', (req, res) => {
  return res.send('hello');
});

router.get('/health', (req, res) => {
  return res.json({
    status: 'UP',
    service: 'ReserveX Backend',
    version: '0.2.0',
    environment: env.NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;
