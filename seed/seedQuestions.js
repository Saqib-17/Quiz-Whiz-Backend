import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Question from "../models/Question.js";

dotenv.config();

const __dirname = path.resolve();
const filePath = path.join(__dirname, "seed", "questions.json");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seedQuestions = async () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const questions = JSON.parse(data);

    await Question.insertMany(questions);
    console.log("Questions inserted successfully!");
    process.exit();
  } catch (error) {
    console.error("Error inserting questions:", error.message);
    process.exit(1);
  }
};

seedQuestions();
