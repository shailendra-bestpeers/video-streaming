import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../axios/axios";
import { Upload, Loader2, Film, Image as ImageIcon } from "lucide-react";

const CreatorUploadPage = () => {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const [previewThumb, setPreviewThumb] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setThumbnail(file);
    if (file) setPreviewThumb(URL.createObjectURL(file));
  };

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideo(file);
    if (file) setPreviewVideo(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!title || !description || !genre || !thumbnail || !video) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("creatorId", user!.id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("genre", genre);
    formData.append("thumbnail", thumbnail);
    formData.append("video", video);

    try {
      await API.post("/videos/upload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMsg("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setGenre("");
      setThumbnail(null);
      setVideo(null);
      setPreviewThumb(null);
      setPreviewVideo(null);
    } catch (err: any) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900 p-6 text-white flex justify-center">
      <div className="bg-gray-850/80 backdrop-blur-lg p-8 w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-700/40">

        {/* HEADER */}
        <h1 className="text-3xl font-extrabold mb-6 flex items-center gap-3">
          <Upload className="w-6 h-6 text-indigo-400" />
          Upload Your Video
        </h1>

        {/* SUCCESS MESSAGE */}
        {successMsg && (
          <p className="mb-4 p-3 bg-green-600/20 border border-green-500 rounded-lg text-sm text-green-300">
            {successMsg}
          </p>
        )}

        {/* FORM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* TITLE */}
          <div className="col-span-2">
            <label className="text-sm text-gray-300">Title</label>
            <input
              className="w-full px-4 py-3 mt-1 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
            />
          </div>

          {/* THUMBNAIL */}
          <div>
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-indigo-300" />
              Thumbnail
            </label>

            <div className="mt-1 flex flex-col items-center justify-center border border-gray-700 rounded-lg p-3 bg-gray-800/40 cursor-pointer hover:bg-gray-800/60 transition">
              <input
                className="text-xs"
                type="file"
                accept="image/*"
                onChange={handleThumbnail}
              />
            </div>

            {previewThumb && (
              <img
                src={previewThumb}
                className="mt-3 w-full h-32 object-cover rounded-lg shadow-lg border border-gray-700"
              />
            )}
          </div>

          {/* VIDEO FILE */}
          <div>
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <Film className="w-4 h-4 text-indigo-300" />
              Video File
            </label>

            <div className="mt-1 flex flex-col items-center justify-center border border-gray-700 rounded-lg p-3 bg-gray-800/40 cursor-pointer hover:bg-gray-800/60 transition">
              <input
                className="text-xs"
                type="file"
                accept="video/*"
                onChange={handleVideo}
              />
            </div>

            {previewVideo && (
              <video
                src={previewVideo}
                controls
                className="mt-3 w-full h-32 rounded-lg shadow-lg border border-gray-700"
              />
            )}
          </div>

          {/* GENRE */}
          <div>
            <label className="text-sm text-gray-300">Genre</label>
            <input
              className="w-full px-4 py-3 mt-1 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Action, Drama…"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="col-span-2">
            <label className="text-sm text-gray-300">Description</label>
            <textarea
              className="w-full px-4 py-3 mt-1 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition"
              value={description}
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-6 w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800/40 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-700/20 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" /> Uploading…
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" /> Upload Video
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CreatorUploadPage;
