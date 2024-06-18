import { Schema, model, models } from "mongoose";

const ResetSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Reset = models.Reset || model("Reset", ResetSchema);

export default Reset;
