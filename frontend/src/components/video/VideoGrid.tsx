import VideoCard from "./VideoCard";
import { useAuth } from "../../context/AuthContext";
import SkeletonBox from "../../skeletons/SkeletonBox";

const VideoGrid: React.FC = () => {
  const { videos, videoLoading } = useAuth();

  if (videoLoading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonBox key={i} height={220} radius={12} />
        ))}
      </div>
    );

  return (
    <div className="min-h-screen bg-black py-12 px-6">
      {/* Enhanced Header with gradient accent */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="relative">
          <h2 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            Trending Now
            <span 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#dc2626' }}
            />
          </h2>
          <p className="text-gray-400 text-lg">Fresh uploads from creators</p>
          
          {/* Decorative gradient line */}
          <div 
            className="h-1 w-24 rounded-full mt-4"
            style={{ background: 'linear-gradient(to right, #4f46e5, #9333ea)' }}
          />
        </div>
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, i) => (
          <VideoCard
            key={i}
            _id={video._id}
            title={video.title}
            thumbnail={video.thumbnail}
            genre={video.genre}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;