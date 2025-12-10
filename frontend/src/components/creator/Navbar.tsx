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
      <nav className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-40">
        <div className="h-full px-4 lg:px-6 flex items-center justify-between">
          {/* LEFT SIDE - LOGO + MENU */}
          <div className="flex items-center gap-4">
            {/* MOBILE MENU BUTTON */}
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* MOBILE LOGO */}
            <div className="flex lg:hidden items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-indigo-600">
                StreamHub
              </span>
            </div>
          </div>

          {/* SEARCH BAR (hidden on small screens) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search videos..."
                className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* RIGHT SIDE ICONS */}
          <div className="flex items-center gap-3">
            {/* NOTIFICATIONS */}
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>

            <Link
              to="/"
              className="
    flex items-center gap-2 
    px-2 sm:px-3 py-1.5 
    bg-indigo-600 text-white 
    hover:bg-indigo-700 
    rounded-full shadow 
    transition text-sm
  "
            >
              <Video className="w-4 h-4" />
              <span className="font-medium hidden xs:inline">Viewer</span>
            </Link>

            {/* USER DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="p-1.5 hover:bg-gray-100 rounded-full"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <User className="w-5 h-5 text-white" />
                </div>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
                  {/* HEADER */}
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200 flex gap-3 items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  {/* MENU */}
                  <div className="py-2">
                    {/* SETTINGS */}
                    <button className="flex items-center gap-3 px-4 py-2 w-full text-gray-700 hover:bg-gray-100 transition">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>

                    {/* LOGOUT */}
                    <button onClick={logoutUser} className="flex items-center gap-3 px-4 py-2 w-full text-red-600 hover:bg-red-50 transition">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE SEARCH BAR (visible below navbar) */}
      <div className="md:hidden mt-16 px-4 py-3 bg-white border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
