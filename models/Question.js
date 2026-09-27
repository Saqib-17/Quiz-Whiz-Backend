import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
}, { _id: false });

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  options: {
    type: [optionSchema],
    required: true,
    validate: {
      validator: (options) => options.length > 0,
      message: "Each question must have at least one option",
    },
  },
}, { _id: false });

const questionSetSchema = new mongoose.Schema({
  subject: { type: String, required: true, trim: true },
  setName: { type: String, required: true, trim: true },
  questions: {
    type: [questionSchema],
    required: true,
    validate: {
      validator: (questions) => questions.length > 0,
      message: "A question set must contain at least one question",
    },
  },
}, { timestamps: true });

questionSetSchema.index(
  { subject: 1, setName: 1 },
  {
    unique: true,
    partialFilterExpression: { setName: { $type: "string" } },
  }
);

const Question = mongoose.model("Question", questionSetSchema);

export default Question;
