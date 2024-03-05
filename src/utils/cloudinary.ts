import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (file: string) => {
  try {
    const result = await cloudinary.uploader.upload(file);
    return result;
  } catch (error) {
    throw new Error("Cloudinary upload failed");
  }
};

export default uploadToCloudinary;
