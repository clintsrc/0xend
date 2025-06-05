import dotenv from 'dotenv';
dotenv.config(); // check the env for PORT

import express from 'express';
import client from 'prom-client';

const app = express();
const PORT = 3001;

// Collect default (mem, cpu) metrics
client.collectDefaultMetrics();

// Basic health route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Expose /metrics for Prometheus
app.get('/metrics', async (_req, res) => {
  try {
    res.set('Content-type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

// app.use(express.json());
/* Default route:
   temporary: to verify the frontend is communicating with the backend */
app.use((req, res) => {
  console.log(`${req.method} request to ${req.url}`);
  res.json({ message: 'Hello from the TypeScript server!' });
});

if (process.env.NODE_ENV === 'production') {
  console.log('Serving in production mode');
  // Serves client's dist build output folder
  app.use(express.static('../client/dist'));
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT.toString()}}`);
});
