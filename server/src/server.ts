import dotenv from 'dotenv';
dotenv.config(); // check the env for PORT

import express from 'express';

const app = express();
const PORT = 3001;

// app.use(express.json());
/* temporary: to verify the frontend is communicating with the backend */
app.use((req, res) => {
  console.log(`${req.method} request to ${req.url}`);
  res.json({ message: 'Hello from the TypeScript server!' });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

if (process.env.NODE_ENV === 'production') {
  console.log('Serving in production mode');
  // Serves client's dist build output folder
  app.use(express.static('../client/dist'));
}
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT.toString()}}`);
});
