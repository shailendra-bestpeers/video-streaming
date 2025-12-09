import { Request, Response } from "express";
import { Video } from "../models/Video.js";

type MulterFiles =
  | Express.Multer.File[]
  | { [fieldname: string]: Express.Multer.File[] };

interface UploadRequest extends Request {
  files?: MulterFiles;
}

export const uploadVideoController = async (
  req: UploadRequest,
  res: Response
) => {
  try {
    const { title, description, genre, creatorId } = req.body;

    if (!req.files) {
      return res.status(400).json({ message: "Files missing!" });
    }

    const filesObj =
      Array.isArray(req.files) || typeof req.files === "object" ? req.files : undefined;

    const getField = (name: string): Express.Multer.File[] | undefined => {
      if (Array.isArray(req.files)) return undefined;
      return (req.files as { [key: string]: Express.Multer.File[] })[name];
    };

    const thumbnailArr = getField("thumbnail");
    const videoArr = getField("video");

    if (
      !thumbnailArr ||
      thumbnailArr.length === 0 ||
      !videoArr ||
      videoArr.length === 0
    ) {
      return res.status(400).json({ message: "Thumbnail or video file missing!" });
    }

    const thumbnailPath = (thumbnailArr[0] as any).path as string | undefined;
    const videoPath = (videoArr[0] as any).path as string | undefined;

    if (!thumbnailPath || !videoPath) {
      return res
        .status(500)
        .json({ message: "Upload succeeded but file path missing from provider." });
    }

    const newVideo = await Video.create({
      title,
      description,
      genre,
      thumbnail: thumbnailPath,
      videoUrl: videoPath,
      creatorId,
    });

    return res.status(201).json({
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (error) {
    console.error("Video Upload Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getAllVideo = async (
  req: UploadRequest,
  res: Response
) => {
 const allvideo = await Video.find()
    return res.status(200).json({
      message: "getting all video",
      video: allvideo,
    });
}
