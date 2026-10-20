import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userClass: { type: String, required: true },
  uid: { type: String, required: true, unique: true },
  totalCorrectAnswers: { type: Number, default: 0 },
  totalAnswered: { type: Number, default: 0 },
  attempts: { type: Number, default: 0 },
  quizHistory: [
    {
      subject: { type: String, required: true },
      setName: { type: String, required: true },
      correctAnswers: { type: Number, required: true },
      totalQuestions: { type: Number, required: true },
      attemptedAt: { type: Date, default: Date.now },
      answers: [
        {
          questionNumber: { type: Number, required: true },
          question: { type: String, required: true },
          selectedAnswer: { type: String, required: true },
          correctAnswer: { type: String, required: true },
          isCorrect: { type: Boolean, required: true },
        },
      ],
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
