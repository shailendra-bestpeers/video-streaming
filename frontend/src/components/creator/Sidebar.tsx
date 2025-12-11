import { Home, Video, Upload, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, type JSX } from "react";
import { creatorSidebar } from "../../../app/data/sidebar/sidebarData";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const {user} = useAuth()
  

  const iconMap: Record<string, JSX.Element> = {
    Home: <Home className="w-5 h-5" />,
    Video: <Video className="w-5 h-5" />,
    Upload: <Upload className="w-5 h-5" />,
  };

  return (
    <>
      {/* ================ DESKTOP SIDEBAR ================ */}
      <aside className="hidden lg:flex fixed left-0 top-0 w-64 h-screen bg-black border-r border-zinc-800 shadow-2xl flex-col z-40">

        {/* LOGO */}
        <div className="p-6 flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
          >
            <Video className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">Creator Studio</h1>
            <p className="text-xs text-gray-400">Creator Mode</p>
          </div>
        </div>

        {/* MENU */}
        <nav className="px-3 space-y-1 flex-1">
          {creatorSidebar.map((item) => (
            <Link
              to={item.to}
              key={item.label}
              className="group w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-900 text-gray-400 hover:text-white transition-all duration-200 relative overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                style={{ background: 'linear-gradient(to right, #4f46e5, #9333ea)' }}
              />
              
              <div 
                className="relative p-1.5 rounded-lg group-hover:shadow-lg transition-all"
                style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
              >
                {iconMap[item.icon]}
              </div>
              <span className="font-medium relative z-10">{item.label}</span>
              
              {/* Red accent dot on hover */}
              <div 
                className="absolute right-3 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: '#dc2626' }}
              />
            </Link>
          ))}
        </nav>

        {/* FOOTER USER */}
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 px-3 py-2 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
              style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
            >
              <User className="w-5 h-5 text-white" />
            </div>

            <div className="overflow-hidden">
              <p className="font-semibold text-sm text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ================ MOBILE SIDEBAR ================ */}
      {open && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-black border-r border-zinc-800 shadow-2xl z-50 transform transition-transform duration-300 lg:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
            >
              <Video className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Creator Studio</h1>
          </div>

          <button
            className="p-2 rounded-lg hover:bg-zinc-900 transition-colors"
            onClick={() => setOpen(false)}
          >
            <X className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
          </button>
        </div>

        {/* MOBILE MENU */}
        <nav className="px-3 space-y-1">
          {creatorSidebar.map((item) => (
            <Link
              to={item.to}
              key={item.label}
              onClick={() => setOpen(false)}
              className="group w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-900 text-gray-400 hover:text-white transition-all duration-200 relative overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                style={{ background: 'linear-gradient(to right, #4f46e5, #9333ea)' }}
              />
              
              <div 
                className="relative p-1.5 rounded-lg group-hover:shadow-lg transition-all"
                style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
              >
                {iconMap[item.icon]}
              </div>
              <span className="font-medium relative z-10">{item.label}</span>
              
              {/* Red accent dot on hover */}
              <div 
                className="absolute right-3 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: '#dc2626' }}
              />
            </Link>
          ))}
        </nav>

        {/* FOOTER USER */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 px-3 py-2 bg-zinc-900 rounded-lg border border-zinc-800">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
              style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
            >
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold text-sm text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE SIDEBAR BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 p-2.5 border border-zinc-800 rounded-lg shadow-lg lg:hidden hover:scale-105 transition-transform"
        style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
      >
        <Video className="w-5 h-5 text-white" />
      </button>
    </>
  );
};

export default Sidebar;