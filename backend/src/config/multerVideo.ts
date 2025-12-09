import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    if (file.fieldname === "thumbnail") {
      return {
        folder: "videos-platform/thumbnails",
        resource_type: "image",
      };
    }
    if (file.fieldname === "video") {
      return {
        folder: "videos-platform/videos",
        resource_type: "video",
      };
    }
    throw new Error("Invalid field");
  },
});

export const uploadVideoFiles = multer({ storage }).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);
