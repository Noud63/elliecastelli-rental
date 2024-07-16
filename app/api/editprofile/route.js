import Register from "@/models/Register";
import connectDB from "@/config/database";


export const POST = async (request) => {
         
    try {
        await connectDB()

        const { username, email } = await request.json()
        console.log(username, email)
        const res = await Register.findOneAndUpdate({email}, {username})

        if(res){
        return new Response(JSON.stringify(res), { status: 200 }); 
        }
        
    } catch (error) {
     console.log(error)
     return new Response(JSON.stringify({message:"Failed to update!"}), { status: 404 }); 
    }
}