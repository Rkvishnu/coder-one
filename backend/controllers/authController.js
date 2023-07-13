import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// const secretKey = process.env.JWT_SECRET_KEY;
const secretKey = "random";

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists !! sign In Instead" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // payload:Unique information that we have to carry forward (like email, unique Id)
    const token = jwt.sign(
      { email: newuser.email, id: newuser._id },
      secretKey,
      { expiresIn: "1d" }
    );

    return res
      .status(201)
      .json({ message: "User created successfully" , newuser, token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login function
export const login = async (req, res) => {

  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email: email });

    console.log(userExists);

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const comparePassword = await User.compare(password, userExists.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "wrong credentials" });
    }

    const token = jwt.sign(
      { email: userExists.email, id: userExists._id },
      secretKey,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({ message: "login successfull", userExists,token });
  } catch (error) {
    res.status(500).json({ message: "SOmething went wrong" });
  }
};
