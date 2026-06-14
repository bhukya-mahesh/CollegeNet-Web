import React from "react";
import {
  Search,
  Plus,
  Filter,
  Eye,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import {useNavigate} from 'react-router-dom'
import ReportCard from "../components/lostfound/ReportCard";
import { useEffect, useState } from "react";
import axios from "axios";


const LostFound = () => {

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4545/api";
  const [reports, setReports] = useState([]);
  useEffect(() => {
  const fetchReports = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/lostfound/reports` ,
        {
          withCredentials : true,
        }
      );
      console.log(data);
      if (data.success) {
        setReports(data.reports);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchReports();
}, []);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 text-white mb-6">
        <h1 className="text-2xl font-bold text-center mb-6">Lost & Found</h1>

        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <Eye className="mx-auto mb-2" size={20} />
            <h2 className="text-xl font-bold">{reports.length}</h2>
            <p className="text-sm">Items Found</p>
          </div>

          <div className="bg-white/10 rounded-lg p-4 text-center">
            <CheckCircle className="mx-auto mb-2" size={20} />
            <h2 className="text-xl font-bold">0</h2>
            <p className="text-sm">Items Returned</p>
          </div>

          <div className="bg-white/10 rounded-lg p-4 text-center">
            <TrendingUp className="mx-auto mb-2" size={20} />
            <h2 className="text-xl font-bold">0%</h2>
            <p className="text-sm">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
          All Posts
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{reports.length}</span>
        </button>

        <button className="bg-white px-4 py-2 rounded-lg text-sm font-semibold border">
          Lost Items
          <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-xs">0</span>
        </button>

        <button className="bg-white px-4 py-2 rounded-lg text-sm font-semibold border">
          Found Items
          <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-xs">0</span>
        </button>

        <button className="bg-white px-4 py-2 rounded-lg text-sm font-semibold border">
          My Posts
          <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-xs">0</span>
        </button>
      </div>

      {/* Search + Actions */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search items..."
              className="w-full pl-10 pr-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold hover:bg-gray-200">
            <Filter size={16} />
            Filters
          </button>

          {/* Report Button */}
          <button  onClick={() => navigate('/report-item')}
           className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
            <Plus size={16} />
            Report Item
          </button>
        </div>
      </div>

      {/* Empty State */}
     { reports.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {reports.map((report) => (
      <ReportCard
        key={report._id}
        item={report}
      />
    ))}
  </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 h-80 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Search size={32} className="text-gray-400" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900">No items found</h2>
        <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or search criteria.</p>
          <button  onClick={() => navigate('/report-item')}
          className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
          <Plus size={16} />
          Report an Item
        </button>
      </div>
        )
        
      }
    </div>
  );
};

export default LostFound;





 