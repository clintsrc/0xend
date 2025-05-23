import express from 'express';

const app = express();
const PORT = 3001;

// "eslint.enable": false,  // to debug eslint configs
const x = 1; // the auto-fix should change 'let' to 'const'

// app.use(express.json());
/* temporary: to verify the frontend is communicating with the backend */
app.use((req, res) => {
  console.log(`${req.method} request to ${req.url}`);
  res.json({ message: 'Hello from the TypeScript server!' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the TypeScript server!' });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
