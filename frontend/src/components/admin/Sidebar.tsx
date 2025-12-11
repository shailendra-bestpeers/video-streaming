import { Home, Video, Upload, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, type JSX } from "react";
import { AdminSidebar } from "../../../app/data/sidebar/sidebarData";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const {user} = useAuth()

  const iconMap: Record<string, JSX.Element> = {
    Home: <Home className="w-5 h-5" />,
    Video: <Video className="w-5 h-5" />,
    Upload: <Upload className="w-5 h-5" />,
    User: <User className="w-5 h-5" />,
  };

  return (
    <>
      {/* ================ DESKTOP SIDEBAR ================ */}
      <aside className="hidden lg:flex fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 shadow-xl flex-col z-40">

        {/* LOGO */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Video className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-indigo-600">Admin Studio</h1>
            <p className="text-xs text-gray-500">Creator Mode</p>
          </div>
        </div>

        {/* MENU */}
        <nav className="px-3 space-y-1 flex-1">
          {AdminSidebar.map((item) => (
            <Link
              to={item.to}
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition"
            >
              {iconMap[item.icon]} {/* ✅ Correct icon */}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* FOOTER USER */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>

            <div>
              <p className="font-semibold text-sm text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ================ MOBILE SIDEBAR ================ */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-xl z-50 transform transition-transform duration-300 lg:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-indigo-600">Admin Studio</h1>
          </div>

          <button
            className="p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* MOBILE MENU */}
        <nav className="px-3 space-y-1">
          {AdminSidebar.map((item) => (
            <Link
              to={item.to}
              key={item.label}
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition"
            >
              {iconMap[item.icon]} {/* ✅ Same icon mapping */}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* FOOTER USER */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <div className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE SIDEBAR BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-white border border-gray-300 rounded-lg shadow-md lg:hidden"
      >
        <Video className="w-5 h-5 text-indigo-600" />
      </button>
    </>
  );
};

export default Sidebar;
