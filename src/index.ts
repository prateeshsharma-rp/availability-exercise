import express from 'express';
import { fileURLToPath } from 'node:url';
import availabilityRoutes from './routes/availability.ts';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api', availabilityRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Only start listening when this file is run directly (e.g. `npm run dev`).
// Tests import `app` and drive it with supertest instead.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
