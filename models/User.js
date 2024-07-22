import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    avatar: [
      {
        type: String,
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    verifyToken: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
