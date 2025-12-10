import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

interface VideoCardProps {
  _id: string;
  title: string;
  thumbnail: string;
  genre: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  _id,
  title,
  thumbnail,
  genre,
}) => {
  const navigate = useNavigate();

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/creator-dashboard/video/edit/${_id}`);
  };

  return (
    <Link to={`/creator-dashboard/video/${_id}`} className="block group">
      <div
        className="
          relative bg-gray-900 rounded-xl overflow-hidden 
          shadow-lg border border-gray-700 
          transition-transform duration-200 
          group-hover:scale-[1.02] 
          cursor-pointer
        "
      >
        {/* EDIT BUTTON */}
        <button
          onClick={handleEdit}
          className="
            absolute top-2 right-2 
            bg-white/90 text-gray-800 
            hover:bg-indigo-600 hover:text-white 
            p-2 rounded-md shadow-md 
            transition 
            z-10 
            sm:p-2 
            p-1.5
          "
        >
          <Pencil className="w-4 h-4 sm:w-4 sm:h-4" />
        </button>

        {/* VIDEO THUMBNAIL */}
        <img
          src={thumbnail}
          alt={title}
          className="
            w-full 
            h-40 sm:h-48 md:h-52 
            object-cover 
            rounded-t-xl
          "
        />

        {/* CONTENT */}
        <div className="p-3 sm:p-4">
          <h3 className="text-white font-semibold text-base sm:text-lg truncate">
            {title}
          </h3>

          <p className="text-gray-400 text-xs sm:text-sm mt-1 truncate">
            {genre}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
