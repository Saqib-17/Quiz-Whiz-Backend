import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import questionRoutes from './routes/questionRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// CORS setup
app.use(
  cors({
    origin: [
      'https://quiz-whiz-frontend.vercel.app',
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:8081',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware
app.use(express.json());

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);

// Root route for testing
app.get('/', (req, res) => {
  res.send('Welcome to Server of Quiz-Whiz');
});

// Export the Express app for Vercel
export default app;
