import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<any>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await fetch(`http://localhost:5000/api/videos/${id}`);
      const data = await res.json();
      setVideo(data);
    };
    fetchVideo();
  }, [id]);

  if (!video) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-6 text-white bg-gray-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{video.title}</h1>

      <video
        src={video.videoUrl}
        className="w-full max-w-4xl rounded-lg shadow-lg"
        controls
        autoPlay
      />

      <p className="mt-4 text-gray-300">{video.description}</p>
      <p className="mt-2 text-sm text-gray-500">Genre: {video.genre}</p>
    </div>
  );
};

export default VideoPage;
