import { Request, Response } from "express";
import { Video } from "../models/Video.js";
import mongoose from "mongoose";

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


export const getVideoById = async (req:Request, res:Response) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getVideoByUserId = async (req:Request, res:Response) => {
  console.log(req.params.userId)
  try {
    const video = await Video.find({creatorId:req.params.userId});
    console.log(video)

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const updateVideo = async (req: UploadRequest, res: Response) => {
  try {
    const videoId = req.params.id;
    const { title, description, genre } = req.body;

    const existingVideo = await Video.findById(videoId);
    if (!existingVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    const getField = (name: string): Express.Multer.File[] | undefined => {
      if (!req.files || Array.isArray(req.files)) return undefined;
      return (req.files as { [key: string]: Express.Multer.File[] })[name];
    };

    const thumbnailArr = getField("thumbnail");
    const videoArr = getField("video");

    const newThumbnail = thumbnailArr?.[0]?.path;
    const newVideo = videoArr?.[0]?.path;

    if (title) existingVideo.title = title;
    if (description) existingVideo.description = description;
    if (genre) existingVideo.genre = genre;

    if (newThumbnail) existingVideo.thumbnail = newThumbnail;
    if (newVideo) existingVideo.videoUrl = newVideo;

    await existingVideo.save();

    return res.json({
      message: "Video updated successfully!",
      video: existingVideo,
    });

  } catch (error) {
    console.error("Update Video Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteVideo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Check for valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Delete video from DB
    await Video.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Video deleted successfully",
      videoId: id,
    });
  } catch (error) {
    console.error("Delete Video Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


