import { Router } from "express";
const userRoutes = Router();
userRoutes.get("/", () => {
    "res.send('auth userRoutes')";
});
export default userRoutes;
