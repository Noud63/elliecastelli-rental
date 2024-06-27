import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic"

//Get /api/bookmarks
export const GET = async() => {
      try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
          return new Response("User ID is required!", { status: 401 });
        }

        const { userId } = sessionUser;

        //Find user in database
        const user = await User.findById({ _id: userId });

        // Get user bookmarks
        const bookmarks = await Property.find({_id: {$in: user.bookmarks}})
        console.log(bookmarks)

        return new Response(JSON.stringify(bookmarks), {status: 200})

      } catch (error) {
         console.log(error)
         return new Response("Something went wrong", { status: 500 });
      }
} 


export const POST = async(request)=> {   // request = body data
    try {
        await connectDB()

        const { propertyId } = await request.json()

        const sessionUser = await getSessionUser()

        if(!sessionUser || !sessionUser.userId){
            return new Response("User ID is required!", {status:401})
        }

        const { userId } = sessionUser

        //Find user in database
        const user = await User.findById({_id: userId})

        //Check if user property is bookmarked
        let isBookmarked = user.bookmarks.includes(propertyId)

        let message;

        if(isBookmarked){
            //if already bookmarked, remove it
            user.bookmarks.pull(propertyId)
            message = "Bookmark removed successfully!"
            isBookmarked = false
        }else if(!isBookmarked){
            //if not bookmarked
            user.bookmarks.push(propertyId)
            message = "Bookmark added successfully!";
            isBookmarked = true;
         }

         await user.save()

         return new Response(JSON.stringify({message, isBookmarked}), {status:200})
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong!", {status:500})
    }
}