import Question from "../models/Question";

//checking user solution for a question
export const checkSolution = async (req, res) => {
    try {
      const { id } = req.params.id;
      const { solution } = req.body;
  
      //finding the question from the databse
      const question = await Question.findById(id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
  
      //using  SPHERE ENGINE API to check the user's solution
      const sphereEngineResponse = await SphereEngineAPI.checkSolution(
        question,
        solution
      );
  
      // if we are getting the respnse from sphere engine api  then parse the response and extracting the result and error
      const { result, error } = sphereEngineResponse;
  
      let response;
      if (result == "success") {
        response = { status: "success", message: "Your Solution is correct" };
      } else {
        response = {
          status: "error",
          message: "incorrect solution" + error.message,
        };
      }
  
      res.json(response);
    } catch (error) {}
  };