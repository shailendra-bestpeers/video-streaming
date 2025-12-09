import React, { useState } from "react";
import {
  Mail,
  Lock,
  LogIn,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import API from "../axios/axios";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const {setUser} =useAuth()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };
type Role = "creator"|"viewer";
  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const {data} = await API.post("/auth/login", form, {
        withCredentials: true,
      });
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
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 px-4 py-8">
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to continue to your account</p>
        </div>

        {/* CARD */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-gray-200">
          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <p className="text-green-800 text-sm font-medium">
                Login successful! Redirecting...
              </p>
            </div>
          )}

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <a href="/forgot-password" className="text-xs text-indigo-600">
                  Forgot Password?
                </a>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="remember" className="w-4 h-4" />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || success}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {/* <p className="text-center text-sm text-gray-600 mt-4">
              Don’t have an account?{" "}
              <a href="/signup" className="text-indigo-600 font-semibold">
                Create one now
              </a>
            </p> */}
          </div>
        </div>

        {/* <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">🔒 Secure Login System</p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
