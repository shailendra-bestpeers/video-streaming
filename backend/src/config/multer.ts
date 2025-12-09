import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js"; // Your configured cloudinary instance

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "videos-platform",
    allowed_formats: ["jpg", "jpeg", "png", "mp4", "mov", "webm"],
    resource_type: "auto",
  } as any,
});

export const upload = multer({ storage });
