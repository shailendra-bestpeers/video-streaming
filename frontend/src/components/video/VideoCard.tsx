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
      <div className="group relative bg-zinc-900 rounded-xl overflow-hidden shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-zinc-800 hover:border-transparent">
        {/* Gradient border on hover */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ 
            background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)',
            padding: '2px',
            margin: '-2px'
          }}
        />
        
        {/* Thumbnail with overlay gradient */}
        <div className="relative overflow-hidden">
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
          />
        </div>

        {/* Content */}
        <div className="relative p-4 bg-zinc-900">
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
            {title}
          </h3>
          
          {/* Genre badge with gradient */}
          <div className="flex items-center gap-2">
            <span 
              className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg"
              style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
            >
              {genre}
            </span>
            
            {/* Red accent dot */}
            <span 
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#dc2626' }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;