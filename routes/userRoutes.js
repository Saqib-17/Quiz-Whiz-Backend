import express from "express";
import User from "../models/user.js";

const router = express.Router();

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
