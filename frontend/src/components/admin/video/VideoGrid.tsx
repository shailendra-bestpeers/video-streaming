import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import API from "../../../axios/axios";

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

const AdminVideoGrid: React.FC = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const res = await API.get("/videos/feed");

      setVideos(res.data.video);   // API format must be { video: [...] }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching videos", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

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
          <p className="text-gray-400">Fresh uploads from creators</p>
        </div>

      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video,i) => (
          <VideoCard
            key={i}
            _id={video._id} // ✅ ADD THIS
            title={video.title}
            thumbnail={video.thumbnail}
            genre={video.genre}
            onDelete={fetchVideos} 
          />
        ))}
      </div>
    </div>
  );
};

export default AdminVideoGrid;
