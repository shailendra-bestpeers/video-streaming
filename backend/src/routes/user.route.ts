import { Router } from "express";
import { upload } from "../config/multer.js";
import { deleteUser, getAllUsers, updateUser } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorizeMiddleware.js";
const userRoutes = Router();

userRoutes.get("/all",authMiddleware,authorize("admin"), getAllUsers);
userRoutes.put("/update/:id",authMiddleware,authorize("admin"),upload.single("avatar"),updateUser);
userRoutes.delete("/delete/:id",authMiddleware,authorize("admin"),deleteUser);

export default userRoutes;
