import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Main = () => {
  const {user} = useAuth();
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Creator Dashboard</h1>

        <Link to="new-video" className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700">
          Upload Video
        </Link>
      </header>

      {/* Profile Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Channel</h2>

        <div className="flex items-center gap-4">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-16 h-16 rounded-full"
          />

          <div>
            <p className="text-lg font-bold text-gray-900">{user?.name}</p>
            <p className="text-gray-500 text-sm">Content Creator • 12.5K Subscribers</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}


      {/* Recent Videos */}

    </div>
  );
};

export default Main;
