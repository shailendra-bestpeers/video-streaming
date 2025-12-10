import { Outlet } from "react-router-dom";
import Sidebar from "../components/creator/Sidebar";
import Navbar from "../components/creator/Navbar";

const CreatorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* SIDEBAR (desktop + mobile version already handled inside component) */}
      <Sidebar />

      {/* NAVBAR (already responsive inside the component) */}
      <Navbar />

      {/* MAIN AREA */}
      <main
        className="
          pt-16
          transition-all
          duration-300
          min-h-screen
          p-4 sm:p-6
          bg-gray-50

          /* On large screens push content to the right */
          lg:ml-64
        "
      >
        <Outlet />
      </main>
    </div>
  );
};

export default CreatorDashboard;
