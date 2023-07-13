import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;

//functio to generate auth token
export const generateAuthToken = async (user) => {
  const payload = {
    userId: user._id,
    role: user.role,
  };

  return jwt.sign(payload,secretKey,{expiresIn: '1d'})
};
