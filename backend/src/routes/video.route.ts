import { Router } from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import { uploadVideoFiles } from "../config/multerVideo.js";
import { deleteVideo, getAllVideo, getVideoById, getVideoByUserId, updateVideo, uploadVideoController } from "../controllers/video.controller.js";
import { createVideoSchema } from "../schemas/video.validation.js";
import { validate } from "../middlewares/validate.js";
import { authorize } from "../middlewares/authorizeMiddleware.js";

const videoRoutes = Router();

// TEST ROUTE
videoRoutes.get("/feed",getAllVideo)

videoRoutes.get("/get-video/:id",authMiddleware,authorize("admin","creator"),getVideoById);

videoRoutes.delete("/delete/:id",authMiddleware,authorize("admin","creator"), deleteVideo);

videoRoutes.put(
  "/update/:id",
  uploadVideoFiles,
  updateVideo
);

videoRoutes.get("/user/:userId", authMiddleware,authorize("admin","creator"), getVideoByUserId);


// VIDEO UPLOAD ROUTE (Creator Only)
videoRoutes.post(
  "/upload",
  authMiddleware,
  authorize("admin","creator"),
  uploadVideoFiles,
  validate(createVideoSchema),
  uploadVideoController
);

export default videoRoutes;
