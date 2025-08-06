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

app.use(cors({
  origin: [
    'https://quiz-whiz-frontend.vercel.app',
    'http://localhost:3000',  // web local
    'http://localhost:8081',  // expo mobile
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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
