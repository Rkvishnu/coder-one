import mongoose from "mongoose";
const testCaseSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    input: {
      type: String,
      required: true,
    },

    output: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TestCase = mongoose.model("TestCase", testCaseSchema);
