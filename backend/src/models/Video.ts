import mongoose, { Schema, Document } from "mongoose";

export interface IVideo extends Document {
  title: string;
  description: string;
  genre: string;
  thumbnail: string;
  videoUrl: string;
  creatorId: mongoose.Types.ObjectId;
}

const videoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },

    thumbnail: { type: String, required: true },
    videoUrl: { type: String, required: true },

    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Video = mongoose.model<IVideo>("Video", videoSchema);
