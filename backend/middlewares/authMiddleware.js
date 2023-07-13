import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;

//Middlware function that require admin authentication
export const onlyAdmin = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: " AUthorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Access denied , Only admin can perform this action",
      });
    }
    req.admin = decoded;

    next();
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
