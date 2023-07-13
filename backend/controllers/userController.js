import Question from "../models/Question.js";

// fetching usre Questions
export const getUserQuestions = async (req, res) => {
  try {
    const questions = await Question.find({
      user: req.admin.userId,
    });
    res.json(questions);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
