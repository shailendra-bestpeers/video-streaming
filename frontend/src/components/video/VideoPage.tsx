import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../axios/axios";

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<any>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const {data} = await API.get(`/videos/get-video/${id}`);
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
  className="w-full max-h-[500px] md:max-h-[400px] lg:max-h-[450px] rounded-lg shadow-lg object-cover"
  controls
  autoPlay
/>


      <p className="mt-4 text-gray-300">{video.description}</p>
      <p className="mt-2 text-sm text-gray-500">Genre: {video.genre}</p>
    </div>
  );
};

export default VideoPage;
