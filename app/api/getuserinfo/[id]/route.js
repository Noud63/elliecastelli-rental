import User from "@/models/User";
import connectDB from "@/config/database";

export const GET = async(request, {params}) => {
    try {
        await connectDB()
          const id = params.id;
        const user = await User.findById({_id:id})

        if(!user){
            return null
        }

        const userInfo ={
            email:user.email,
            name:user.name,
            userName:user.username,
        }

        return new Response(JSON.stringify(userInfo), { status: 200 });

    } catch (error) {
        console.log(error)
        return new Response("Something went wrong!", { status: 500 });
    }

}