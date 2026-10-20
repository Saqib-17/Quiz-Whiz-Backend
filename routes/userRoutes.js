import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/leaderboard", async (req, res) => {
  try {
    const users = await User.find()
      .select("uid fullName totalCorrectAnswers totalAnswered attempts")
      .sort({ totalCorrectAnswers: -1, totalAnswered: -1 });

    res.json(users);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
});

router.post("/:uid/attempts", async (req, res) => {
  try {
    const { answers, subject, setName } = req.body;

    if (
      !Array.isArray(answers) ||
      answers.length === 0 ||
      typeof subject !== "string" ||
      !subject.trim() ||
      typeof setName !== "string" ||
      !setName.trim() ||
      answers.some(
        (answer) =>
          typeof answer?.isCorrect !== "boolean" ||
          typeof answer.question !== "string" ||
          typeof answer.selectedAnswer !== "string" ||
          typeof answer.correctAnswer !== "string",
      )
    ) {
      return res.status(400).json({ message: "A valid quiz result is required." });
    }

    const totalCorrectAnswers = answers.filter((answer) => answer.isCorrect).length;
    const user = await User.findOneAndUpdate(
      { uid: req.params.uid },
      {
        $inc: {
          totalCorrectAnswers,
          totalAnswered: answers.length,
          attempts: 1,
        },
        $push: {
          quizHistory: {
            subject: subject.trim(),
            setName: setName.trim(),
            correctAnswers: totalCorrectAnswers,
            totalQuestions: answers.length,
            attemptedAt: new Date(),
            answers,
          },
        },
      },
      { new: true, runValidators: true },
    ).select("uid fullName totalCorrectAnswers totalAnswered attempts");

    if (!user) {
      return res.status(404).json({ message: "User profile not found." });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error recording quiz attempt:", error);
    res.status(500).json({ message: "Error recording quiz attempt" });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid }).select(
      "fullName email userClass quizHistory",
    );

    if (!user) {
      return res.status(404).json({ message: "User profile not found." });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

/**
 * ✅ GET /api/users
 * Returns all users (for testing or admin purposes)
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
});

/**
 * ✅ POST /api/users
 * Creates a new user (from mobile app or frontend)
 */
router.post("/", async (req, res) => {
  console.log("Request Body:", req.body);

  try {
    const { fullName, email, userClass, uid } = req.body;

    // Validate request
    if (!fullName || !email || !userClass || !uid) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Create new user
    const user = new User({ fullName, email, userClass, uid });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
});

export default router;
