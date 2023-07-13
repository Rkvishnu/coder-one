import express from "express";
import { onlyAdmin } from "../middlewares/authMiddleware.js";
import { createTestCase, deleteTestCase } from "../controllers/testCaseController.js";



const testCaseRouter = express.Router();

//protected router that require the admin authentication
testCaseRouter.use(onlyAdmin);

//test case management routes
testCaseRouter.post("/", createTestCase);
testCaseRouter.delete("/:id",deleteTestCase);

export default testCaseRouter;
