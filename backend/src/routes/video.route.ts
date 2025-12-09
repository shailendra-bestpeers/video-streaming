import { Router } from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import { uploadVideoFiles } from "../config/multerVideo.js";
import { getAllVideo, uploadVideoController } from "../controllers/video.controller.js";

const videoRoutes = Router();

// TEST ROUTE
videoRoutes.get("/feed",authMiddleware,getAllVideo)

// VIDEO UPLOAD ROUTE (Creator Only)
videoRoutes.post(
  "/upload",
  authMiddleware,
  uploadVideoFiles,
  uploadVideoController
);

export default videoRoutes;
