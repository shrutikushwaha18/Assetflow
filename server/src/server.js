import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './app.js';
import connectDB from './config/db.js';
import seedAdmin from './config/seedAdmin.js';

const PORT = process.env.PORT || 5000;

connectDB();

// Seed admin account (if missing) then start server.
// If the desired port is in use, try the next few ports automatically.
const start = async () => {
  await seedAdmin();
  const maxAttempts = 5;
  for (let i = 0; i < maxAttempts; i++) {
    const tryPort = Number(PORT) + i;
    const server = http.createServer(app);
    try {
      await new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(tryPort, () => resolve(server));
      });
      console.log(`AssetFlow server running on port ${tryPort}`);
      return;
    } catch (err) {
      if (err && err.code === 'EADDRINUSE') {
        console.warn(`Port ${tryPort} in use, trying ${tryPort + 1}...`);
        // try next
        continue;
      }
      console.error('Server failed to start:', err);
      process.exit(1);
    }
  }
  console.error(`Unable to bind to ports ${PORT} - ${Number(PORT) + maxAttempts - 1}`);
  process.exit(1);
};

start();
