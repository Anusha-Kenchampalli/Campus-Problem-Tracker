import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { seedDatabase } from './seed/seedData.js';

// Modular Route Imports
import authRoutes from './routes/authRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory or project root
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB().then((conn) => {
  if (conn) {
    seedDatabase();
  } else {
    console.warn('⚠️ Server running without active MongoDB connection.');
  }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Base API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Campus Problem Tracker MongoDB Server API is operational 🚀' });
});

// Mount Modular Routers
app.use('/api/auth', authRoutes);
app.use('/api', problemRoutes);
app.use('/api', departmentRoutes);
app.use('/api', staffRoutes);
app.use('/api', categoryRoutes);
app.use('/api', locationRoutes);
app.use('/api', analyticsRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', notificationRoutes);

// Start Server with EADDRINUSE handling
const server = app.listen(PORT, () => {
  console.log(`🚀 Campus Problem Tracker REST & MongoDB Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`⚠️ Port ${PORT} is currently in use by another process.`);
    console.error(`Please close any existing running instance of server.js or free up port ${PORT}.`);
  } else {
    console.error('Server Error:', err);
  }
});
