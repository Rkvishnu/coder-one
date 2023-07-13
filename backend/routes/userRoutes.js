import express from 'express';
import { onlyAdmin } from '../middlewares/authMiddleware.js';
import {getUserQuestions} from '../controllers/userController.js'

const userRouter= express.Router();

//protected routes
userRouter.use(onlyAdmin);

// router for fetching user questions or admin submissions

userRouter.get('/questions',getUserQuestions)

export default userRouter