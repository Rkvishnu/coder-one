import Question from "../models/Question.js";
import { SphereEngineAPI } from "../config/SphereEngineAPI.js";

//Get all question
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({});
    res.json(questions);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Create a question (problem) using Sphere Engine API
export const createQuestion = async (req, res) => {
  try {
    const { title, description } = req.body;

    const problemId = await SphereEngineAPI.createProblem(title, description);

    const newQuestion = new Question({
      title,
      description,
      sphereEngineProblemId: problemId,
    });
    await newQuestion.save();

    res.json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Get a question by it's Id
export const getQuestionById = async (req, res) => {
  try {
    const id = req.params.id;
    const question = await Question.findById(id);

    if (!question) {
      return res.json({
        message: "Question not found!",
      });
    }

    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Updating a quetion by it's id
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params.id;
    const { title, description } = req.body;

    //check that if quesrion exist or not
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    //if existt then update question details
    question.title = title;
    question.description = description;

    await question.save();
    res.json({
      message: "question updated successfully",
      question,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//deleting question by id
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params.id;

    //check if question with this id exist or not
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    await question.remove();
    res.json({
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//checking user solution for a question
export const verifySolution = async (req, res) => {
  try {
    const { id } = req.params;
    const { solution } = req.body;

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Using SphereEngine API to check the user's solution
    const sphereEngineResponse = await SphereEngineAPI.checkSolution(
      question,
      solution
    );

    // Parse the response and extract the result and error
    const { result, error } = sphereEngineResponse;

    // Prepare the response based on the result
    let response;
    if (result === "success") {
      response = { status: "success", message: "Solution is correct" };
    } else {
      response = { status: "error", message: error };
    }

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//fucntion where admin can add the testcases for a question
export const addTestCase = async (req, res) => {
  try {
    const { id } = req.params.id;
    const { input, output } = req.body;

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    //adding testcases to the question's testCases array
    question.testCases.push({ input, output });
    await question.save();
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
