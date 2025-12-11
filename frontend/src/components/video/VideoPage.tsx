import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../axios/axios";
import { buttonColor } from "../../color/color";

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState<any>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const { data } = await API.get(`/videos/get-video/${id}`);
      setVideo(data);
    };
    fetchVideo();
  }, [id]);

  if (!video) 
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div 
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: '#9333ea', borderTopColor: 'transparent' }}
          />
          <p className="text-white text-lg">Loading video...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-6 py-8">
        
        {/* Back Button */}
        <button
          style={{ background: buttonColor }}
          onClick={() => navigate(-1)}
          className="mb-6 px-6 py-3 text-white font-medium rounded-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
        >
          <span className="text-lg">←</span> Back
        </button>

        {/* Video Container with gradient border */}
        <div className="relative mb-6">
          <div 
            className="absolute -inset-1 rounded-2xl opacity-75 blur-sm"
            style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
          />
          <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
            <video
              src={video.videoUrl}
              className="w-full max-h-[500px] md:max-h-[400px] lg:max-h-[450px] object-cover"
              controls
              autoPlay
            />
          </div>
        </div>

        {/* Video Info Card */}
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 shadow-xl">
          {/* Title with red accent */}
          <div className="flex items-start gap-3 mb-4">
            <div 
              className="w-1 h-8 rounded-full flex-shrink-0 mt-1"
              style={{ background: '#dc2626' }}
            />
            <h1 className="text-3xl font-bold text-white leading-tight">
              {video.title}
            </h1>
          </div>

          {/* Genre Badge */}
          <div className="mb-4">
            <span 
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg"
              style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
            >
              {video.genre}
            </span>
          </div>

          {/* Description */}
          <div className="border-t border-zinc-800 pt-4">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Description</h3>
            <p className="text-gray-400 leading-relaxed">
              {video.description || "No description available."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VideoPage;