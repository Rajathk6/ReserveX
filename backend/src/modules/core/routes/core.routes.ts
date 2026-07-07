import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send('hello');
});

router.get('/health', (req, res) => {
  return res.json({
    status: 'UP',
  });
});

export default router;
