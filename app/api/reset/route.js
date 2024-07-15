import Register from "@/models/Register";
import connectDB from "@/config/database";
import { nanoid } from "nanoid";
import { Resend } from "resend";
import ResetPasswordEmailTemplate from "@/components/ResetPasswordEmailTemplate";

const resend = new Resend(process.env.EMAIL_SERVER_PASSWORD);

export const POST = async(request) => {
  try {
    await connectDB();

    const { email } = await request.json();

    //Find user in database
    const user = await Register.findOne({ email: email });

     if (!user) {
       return new Response("User not found!", { status: 404 });
     }

    if (user) {
      const token = nanoid(32)
      
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [email],
      subject: "Reset password",
      react: ResetPasswordEmailTemplate(token) 
    });

    await Register.findOneAndUpdate({email:email}, {verifyToken:token})

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });

    }

  } catch (error) {
      console.log(error)
      return new Response("Something went wrong!", { status: 500 });

  }
};