import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async () => {
    return {
      folder: "your_folder_name",
      resource_type: "auto",
      allowed_formats: ["jpg", "png", "jpeg", "pdf"],
    };
  },
});

const upload = multer({ storage: storage });

export default upload;
