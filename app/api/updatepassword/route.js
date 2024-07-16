import Register from "@/models/Register";
import connectDB from "@/config/database";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  try {
    const { newPassword, token } = await request.json();

    await connectDB();

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(newPassword, salt);

    const updatedPassword = await Register.findOneAndUpdate(
      { verifyToken: token },
      { password: passwordHashed }
    );

    if (updatedPassword) {
      return new Response(
        JSON.stringify(
          { message: "Password updated successfully!" },
          { status: 200 }
        )
      );
    } else {
      return new Response(
        JSON.stringify(
          { message: "Failed update attempt!" },
          { status: 404 }
        )
      );
    }
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
};
