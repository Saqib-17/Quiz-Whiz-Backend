import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import questionRoutes from './routes/questionRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 4000;

// ✅ CORS setup (allow frontend + local dev)
app.use(cors({
  origin: [
    'https://quiz-whiz-frontend.vercel.app', // deployed frontend
    'http://localhost:3000',                 // local web dev
    'http://localhost:8081',                 // Expo mobile dev
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);

// ✅ Root route for testing
app.get('/', (req, res) => {
  res.send('Welcome to Server of Quiz-Whiz');
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
