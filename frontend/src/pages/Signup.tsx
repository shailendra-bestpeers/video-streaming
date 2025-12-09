import React, { useState } from "react";
import { User, Mail, Lock, UserCircle, Image, AlertCircle, CheckCircle2 } from "lucide-react";
import API from "../axios/axios";
import { useAuth } from "../context/AuthContext";

const Signup: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
  });
const {setUser}=useAuth();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError("Please select a valid image file");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview("");
  };

  type Role = "creator"|"viewer";

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('password', form.password);
      formData.append('role', form.role);
      
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      
       const {data} = await API.post(
        "/auth/register",
        formData,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

        if(!!data)setUser(data.user)
      const role:Role = data.user.role
      setSuccess(true);
      setTimeout(() => {
        let location:string;
        if(role=="creator")location="/creator"
        else location="/"
        window.location.href = location;
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-purple-100 text-purple-700 border-purple-300";
      case "creator": return "bg-blue-100 text-blue-700 border-blue-300";
      default: return "bg-green-100 text-green-700 border-green-300";
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <UserCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Join us and start your journey today</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-gray-200">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-green-800 text-sm font-medium">
                Account created successfully! Redirecting...
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Your Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["viewer", "creator"].map((role) => (
                  <label
                    key={role}
                    className={`
                      relative flex flex-col items-center p-3 rounded-xl border-2 cursor-pointer transition-all
                      ${form.role === role 
                        ? "border-indigo-600 bg-indigo-50" 
                        : "border-gray-200 bg-white hover:border-gray-300"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={form.role === role}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className={`
                      px-2 py-1 rounded-lg text-xs font-semibold capitalize border
                      ${form.role === role ? getRoleColor(role) : "bg-gray-100 text-gray-600 border-gray-200"}
                    `}>
                      {role}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Avatar Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Profile Picture <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              
              {!avatarPreview ? (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all bg-gray-50"
                  >
                    <div className="text-center">
                      <Image className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 font-medium">
                        Click to upload avatar
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="relative inline-block">
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-indigo-500 shadow-lg">
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={removeAvatar}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                    type="button"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <p className="text-xs text-gray-600 mt-2">{avatarFile?.name}</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || success}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Account...
                </span>
              ) : success ? (
                "Account Created!"
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                Sign in here
              </a>
            </p>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By signing up, you agree to our{" "}
          <a href="/terms" className="text-indigo-600 hover:underline">Terms of Service</a>
          {" "}and{" "}
          <a href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;