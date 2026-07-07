import express from 'express';
import { env } from './config/env.js';

const app = express();
const PORT = env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Hello, ReserveX!');
});

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
