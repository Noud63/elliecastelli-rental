import User from "@/models/User";
import connectDB from "@/config/database";
import cloudinary from "@/config/cloudinary";

import { getSessionUser } from "@/utils/getSessionUser";

export const POST = async (request) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user.id) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;
    const formData = await request.formData();

    const images = formData.getAll("avatar").filter((pic) => pic.name !== ""); //prevent error cloudinary 38 6:12

    //Create property data object for database, avatar added later
    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      username: formData.get("userName"),
    };

    //Upload images to cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      //Convert the image data to base64
      const imageBase64 = imageData.toString("base64");

      //Make request to upload to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: "propertypulse" }
      );

      imageUploadPromises.push(result.secure_url);

      //Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);

      //Add uploaded images to the propertyData object
      userData.avatar = uploadedImages;
    }

    const newProfile = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          name: userData.name,
          email: userData.email,
          username: userData.username,
          avatar: userData.avatar,
        },
      }
    );

    console.log(newProfile);

    return Response.redirect(`${process.env.NEXTAUTH_URL}/profile`);
    // return new Response(JSON.stringify(newProfile), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
};
