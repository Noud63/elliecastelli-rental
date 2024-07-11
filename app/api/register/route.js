import connectDB from "@/config/database";
import Register from "@/models/Register";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  // request = body data
  try {
    await connectDB();

    const { name, email, username, password } = await request.json();

    //Find user in database
    const user = await Register.findOne({ email: email });

    if (user) {
      return new Response(JSON.stringify({ message: "User already exist!"}), { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Register.create({
      email: email,
      name: name,
      username: username,
      password: hashedPassword,
    });

    return new Response(JSON.stringify(newUser), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
};
