import axios from "axios";
const api_key = process.env.SPHERE_ENGINE_API_KEY;

export const SphereEngineAPI = {
  endpoint: process.env.SPHERE_ENGINE_ENDPOINT,

  //1st function
  createProblem: async (title, description) => {
    try {
      const response = await axios.post(
        `${SphereEngineAPI.endpoint}/problems`,
        {
          title,
          description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.SPHERE_ENGINE_API_KEY}`,
          },
        }
      );

      return response.data.problemId;
    } catch (error) {
      console.log(error.message);
      throw new Error('An error occurred while creating the problem');
    }
  },


  //2nd function
  checkSolution: async (question, solution) => {
    try {
      const { questionId } = question;

      const response = await axios.post(
        `${SphereEngineAPI.endpoint}/check-solution`,
        {
          questionId,
          solution,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${api_key}`,
          },
        }
      );
      return response.data;
    } catch (error) {
        console.log(error.message);
      throw new Error('An error occurred while checking the solution');
    }
  },
};
