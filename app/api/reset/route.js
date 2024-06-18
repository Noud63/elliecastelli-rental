import Reset from "@/models/Reset";
import User from "@/models/User";
import connectDB from "@/config/database";
import bcrypt from "bcrypt";

export const POST = async(request) => {
  try {
    await connectDB();

    const { email } = await request.json();

    //Find user in database
    const user = await User.findOne({ email: email });

    console.log(user)

     if (!user) {
       return new Response("User not found!", { status: 404 });
     }

    if (user) {
      return new Response(JSON.stringify(user), { status: 200 });
    }

  } catch (error) {
      console.log(error)
      return new Response("Something went wrong!", { status: 500 });

  }
};