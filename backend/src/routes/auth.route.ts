import { getProfile, login, logout, register } from '../controllers/auth.controller.js';
import express from "express";
import authMiddleware from '../middlewares/authMiddleware.js';
import { upload } from '../config/multer.js';

const authRouter = express.Router();
// Public routes
authRouter.post("/register", upload.single("avatar"), register);

authRouter.post("/login", login);
authRouter.get("/logout", authMiddleware, logout);
authRouter.get("/profile", authMiddleware, getProfile);
export default authRouter;
