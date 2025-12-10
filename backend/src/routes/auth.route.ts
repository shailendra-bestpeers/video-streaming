import express from "express";
import { register, login, logout, getProfile } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { userLoginSchema, userRegisterSchema } from "../schemas/user.validation.js";
import { upload } from "../config/multer.js";

const authRouter = express.Router();

// ---------------- Public Routes ---------------- //

authRouter.post(
  "/register",
  upload.single("avatar"),
  validate(userRegisterSchema),      
  register
);

authRouter.post(
  "/login",
  validate(userLoginSchema),
  login
);

// ---------------- Private Routes ---------------- //

authRouter.get("/logout", authMiddleware, logout);
authRouter.get("/profile", authMiddleware, getProfile);

export default authRouter;
