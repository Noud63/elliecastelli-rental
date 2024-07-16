import { Schema, model, models } from "mongoose";

const RegisterSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: String,
      required : false
    },
    verifyToken: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
  }
);

const Register = models.Register || model("Register", RegisterSchema);

export default Register;
