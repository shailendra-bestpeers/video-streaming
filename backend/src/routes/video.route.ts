import { Router } from "express";
const videoRoutes = Router();
videoRoutes.get("/", () => {
    "res.send('auth videoroutes')";
});
export default videoRoutes;
