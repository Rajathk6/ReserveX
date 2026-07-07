import express from 'express';
import { env } from './config/env.js';

const app = express();
const PORT = env.PORT || 3000;

app.get('/', (req, res) => {
  console.log('request received');
  console.log('method', req.method);
  console.log('req headers:', req.headers);
  console.log('url', req.url);
  res.send('Hello, ReserveX!');
});

app.get('/health', (req, res) => {
  console.log('url', req.url);
  return res.status(200).json({
    status: 'ok',
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
