const Main = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
          Logout
        </button>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Total Users</h2>
          <p className="text-2xl font-semibold mt-2">1,245</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Total Creators</h2>
          <p className="text-2xl font-semibold mt-2">320</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Total Videos</h2>
          <p className="text-2xl font-semibold mt-2">9,876</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>

        <ul className="space-y-3">
          <li className="p-4 bg-gray-50 rounded-lg border">User John uploaded a new video</li>
          <li className="p-4 bg-gray-50 rounded-lg border">Creator Priya updated channel details</li>
          <li className="p-4 bg-gray-50 rounded-lg border">System: Database Backup Completed</li>
        </ul>
      </div>
    </div>
  );
};

export default Main;
