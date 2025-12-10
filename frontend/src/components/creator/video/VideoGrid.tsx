import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import API from "../../../axios/axios";
import VideoCard from "./VideoCard";

interface VideoType {
  _id: string;
  title: string;
  description: string;
  genre: string;
  thumbnail: string;
  videoUrl: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

const CreatorVideoGrid: React.FC = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?._id) return;

    let isMounted = true;

    const fetchVideos = async () => {
      try {
        const res = await API.get(`/videos/user/${user._id}`);

        if (isMounted) {
          setVideos(res.data || []); // Safe fallback
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching videos", err);
        if (isMounted) setLoading(false);
      }
    };

    fetchVideos();

    return () => {
      isMounted = false;
    };
  }, [user]);

  if (loading)
    return (
      <div className="text-white text-center text-xl py-20">
        Loading videos...
      </div>
    );

  return (
    <div className="min-h-screen bg-black py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-3xl font-bold text-white">Your Videos</h2>
          <p className="text-gray-400 text-sm mt-1 sm:mt-0">
            Manage videos uploaded by you
          </p>
        </div>
      </div>

      {/* FULLY RESPONSIVE GRID */}
      <div
        className="
          max-w-7xl mx-auto 
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          xl:grid-cols-4 
          2xl:grid-cols-5 
          gap-6
        "
      >
        {videos.length > 0 ? (
          videos.map((video) => (
            <VideoCard
              key={video._id}
              _id={video._id}
              title={video.title}
              thumbnail={video.thumbnail}
              genre={video.genre}
            />
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center py-20 text-lg">
            No videos uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default CreatorVideoGrid;
