import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, folder) => {
  try {
    if (!localFilePath) return null;
    const filename = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const publicId = folder ? `${folder}/${filename}` : filename;

    const response = await cloudinary.uploader.upload(localFilePath, {
      public_id: publicId,
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    // console.log("File uploaded over Cloudinary: ", response.url);
    console.log(response);
    return response;
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      // Check if file still exists before trying to delete
      fs.unlinkSync(localFilePath);
    }
    console.log("Catch u-block of Cloudinary: ", error);
    return null;
  }
};

const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return null;
    const publicId = imageUrl.split("/").pop().split(".")[0];

    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    console.log("File deleted from Cloudinary ");
    console.log(response);

    return response;
  } catch (error) {
    console.log("Catch d-block of Cloudinary: ", error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };

// cloudinary.v2.uploader
//   .upload("dog.mp4", {
//     resource_type: "video",
//     public_id: "my_dog",
//     overwrite: true,
//     notification_url: "https://mysite.example.com/notify_endpoint",
//   })
//   .then((result) => console.log(result));
