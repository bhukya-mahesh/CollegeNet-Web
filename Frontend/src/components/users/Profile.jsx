import React from "react";
import { Camera } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        User not found
      </div>
    );
  }

  const username = user.email?.split("@")[0];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          My Profile
        </h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">

          <div className="flex justify-between items-start">
            <div className="flex gap-4">

              {/* Avatar */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>

                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full">
                  <Camera size={14} />
                </button>
              </div>

              {/* User Info */}
              <div>
                <h2 className="text-lg font-bold">
                  {user.name}
                </h2>

                <p className="text-sm text-slate-600 mt-1">
                  @{username}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {user.email}
                </p>
              </div>
            </div>

        
          </div>

          {/* Details */}
          <div className="mt-6 space-y-4">
            <div className="border-t pt-4">
              <p className="text-xs text-slate-500 mb-1">
                Full Name
              </p>
              <h3 className="text-sm font-semibold">
                {user.name}
              </h3>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-slate-500 mb-1">
                Email
              </p>
              <h3 className="text-sm font-semibold">
                {user.email}
              </h3>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-slate-500 mb-1">
                Username
              </p>
              <h3 className="text-sm font-semibold">
                @{username}
              </h3>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-slate-500 mb-1">
                Account Verified
              </p>
              <h3 className="text-sm font-semibold">
                {user.isAccountVerified ? "✅ Verified" : "❌ Not Verified"}
              </h3>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-slate-500 mb-1">
                User ID
              </p>
              <h3 className="text-sm font-semibold break-all">
                {user._id}
              </h3>
            </div>
          </div>

          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium">
            Edit Profile
          </button>

        </div>
      </div>
    </div>
  );
};

export default Profile;