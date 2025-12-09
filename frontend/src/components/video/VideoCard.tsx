import React from "react";
import { Link } from "react-router-dom";

interface VideoCardProps {
  _id: string;          
  title: string;
  thumbnail: string;
  genre: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ _id, title, thumbnail, genre }) => {
  return (
    <Link to={`/video/${_id}`}>
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-[1.02] transition-transform cursor-pointer border border-gray-700">
        <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />

        <div className="p-3">
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <p className="text-gray-400 text-sm">{genre}</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
