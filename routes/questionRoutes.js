import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

// Get all question sets for a subject
router.get("/:subject", async (req, res) => {
  try {
    const questionSets = await Question.find({
      subject: req.params.subject,
      questions: { $exists: true },
    }).sort({ setName: 1 });
    res.status(200).json(questionSets);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Questions", error });
  }
});

// Get one named question set for a subject
router.get("/:subject/:setName", async (req, res) => {
  try {
    const questionSet = await Question.findOne({
      subject: req.params.subject,
      setName: req.params.setName,
      questions: { $exists: true },
    });

    if (!questionSet) {
      return res.status(404).json({ message: "Question set not found" });
    }

    res.status(200).json(questionSet);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Question Set", error });
  }
});

// Create a complete question set
router.post("/", async (req, res) => {
  try {
    const { subject, setName, questions } = req.body;
    const questionSet = new Question({ subject, setName, questions });
    await questionSet.save();
    res.status(201).json(questionSet);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "This set name already exists for the subject" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Error creating question set", error });
  }
});

export default router;
