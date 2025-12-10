import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../axios/axios";
import {buttonColor} from "../../../color/color"

const CreatorVideoPage = () => {
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

  if (!video) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-6 text-white bg-gray-950 min-h-screen relative">
      
      <button
        onClick={() => navigate(-1)}
        style={{background:buttonColor}}
        className="absolute top-6 left-6  hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md transition"
      >
       Back
      </button>

      <h1 className="text-3xl font-bold mb-4 mt-12">{video.title}</h1>

      <video
        src={video.videoUrl}
        className="w-full max-h-[500px] md:max-h-[400px] lg:max-h-[450px] rounded-lg shadow-lg object-cover"
        controls
        autoPlay
      />

      <p className="mt-4 text-gray-300">{video.description}</p>
      <p className="mt-2 text-sm text-gray-500">Genre: {video.genre}</p>
    </div>
  );
};

export default CreatorVideoPage;
