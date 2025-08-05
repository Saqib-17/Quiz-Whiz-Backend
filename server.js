import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import questionRoutes from './routes/questionRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 4000;

// CORS Configuration: allow requests from both web and mobile clients
const cors = require('cors');

app.use(cors({
  origin: [
    'https://donation-bd-backend.vercel.app', // Live API URL
    'https://quiz-whiz-frontend.vercel.app/', // Replace this with your actual website URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Server of Quiz-Whiz');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
