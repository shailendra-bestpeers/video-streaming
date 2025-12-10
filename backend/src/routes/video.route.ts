import { Router } from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import { uploadVideoFiles } from "../config/multerVideo.js";
import { getAllVideo, getVideoById, getVideoByUserId, updateVideo, uploadVideoController } from "../controllers/video.controller.js";
import { createVideoSchema } from "../schemas/video.validation.js";
import { validate } from "../middlewares/validate.js";

const videoRoutes = Router();

// TEST ROUTE
videoRoutes.get("/feed",getAllVideo)

videoRoutes.get("/get-video/:id", getVideoById);

videoRoutes.put(
  "/update/:id",
  uploadVideoFiles,
  updateVideo
);

videoRoutes.get("/user/:userId", authMiddleware, getVideoByUserId);


// VIDEO UPLOAD ROUTE (Creator Only)
videoRoutes.post(
  "/upload",
  authMiddleware,
  uploadVideoFiles,
  validate(createVideoSchema),
  uploadVideoController
);

export default videoRoutes;
