import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "participant"],
      default: "participant",
    },
  },

  { timestamps: true }
);

//hashing the password before saving it the databse
userSchema.pre("save", async function (next) {
  if (!this.isModified("passowrd")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);

    //saving the password after hashing
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

//comparing the entered password with the hashed password
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(error.message);
  }
};

const User = mongoose.model("User", userSchema);

export default User;