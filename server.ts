import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { handleApiRequest } from './src/server/apiHandler.ts';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Universal API Middleware
app.use(async (req, res, next) => {
  if (req.url && req.url.startsWith('/api/')) {
    await handleApiRequest(req, res, next);
  } else {
    next();
  }
});

// Serve frontend dist
const distPath = path.resolve(process.cwd(), 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Production server running on http://0.0.0.0:${PORT}`);
});
