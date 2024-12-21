import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import axios from "axios";

interface CloudinaryResponse {
  secure_url: string;
  [key: string]: any; // To handle other possible response fields
}

/**
 * Uploads an image to Cloudinary and returns the URL.
 *
 * @param file - The image file to upload.
 * @param folder - (Optional) Folder name to store the image in Cloudinary.
 * @returns The URL of the uploaded image.
 */
const uploadToCloudinary = async (
  file: File,
  folder: string = "default"
): Promise<string> => {
  try {
    const formData = new FormData();

    // Add the file and Cloudinary configuration parameters to the form data
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    ); // Add ! to assert it's defined
    formData.append("folder", folder);

    // Make the POST request to Cloudinary
    const response = await axios.post<CloudinaryResponse>(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    return response.data.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
};

export default uploadToCloudinary;
