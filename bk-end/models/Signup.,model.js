import mongoose from "mongoose";
const { Schema } = mongoose;
const SignUpSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      minLength: [3, "please provide atleast 3 characters"],
      maxLength: [50],
      required: [true, "please provide the username"],
    },
    email: {
      type: String,
      required: "Email address is required",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      minLength: [8, "please provide atleast 5 characters"],
      maxLength: [300],
      require: [true, "please provide the password"],
    },
  },
  {
    timestamps: true,
  }
);

export const SignUp_User =
  mongoose.model["SignUp_User"] || mongoose.model("SignUp_User", SignUpSchema);
