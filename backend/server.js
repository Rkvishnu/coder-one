import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import questionRouter from "./routes/questionRoutes.js";
import testCaseRouter from "./routes/testCaseRoutes.js";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";

//////////////
dotenv.config();
const app = express();

//middlwares
app.use(express.json()); // middlware to parse the json requests

// routes
app.get("/", (req, res) => {
  res.send("Welcome to our coding platform ");
});

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

//Routes
app.use("/api/auth", authRouter);
app.use("/api/questions", questionRouter);
app.use("/api/testcases", testCaseRouter);
app.use("/api/users", userRouter);

// Database connection function
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
