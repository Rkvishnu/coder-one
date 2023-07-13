import express from "express";
import {onlyAdmin} from "../middlewares/authMiddleware.js";
import {
  getAllQuestions,
  createQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  verifySolution,
  addTestCase
} from "../controllers/questionController.js";

const questionRouter = express.Router();

//protected routes that require admin authentication
questionRouter.use(onlyAdmin);

//routes for question management
questionRouter.get("/", getAllQuestions);
questionRouter.post("/", createQuestion);
questionRouter.get("/:id", getQuestionById);
questionRouter.put("/:id", updateQuestion);
questionRouter.delete("/:id", deleteQuestion);

//ROUTER TO CHECK USER SOLUTION FOR A PARTICULAR QUESTION
questionRouter.post(":id/check-solution", verifySolution);

// Admin add test case to a question
questionRouter.post("/:id/testcases", addTestCase);

export default questionRouter;
