import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../axios/axios";
import { Upload, Loader2, Film, Image as ImageIcon } from "lucide-react";
import { buttonColor } from "../../color/color";

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900 p-6 text-white flex justify-center">
      <button
        onClick={() => navigate(-1)}
        style={{ background: buttonColor }}
        className="
          fixed 
          top-20           
          left-4           
          lg:left-72       
          z-50
          hover:bg-gray-700 
          text-white 
          px-4 py-2 
          rounded-lg 
          shadow-md 
          transition
        "
      >
        ⬅ Back
      </button>
      <div className="bg-gray-850/80 backdrop-blur-lg p-8 w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-700/40">
        {/* HEADER */}
        <h1 className="text-3xl font-extrabold mb-6 flex items-center gap-3">
          {isEdit ? (
            <>
              <Upload className="w-6 h-6 text-yellow-400" />
              Edit Your Video
            </>
          ) : (
            <>
              <Upload className="w-6 h-6 text-indigo-400" />
              Upload New Video
            </>
          )}
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
            <label className="text-sm text-gray-300">Title {isEdit ? "" : "*"}</label>
            <input
              className="w-full px-4 py-3 mt-1 bg-gray-800/70 border border-gray-700 rounded-xl"
              value={title}
              onChange={(e) => onChangeTitle(e.target.value)}
              placeholder="Enter video title"
            />
          </div>

          {/* THUMBNAIL */}
          <div>
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-indigo-300" />
              Thumbnail {isEdit ? " (optional)" : ""}
            </label>

            <input className="mt-2 text-xs" type="file" accept="image/*" onChange={handleThumbnail} />

            {previewThumb && (
              <img src={previewThumb} className="mt-3 w-full h-32 object-cover rounded-lg border border-gray-700" />
            )}
          </div>

          {/* VIDEO FILE */}
          <div>
            <label className="text-sm text-gray-300 flex items-center gap-2">
              <Film className="w-4 h-4 text-indigo-300" />
              Video File {isEdit ? " (optional)" : ""}
            </label>

            <input className="mt-2 text-xs" type="file" accept="video/*" onChange={handleVideo} />

            {previewVideo && (
              <video src={previewVideo} controls className="mt-3 w-full rounded-lg border border-gray-700" />
            )}
          </div>

          {/* GENRE */}
          <div>
            <label className="text-sm text-gray-300">Genre {isEdit ? "" : "*"}</label>
            <input
              className="w-full px-4 py-3 mt-1 bg-gray-800/70 border border-gray-700 rounded-xl"
              value={genre}
              onChange={(e) => onChangeGenre(e.target.value)}
              placeholder="Action, Drama…"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="col-span-2">
            <label className="text-sm text-gray-300">Description {isEdit ? "" : "*"}</label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 mt-1 bg-gray-800/70 border border-gray-700 rounded-xl"
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
          className="mt-6 w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
          {isEdit ? "Save Changes" : "Upload Video"}
        </button>
      </div>
    </div>
  );
};

export default CreatorVideoForm;
