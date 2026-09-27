import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Question from "../models/Question.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "questions.json");

const seedQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const data = fs.readFileSync(filePath, "utf-8");
    const questionSets = JSON.parse(data);

    if (!Array.isArray(questionSets)) {
      throw new Error("Seed data must be an array of question sets");
    }

    for (const questionSet of questionSets) {
      await Question.updateOne(
        { subject: questionSet.subject, setName: questionSet.setName },
        { $set: questionSet },
        { upsert: true, runValidators: true }
      );
    }

    console.log(`${questionSets.length} question set(s) seeded successfully.`);
  } catch (error) {
    console.error("Error seeding question sets:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedQuestions();
