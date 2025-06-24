import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import { runMigrations } from './database/migrate';
import authRoutes from './routes/auth';
import recordRoutes from './routes/records';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/records', recordRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    await runMigrations();
    
    app.listen(PORT, () => {
      console.log(`⚡ Server running on port ${PORT}`);
      console.log(`✨ API endpoints:`);
      console.log(`✅   POST /auth/register - Register new user`);
      console.log(`✅   POST /auth/login - Login user`);
      console.log(`✅   GET /records - Get user's records (requires auth)`);
      console.log(`✅   POST /records - Create new record (requires auth)`);
      console.log(`✅   PUT /records/:id - Update record (requires auth)`);
      console.log(`✅   DELETE /records/:id - Delete record (requires auth)`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();