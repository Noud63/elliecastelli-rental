import connectDB from "@/config/database";
import Property from "@/models/Property";

// Get /api/properties/featured
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({is_featured: true})

    return new Response(JSON.stringify(properties), { status: 200 }); // result is now an object!

  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
