import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import API from "../../../axios/axios";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

interface VideoCardProps {
  _id: string;
  title: string;
  thumbnail: string;
  genre: string;
  onDelete?: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  _id,
  title,
  thumbnail,
  genre,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/creator-dashboard/video/edit/${_id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this video?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await API.delete(`/videos/delete/${_id}`);

              toast.success("Video deleted successfully!", {
                position: "top-right",
              });

              if (onDelete) onDelete(); // Refresh parent
            } catch (error) {
              console.error("Delete error:", error);
              toast.error("Failed to delete video.", {
                position: "top-right",
              });
            }
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Delete cancelled", { position: "top-right" }),
        },
      ],
    });
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
        {/* ACTION BUTTONS */}
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          {/* EDIT BUTTON */}
          <button
            onClick={handleEdit}
            className="
              bg-white/90 text-gray-800 
              hover:bg-indigo-600 hover:text-white 
              p-2 rounded-md shadow-md 
              transition
            "
          >
            <Pencil className="w-4 h-4" />
          </button>

          {/* DELETE BUTTON */}
          <button
            onClick={handleDelete}
            className="
              bg-white/90 text-red-700 
              hover:bg-red-600 hover:text-white 
              p-2 rounded-md shadow-md 
              transition
            "
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* THUMBNAIL */}
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
