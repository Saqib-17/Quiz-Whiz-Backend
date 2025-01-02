import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  title: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
