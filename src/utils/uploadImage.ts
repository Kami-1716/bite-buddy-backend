import uploadToCloudinary from "./cloudinary";

export const uploadImage = async (filePath: Express.Multer.File) => {
  const image = filePath;
  const base64Image = Buffer.from(image?.buffer).toString("base64");
  const dataUri = `data:${image?.mimetype};base64,${base64Image}`;
  const uploadImageResponse = await uploadToCloudinary(dataUri);
  return uploadImageResponse.url;
};
