import { getProfile, login, register } from '../controllers/auth.controller.js';
import express from "express";
import authMiddleware from '../middlewares/authMiddleware.js';

const authRouter = express.Router();
// Public routes
authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/profile", authMiddleware, getProfile);
export default authRouter;
