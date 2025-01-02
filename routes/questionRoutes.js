import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

// Get all questions for a subject
router.get("/:subject", async (req, res) => {
  try {
    const questions = await Question.find({ subject: req.params.subject });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Questions", error });
  }
});

// Create a new question
router.post("/", async (req, res) => {
  try {
    const { subject, title, options } = req.body;
    const question = new Question({ subject, title, options });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: "Error creating question", error });
  }
});

export default router;
