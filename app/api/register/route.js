import connectDB from "@/config/database";
import Register from "@/models/Register";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

export const POST = async (request) => {
  // request = body data
  try {
    await connectDB();

    const { name, email, username, password } = await request.json();

    //Find user in DB
    const user = await User.findOne({ email: email });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user if user is not found in DB
    if(!user){
        const newUser = await User.create({
        email: email,
        name: name,
        username: username,
        password: hashedPassword,
      });

     console.log(newUser)

      return new Response(JSON.stringify(newUser), {
        status: 200,
      });
    }

    // If user logged in first with google or facebook and no password is saved in DB.
    // Logging in with credentials you first have to register with password and update user document in DB
     if (user && user.password === undefined) {
       const newUser = await User.findOneAndUpdate(
         { email: email },
         { name: name, password: hashedPassword}
       );

       return new Response(JSON.stringify(newUser), {
         status: 200,
       });
     }else{
       return new Response(JSON.stringify({ message: "User already exist!" }), {
             status: 409,
          });
     }


} catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
};
