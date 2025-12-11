import { useState } from "react";
import API from "../../../axios/axios";
import { User as UserIcon, Mail, Lock, Shield, Upload } from "lucide-react";

interface FormProps {
  user: any;
  onClose: () => void;
  onSaved: () => void;
}

const UserForm = ({ user, onClose, onSaved }: FormProps) => {
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "viewer",
    password: "",
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(
    user?.avatar || "" // show old avatar
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Avatar selection
  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file)); // image preview
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("role", form.role);

    if (!user) {
      // only on create
      formData.append("password", form.password);
    }

    if (avatar) {
      formData.append("avatar", avatar);
    }

    if (user) {
      await API.put(`/users/update/${user._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await API.post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form
        onSubmit={submitForm}
        className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md shadow-2xl border border-zinc-800 relative"
      >
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="p-2 rounded-xl"
              style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
            >
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {user ? "Update User" : "Add New User"}
            </h2>
          </div>
          <div 
            className="h-1 w-20 rounded-full"
            style={{ background: 'linear-gradient(to right, #4f46e5, #9333ea)' }}
          />
        </div>

        {/* Avatar Upload */}
        <div className="mb-6">
          <label className="block mb-3 text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Upload className="w-4 h-4 text-purple-400" />
            Avatar
          </label>

          {preview && (
            <div className="mb-4 flex justify-center">
              <div className="relative group">
                <div 
                  className="absolute -inset-1 rounded-full opacity-75 blur-sm group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
                />
                <img
                  src={preview}
                  alt="avatar preview"
                  className="relative w-24 h-24 rounded-full object-cover border-2 border-zinc-700"
                />
              </div>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleAvatar}
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:text-white hover:file:scale-105 file:transition-transform file:cursor-pointer"
            style={{ background: 'transparent' }}
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-gray-300 flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-purple-400" />
            Name <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter full name"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Mail className="w-4 h-4 text-purple-400" />
            Email <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            placeholder="user@example.com"
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-400" />
            Role <span style={{ color: '#dc2626' }}>*</span>
          </label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all cursor-pointer"
          >
            <option value="admin">Admin</option>
            <option value="creator">Creator</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        {/* Password (only for new user) */}
        {!user && (
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-300 flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-400" />
              Password <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              type="password"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter secure password"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-gray-300 hover:bg-zinc-700 hover:text-white transition-all font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
          >
            {user ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;