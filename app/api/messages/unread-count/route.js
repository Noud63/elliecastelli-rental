import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic"; // To avoid problems with Vercel deployment

// PUT /api/messages/unread-count

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("User ID is required!", {
        status: 401,
      });
    }

    const { userId } = sessionUser;
    console.log(userId)

    const count = await Message.countDocuments({
        recipient: userId,
        read: false
    })

    console.log(count)

    return new Response(JSON.stringify({count: count}), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
};
