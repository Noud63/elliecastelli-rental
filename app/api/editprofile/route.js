import User from "@/models/User";
import connectDB from "@/config/database";

import { getSessionUser } from "@/utils/getSessionUser";

export const PUT = async (request) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user.id) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    const { name, email } = await request.json();
    console.log(name, email);

     const updateDocument = {
       $set: {
         name: name,
       },
     };

    const updated = await User.updateOne({_id:userId}, updateDocument)
   
    if (updated) {
      return new Response(JSON.stringify(updated), { status: 200 });
    } else {
      return new Response("Update failed!", { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
};
