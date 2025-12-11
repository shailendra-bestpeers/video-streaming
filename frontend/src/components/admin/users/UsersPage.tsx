import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import API from "../../../axios/axios";
import { Users, UserPlus, Edit2, Trash2, Shield, Mail } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    const { data } = await API.get("/users/all");
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    await API.delete(`/users/delete/${id}`);
    fetchUsers();
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="p-3 rounded-xl shadow-lg"
            style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
          >
            <Users className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Users Management</h1>
            <p className="text-gray-400 mt-1">Manage all platform users</p>
          </div>
        </div>
        <div 
          className="h-1 w-32 rounded-full ml-16"
          style={{ background: 'linear-gradient(to right, #4f46e5, #9333ea)' }}
        />
      </div>

      {/* Add User Button */}
      <button
        onClick={() => {
          setEditUser(null);
          setShowForm(true);
        }}
        className="mb-6 px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
        style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
      >
        <UserPlus className="w-5 h-5" />
        Add User
      </button>

      {/* User Table */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="p-4 text-gray-300 font-semibold bg-zinc-900/50">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    Name
                  </div>
                </th>
                <th className="p-4 text-gray-300 font-semibold bg-zinc-900/50">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-400" />
                    Email
                  </div>
                </th>
                <th className="p-4 text-gray-300 font-semibold bg-zinc-900/50">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-400" />
                    Role
                  </div>
                </th>
                <th className="p-4 text-gray-300 font-semibold bg-zinc-900/50">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr 
                  key={user._id} 
                  className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-zinc-700"
                        />
                      ) : (
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                          style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-white font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400">{user.email}</td>
                  <td className="p-4">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white capitalize"
                      style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      {/* Edit */}
                      <button
                        className="p-2 rounded-lg hover:scale-110 transition-all duration-200 group/btn"
                        style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
                        onClick={() => {
                          setEditUser(user);
                          setShowForm(true);
                        }}
                      >
                        <Edit2 className="w-4 h-4 text-white" />
                      </button>

                      {/* Delete */}
                      <button
                        className="p-2 rounded-lg hover:scale-110 transition-all duration-200"
                        style={{ background: '#dc2626' }}
                        onClick={() => deleteUser(user._id)}
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-16">
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
            >
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Users Yet</h3>
            <p className="text-gray-400 mb-6">Start by adding your first user</p>
            <button
              onClick={() => {
                setEditUser(null);
                setShowForm(true);
              }}
              className="px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
              style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
            >
              <UserPlus className="w-5 h-5" />
              Add First User
            </button>
          </div>
        )}
      </div>

      {/* User Count Badge */}
      {users.length > 0 && (
        <div className="mt-6 flex items-center gap-2 text-gray-400">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ background: '#dc2626' }}
          />
          <span className="text-sm">Total Users: <span className="font-semibold text-white">{users.length}</span></span>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <UserForm
          user={editUser}
          onClose={() => setShowForm(false)}
          onSaved={fetchUsers}
        />
      )}
    </div>
  );
};

export default UsersPage;