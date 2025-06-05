import dotenv from 'dotenv';
dotenv.config(); // check the env for PORT

import express from 'express';
import client from 'prom-client';

const app = express();
const PORT: number = parseInt(process.env.PORT || '3001', 10);

// Collect default (mem, cpu) metrics
client.collectDefaultMetrics();

// Middleware
app.use(express.json());

// Basic health route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Expose /metrics for Prometheus
app.get('/metrics', async (_req, res) => {
  try {
    res.set('Content-type', client.register.contentType);
    res.set('Cache-Control', 'no-store'); // no caching
    res.end(await client.register.metrics());
  } catch (err) {
    console.error('Metrics error:', err);
    res.status(500).end('Metrics collection failed');
  }
});

if (process.env.NODE_ENV === 'production') {
  console.log('Serving in production mode');
  // Serves client's dist build output folder
  app.use(express.static('../client/dist'));
}

// Default route
app.use((req, res) => {
  console.log(`${req.method} request to ${req.url}`);
  res.json({ message: 'Hello from the TypeScript server!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
