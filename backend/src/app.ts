import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.status(200).send('hello');
});

app.get('/health', (_req, res) => {
  return res.status(200).json({
    status: 'UP',
  });
});

export default app;
