import { useState, useRef, useEffect } from "react";
import {
  User,
  LogOut,
  Settings,
  Bell,
  Search,
  Video,
  Menu,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../axios/axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {user,checkUser} = useAuth();
  const navigate = useNavigate()

  // Close dropdown when clicking outside
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const logoutUser = async()=>{
  try {
    await API.get("/auth/logout", {
        withCredentials: true,
      });
     checkUser();
     navigate('/')
 } catch (error) {
  console.log(error)
 }

 }

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-black border-b border-zinc-800 shadow-2xl z-40">
        <div className="h-full px-4 lg:px-6 flex items-center justify-between">
          {/* LEFT SIDE - LOGO + MENU */}
          <div className="flex items-center gap-4">
            {/* MOBILE MENU BUTTON */}
            <button className="lg:hidden p-2 rounded-lg hover:bg-zinc-900 transition-colors">
              <Menu className="w-6 h-6 text-gray-400" />
            </button>

            {/* MOBILE LOGO */}
            <div className="flex lg:hidden items-center gap-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
              >
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                StreamHub
              </span>
            </div>
          </div>

          {/* SEARCH BAR (hidden on small screens) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search videos..."
                className="w-full pl-12 pr-4 py-2 bg-zinc-900 border border-zinc-800 text-white placeholder-gray-500 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* RIGHT SIDE ICONS */}
          <div className="flex items-center gap-3">
            {/* NOTIFICATIONS */}
            <button className="p-2 hover:bg-zinc-900 rounded-full relative transition-colors group">
              <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <span 
                className="absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#dc2626' }}
              ></span>
            </button>

            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 text-white rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
            >
              <Video className="w-4 h-4" />
              <span className="font-medium hidden xs:inline">Viewer</span>
            </Link>

            {/* USER DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="p-1.5 hover:bg-zinc-900 rounded-full transition-colors"
              >
                <div 
                  className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
                >
                  <User className="w-5 h-5 text-white" />
                </div>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50">
                  {/* HEADER */}
                  <div className="p-4 border-b border-zinc-800 flex gap-3 items-center relative overflow-hidden">
                    {/* Gradient background overlay */}
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
                    />
                    
                    <div 
                      className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
                      style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
                    >
                      <User className="w-6 h-6 text-white" />
                    </div>

                    <div className="relative overflow-hidden">
                      <p className="font-semibold text-white truncate">
                        {user?.name}
                      </p>
                      <p className="text-sm text-gray-400 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  {/* MENU */}
                  <div className="py-2">
                    {/* SETTINGS */}
                    <button className="flex items-center gap-3 px-4 py-2.5 w-full text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors group">
                      <div 
                        className="p-1 rounded-md"
                        style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
                      >
                        <Settings className="w-4 h-4 text-white" />
                      </div>
                      Settings
                    </button>

                    {/* LOGOUT */}
                    <button 
                      onClick={logoutUser} 
                      className="flex items-center gap-3 px-4 py-2.5 w-full text-gray-300 hover:bg-zinc-800 transition-colors group"
                    >
                      <div 
                        className="p-1 rounded-md"
                        style={{ background: '#dc2626' }}
                      >
                        <LogOut className="w-4 h-4 text-white" />
                      </div>
                      <span className="group-hover:text-red-400 transition-colors">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE SEARCH BAR (visible below navbar) */}
      <div className="md:hidden mt-16 px-4 py-3 bg-black border-b border-zinc-800">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-12 pr-4 py-2 bg-zinc-900 border border-zinc-800 text-white placeholder-gray-500 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;