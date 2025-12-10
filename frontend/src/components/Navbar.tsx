import { useState } from "react";
import { buttonColor, navColor } from "../color/color";
import { useAuth } from "../context/AuthContext";
import API from "../axios/axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {viewerNavbar} from "../../app/data/Navbar/NavbarData"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const {user,loading,checkUser} = useAuth();
  const navigate = useNavigate();
 const logoutUser = async()=>{
  try {
    await API.get("/auth/logout", {
        withCredentials: true,
      });

     setProfileOpen(false)
     checkUser();
 } catch (error) {
  console.log(error)
 }

 }


  return loading?"loading":(
    <>
      {/* NAVBAR */}
      <nav style={{background:navColor}} className={`w-full px-4 sm:px-6 lg:px-8 py-4 text-white flex justify-between items-center shadow-lg`}>
        {/* LOGO */}
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide">
          {viewerNavbar.logo}
        </div>

        {/* Desktop Menu & Profile / Mobile Hamburger */}
        <div className="flex items-center gap-6">
          {/* Desktop Menu Items */}
          <div className="hidden md:flex items-center gap-6">
            {viewerNavbar.navbaroption.map((val,i)=>(
            <NavLink key={i} to={val.location} className="text-base lg:text-lg hover:text-yellow-400 transition-colors">
              {val.name}
            </NavLink>
            ))}
       
              <Link to="/creator-dashboard"
              style={{background:buttonColor}}
                className="px-4 py-2 hover:bg-yellow-400 rounded-lg text-black text-sm lg:text-base font-semibold transition-all"
              >
                🎬 Creator
              </Link>
  

         
          </div>

          {/* Profile Icon - Desktop Only */}
          <div
            className="hidden md:block cursor-pointer transform transition-transform hover:scale-110"
            onClick={() => setProfileOpen(true)}
          >
            <img
              src={user?.avatar}
              alt="profile"
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white shadow-md"
            />
          </div>

          {/* Hamburger Menu - Mobile Only */}
          <button
            className="md:hidden flex flex-col gap-1.5 cursor-pointer"
            onClick={() => setMenuOpen(true)}
          >
            <span className="w-6 h-0.5 bg-white rounded transition-all"></span>
            <span className="w-6 h-0.5 bg-white rounded transition-all"></span>
            <span className="w-6 h-0.5 bg-white rounded transition-all"></span>
          </button>
        </div>
      </nav>

      {/* FULLSCREEN PROFILE OVERLAY */}
      {profileOpen && (
        <div
          className="fixed inset-0 w-full h-screen bg-black text-white z-50 flex items-center justify-center p-4"
          style={{
            animation: "fadeIn 0.3s ease-out",
            background: "rgba(0, 0, 0, 0.95)",
          }}
          onClick={() => setProfileOpen(false)}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-3xl sm:text-4xl hover:text-red-500 transition-colors z-10"
            onClick={() => setProfileOpen(false)}
          >
            ✕
          </button>

          {/* Logo - Top Left */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide opacity-80">
            MyStream
          </div>

          {/* Profile Card */}
          <div
            className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-2xl border border-gray-700 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[450px] p-4 sm:p-6 md:p-8"
            style={{
              animation: "zoomIn 0.4s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Profile Content */}
            <div className="flex flex-col items-center">
              {/* Profile Image */}
              <div className="relative mb-4">
                <img
                  src={user?.avatar}
                  alt="profile"
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-yellow-400 shadow-2xl object-cover"
                />
                {/* Online Status Indicator */}
                <span className="absolute bottom-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 border-4 border-gray-900 rounded-full animate-pulse"></span>
              </div>

              {/* User Info */}
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 text-center">
               {user?.name}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base mb-3 text-center">
                {user?.email}
              </p>

              {/* Status Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 rounded-full mb-4">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs sm:text-sm font-medium">
                  {isCreator ? "🎬 Creator Mode" : "👁️ Viewer Mode"}
                </span>
              </div>

              {/* Stats Grid */}
              <div className="w-full py-4 border-y border-gray-700 mb-4">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-1">
                      {isCreator ? "124" : "42"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {isCreator ? "Streams" : "Watched"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-1">
                      {isCreator ? "5.2K" : "89"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {isCreator ? "Followers" : "Following"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-2">
                <button
                  className="w-full px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm sm:text-base font-medium transition-all duration-200"
                >
                  Edit Profile
                </button>
                
                <button
                  className="w-full px-4 sm:px-6 py-2 sm:py-2.5 bg-red-600 hover:bg-red-500 rounded-lg text-white text-sm sm:text-base font-medium transition-all duration-200"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </div>

              {/* Additional Info */}
              <div className="w-full mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Member since 2024</span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Premium
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN MENU OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white z-50 flex flex-col"
          style={{
            animation: "slideIn 0.3s ease-out",
          }}
        >
          {/* TOP SECTION - Logo, Profile, Close */}
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center border-b border-gray-700">
            {/* LEFT - Logo */}
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide">
              MyStream
            </div>

            {/* RIGHT - Close Button */}
            <button
              className="text-3xl sm:text-4xl hover:text-red-500 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* MAIN CONTENT - Responsive Grid Layout */}
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
              {/* Desktop Layout: 3 Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* LEFT COLUMN - Logo (Desktop Only) */}
                <div className="hidden lg:flex lg:col-span-3 justify-center items-start pt-8">
                  <div className="text-6xl font-bold opacity-20 transform -rotate-12">
                    MS
                  </div>
                </div>

                {/* MIDDLE COLUMN - Menu Options */}
                <div className="lg:col-span-6 space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center lg:text-left">
                    Menu
                  </h2>

                  {/* Menu Items */}
                  <div className="flex flex-col gap-4">
                    <button className="w-full text-left px-6 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-lg sm:text-xl transition-all duration-200 transform hover:translate-x-2">
                      About
                    </button>

                    <button className="w-full text-left px-6 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-lg sm:text-xl transition-all duration-200 transform hover:translate-x-2">
                      Settings
                    </button>

                    <button className="w-full text-left px-6 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-lg sm:text-xl transition-all duration-200 transform hover:translate-x-2">
                      Help & Support
                    </button>

              
                      <Link to="/creator-dashboard"
                        className="cursor-pointer w-full text-left px-6 py-4 bg-yellow-600 hover:bg-yellow-500 rounded-lg text-lg sm:text-xl font-semibold transition-all duration-200 transform hover:scale-105"
                        onClick={() => setIsCreator(true)}
                      >
                        🎬 Become a Creator
                      </Link>

                   

                    <button className="w-full text-left px-6 py-4 bg-red-600 hover:bg-red-500 rounded-lg text-lg sm:text-xl transition-all duration-200 transform hover:scale-105" onClick={logoutUser} >
                      Logout
                    </button>
                  </div>
                </div>

                {/* RIGHT COLUMN - Profile Section */}
                <div className="lg:col-span-3">
                  <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
                    <div className="flex flex-col items-center">
                      {/* Profile Image */}
                      <img
                        src={user?.avatar}
                        alt="profile"
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-yellow-400 shadow-xl mb-4"
                      />

                      {/* User Info */}
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 text-center">
                        {user?.name}
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base mb-4 text-center">
                        {user?.email}
                      </p>

                      {/* Status Badge */}
                      <div className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-full">
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-sm">
                          {isCreator ? "Creator" : "Viewer"}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="w-full mt-6 pt-6 border-t border-gray-700">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-yellow-400">
                              {isCreator ? "124" : "42"}
                            </div>
                            <div className="text-xs text-gray-400">
                              {isCreator ? "Streams" : "Watched"}
                            </div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-yellow-400">
                              {isCreator ? "5.2K" : "89"}
                            </div>
                            <div className="text-xs text-gray-400">
                              {isCreator ? "Followers" : "Following"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-700 text-center text-gray-500 text-sm">
            © 2024 MyStream. All rights reserved.
          </div>
        </div>
      )}

      <style >{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;