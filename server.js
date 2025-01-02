import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import questionRoutes from "./routes/questionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors()); // Update for production if needed
app.use(express.json());

// Routes
app.use("/api/questions", questionRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
