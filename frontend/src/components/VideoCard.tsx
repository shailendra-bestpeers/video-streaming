import React, { useEffect, useState } from "react";
import API from "../axios/axios";
import VideoCard from "./VideoCard";
import { useAuth } from "../context/AuthContext";

interface VideoType {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  rating: number;
  views: string;
  description: string;
  genre: string;
  year: number;
}

const VideoCardGrid: React.FC = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    let isMounted = true; // 🛡️ Prevent state update after unmount

    const fetchVideos = async () => {
      try {
        const res = await API.get("/videos/feed");
        if (isMounted) {
          setVideos(res.data.video);
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
  }, []); // 👈 EMPTY deps → runs ONLY once

  if (loading)
    return (
      <div className="text-white text-center text-2xl py-20">
        Loading videos...
      </div>
    );

  return (
    <div className="min-h-screen bg-black py-12 px-6">
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Trending Now</h2>
          <p className="text-gray-400">Most watched videos this week</p>
        </div>

        <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all">
          {isLoggedIn ? "Simulate Logout" : "Simulate Login"}
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
};

export default VideoCardGrid;
