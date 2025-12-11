import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../axios/axios";
import { Upload, Loader2, Film, Image as ImageIcon } from "lucide-react";

const CreatorVideoForm = () => {
  const { id } = useParams(); // <-- If id exists => Edit mode
  const isEdit = Boolean(id);

  const { user } = useAuth();
  const userId = user?._id as string;

  // ---------------- STATE ----------------
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const [previewThumb, setPreviewThumb] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  // Track whether user changed any field (used in edit mode)
  const [changed, setChanged] = useState(false);

  // ---------------- LOAD EXISTING VIDEO WHEN EDITING ----------------
  useEffect(() => {
    const fetchVideo = async () => {
      if (!user) return;
      if (!isEdit) return;

      try {
        const { data } = await API.get(`/videos/get-video/${id}`);
        const video = data.video;

        setTitle(video.title || "");
        setDescription(video.description || "");
        setGenre(video.genre || "");

        setPreviewThumb(video.thumbnail || null);
        setPreviewVideo(video.videoUrl || null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVideo();
    // reset changed flag when id or mode changes
    setChanged(false);
  }, [id, isEdit, user]);

  // ---------------- FILE HANDLERS ----------------
  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setThumbnail(file);
    if (file) setPreviewThumb(URL.createObjectURL(file));
    setChanged(true);
  };

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideo(file);
    if (file) setPreviewVideo(URL.createObjectURL(file));
    setChanged(true);
  };

  // mark changed when text inputs change
  const onChangeTitle = (v: string) => {
    setTitle(v);
    setChanged(true);
  };
  const onChangeDescription = (v: string) => {
    setDescription(v);
    setChanged(true);
  };
  const onChangeGenre = (v: string) => {
    setGenre(v);
    setChanged(true);
  };

  // ---------------- SUBMIT HANDLER ----------------
  const handleSubmit = async () => {
    // CREATE MODE: all fields mandatory
    if (!isEdit) {
      if (!title || !description || !genre || !thumbnail || !video) {
        alert("Please fill all fields and attach thumbnail & video to create.");
        return;
      }
    }

    // EDIT MODE: at least one field must be changed (prevent accidental empty submit)
    if (isEdit && !changed) {
      alert("Make at least one change before saving.");
      return;
    }

    const formData = new FormData();

    // Append only fields that have values (important for partial update)
    if (title) formData.append("title", title);
    if (description) formData.append("description", description);
    if (genre) formData.append("genre", genre);

    if (!isEdit) {
      // For create only
      formData.append("creatorId", userId);
    }

    if (thumbnail) formData.append("thumbnail", thumbnail);
    if (video) formData.append("video", video);

    try {
      setLoading(true);

      if (isEdit) {
        // UPDATE VIDEO (partial allowed)
        await API.put(`/videos/update/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMsg("Video updated successfully!");
      } else {
        // CREATE VIDEO (all required validated earlier)
        await API.post(`/videos/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSuccessMsg("Video uploaded successfully!");

        // Reset only for create mode
        setTitle("");
        setDescription("");
        setGenre("");
        setThumbnail(null);
        setVideo(null);
        setPreviewThumb(null);
        setPreviewVideo(null);
        setChanged(false);
      }

      // Optional: navigate back or to video page after a short delay
      setTimeout(() => {
        navigate(-1);
      }, 900);
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen p-6 text-white flex justify-center">
      {/* <button
        onClick={() => navigate(-1)}
        style={{ background: buttonColor }}
        className="
          fixed 
          top-20           
          left-4           
          lg:left-72       
          z-50
          hover:scale-105
          hover:shadow-2xl
          text-white 
          px-6 py-3
          rounded-xl
          shadow-lg 
          transition-all
          duration-300
          font-medium
          flex
          items-center
          gap-2
        "
      >
        <span className="text-lg">←</span> Back
      </button> */}
      
      <div className="bg-zinc-900 backdrop-blur-lg p-8 w-full max-w-3xl rounded-2xl shadow-2xl border border-zinc-800">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-3 flex items-center gap-3">
            {isEdit ? (
              <>
                <div 
                  className="p-2 rounded-xl"
                  style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
                >
                  <Upload className="w-7 h-7 text-white" />
                </div>
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Edit Your Video
                </span>
              </>
            ) : (
              <>
                <div 
                  className="p-2 rounded-xl"
                  style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
                >
                  <Upload className="w-7 h-7 text-white" />
                </div>
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Upload New Video
                </span>
              </>
            )}
          </h1>
          <div 
            className="h-1 w-24 rounded-full"
            style={{ background: 'linear-gradient(to right, #4f46e5, #9333ea)' }}
          />
        </div>

        {/* SUCCESS MESSAGE */}
        {successMsg && (
          <div className="mb-6 p-4 bg-green-600/10 border-l-4 rounded-lg text-sm text-green-400 border-green-500">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ background: '#10b981' }}
              />
              {successMsg}
            </div>
          </div>
        )}

        {/* FORM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* TITLE */}
          <div className="col-span-2">
            <label className="text-sm font-semibold text-gray-300 mb-2 block">
              Title {isEdit ? "" : <span style={{ color: '#dc2626' }}>*</span>}
            </label>
            <input
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              value={title}
              onChange={(e) => onChangeTitle(e.target.value)}
              placeholder="Enter video title"
            />
          </div>

          {/* THUMBNAIL */}
          <div>
            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2 mb-2">
              <ImageIcon className="w-4 h-4 text-purple-400" />
              Thumbnail {isEdit ? " (optional)" : <span style={{ color: '#dc2626' }}>*</span>}
            </label>

            <input 
              className="mt-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:text-white hover:file:scale-105 file:transition-transform file:cursor-pointer" 
              style={{ 
                background: 'transparent',
              }}
              type="file" 
              accept="image/*" 
              onChange={handleThumbnail} 
            />

            {previewThumb && (
              <div className="mt-4 relative group">
                <div 
                  className="absolute -inset-1 rounded-xl opacity-50 blur-sm group-hover:opacity-75 transition-opacity"
                  style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
                />
                <img 
                  src={previewThumb} 
                  className="relative w-full h-32 object-cover rounded-xl border border-zinc-700" 
                />
              </div>
            )}
          </div>

          {/* VIDEO FILE */}
          <div>
            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2 mb-2">
              <Film className="w-4 h-4 text-purple-400" />
              Video File {isEdit ? " (optional)" : <span style={{ color: '#dc2626' }}>*</span>}
            </label>

            <input 
              className="mt-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:text-white hover:file:scale-105 file:transition-transform file:cursor-pointer" 
              style={{ 
                background: 'transparent',
              }}
              type="file" 
              accept="video/*" 
              onChange={handleVideo} 
            />

            {previewVideo && (
              <div className="mt-4 relative group">
                <div 
                  className="absolute -inset-1 rounded-xl opacity-50 blur-sm group-hover:opacity-75 transition-opacity"
                  style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
                />
                <video 
                  src={previewVideo} 
                  controls 
                  className="relative w-full rounded-xl border border-zinc-700" 
                />
              </div>
            )}
          </div>

          {/* GENRE */}
          <div>
            <label className="text-sm font-semibold text-gray-300 mb-2 block">
              Genre {isEdit ? "" : <span style={{ color: '#dc2626' }}>*</span>}
            </label>
            <input
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              value={genre}
              onChange={(e) => onChangeGenre(e.target.value)}
              placeholder="Action, Drama…"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="col-span-2">
            <label className="text-sm font-semibold text-gray-300 mb-2 block">
              Description {isEdit ? "" : <span style={{ color: '#dc2626' }}>*</span>}
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
              value={description}
              onChange={(e) => onChangeDescription(e.target.value)}
              placeholder="Write a short description"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-8 w-full py-4 rounded-xl flex items-center justify-center gap-3 text-white font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="w-6 h-6" />
              {isEdit ? "Save Changes" : "Upload Video"}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CreatorVideoForm;