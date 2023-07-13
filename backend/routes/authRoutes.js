import express from 'express'
import  { login, signup } from '../controllers/authController.js'
const authRouter= express.Router();

//SignUp Route
authRouter.post('/signup',signup);

//Login Route

authRouter.post('/login', login);

export default authRouter;