import { z } from "zod";

// MongoDB ObjectId validator
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const objectId = z.string().refine((val) => objectIdRegex.test(val), {
  message: "Invalid creatorId (must be a valid MongoDB ObjectId)",
});

export const createVideoSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  genre: z.string().min(1, "Genre is required"),
  thumbnail: z.string().optional(), 
  videoUrl: z.string().optional(),  
  creatorId: objectId,
});

export type CreateVideoInput = z.infer<typeof createVideoSchema>;

export const updateVideoSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  genre: z.string().min(1).optional(),

  thumbnail: z.string().optional(),
  videoUrl: z.string().optional(),

  creatorId: objectId.optional(),
});

export type UpdateVideoInput = z.infer<typeof updateVideoSchema>;
