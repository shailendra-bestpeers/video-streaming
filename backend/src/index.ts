
import dotenv from "dotenv";
dotenv.config();
import express from "express";

import cookieParser from "cookie-parser";

import cors from "./config/cors.js";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import videoRoutes from "./routes/video.route.js";


const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors);

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.use("/api/auth", authRouter);
app.use("/api/videos", videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running http://localhost:${PORT}`));
