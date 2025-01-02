import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Endpoint to create a new user
router.post("/", async (req, res) => {
  console.log("Request Body:", req.body); // Log request body for debugging
  try {
    const { fullName, email, userClass, uid } = req.body;

    // Validate the incoming request body
    if (!fullName || !email || !userClass || !uid) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check for existing user (optional, depending on requirements)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Create and save new user
    const user = new User({ fullName, email, userClass, uid });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
});

export default router;
