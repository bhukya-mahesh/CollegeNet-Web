import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Myitems = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">My Items</h1>

        <button onClick={() => navigate("/add-item")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
          <Plus size={16} />
          Add Item
        </button>
      </div>

      {/* Empty State Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-80 flex items-center justify-between px-8">
        
        {/* Left Side */}
        <div>
          <button  onClick={() => navigate("/add-item")}
           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition">
            Create Your First Listing
          </button>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-center">
          <p className="text-lg text-slate-500">You haven't listed any items yet</p>
        </div>

      </div>
    </div>
  );
};

export default Myitems;