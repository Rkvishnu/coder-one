import { TestCase } from "../models/TestCase.js";

//function to create a test case
export const createTestCase = async (req, res) => {
  try {
    const { questionId, input, output } = req.body;

    const newTestCase = new TestCase({
      question: questionId,
      input,
      output,
    });

    await newTestCase.save();
    res.json(newTestCase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: " Internal Server Error" });
  }
};
//Delete a test case by it's ID
export const deleteTestCase = async (req, res) => {
  try {
    const { id } = req.params.id;

    const testcase_exist = await TestCase.findById(id);
    if (!testcase_exist) {
      return res.status(404).json({ message: "Test case not found" });
    }

    await testcase_exist.remove();

    res.json({
      message: "Test case deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
