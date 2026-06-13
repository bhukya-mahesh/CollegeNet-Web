import React from "react";
import {
  Search,
  Plus,
  Filter,
  Package,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PostReqCard from "../components/wanted/PostReqCard";


const Wanted = () => {
  const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loading , setLoading] = useState(true);

     
  useEffect(() => {
  const fetchPostRequests = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4545/api/wanted/all"
      );

      if (data.success) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.log(error);
    } finally {
    setLoading(false);
    }
  };

  fetchPostRequests();
}, []);
  
  if (loading) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Package
        size={40}
        className="text-purple-600 animate-pulse mb-3"
      />
      <h2 className="text-lg font-semibold">
        Loading Requests...
      </h2>
    </div>
  );
} 


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg p-6 text-white mb-6">
        <h1 className="text-2xl font-bold text-center mb-4">Wanted Items</h1>

        <p className="text-center text-sm text-purple-100 mb-6">
          Looking for something? Post what you need and let others help you find it!
        </p>

        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <Package className="mx-auto mb-2" size={20} />
            <h2 className="text-xl font-bold">{posts.length}</h2>
            <p className="text-xs">Active Requests</p>
          </div>

          <div className="bg-white/10 rounded-lg p-4 text-center">
            <CheckCircle className="mx-auto mb-2" size={20} />
            <h2 className="text-xl font-bold">0</h2>
            <p className="text-xs">Requests Fulfilled</p>
          </div>

          <div className="bg-white/10 rounded-lg p-4 text-center">
            <TrendingUp className="mx-auto mb-2" size={20} />
            <h2 className="text-xl font-bold">0%</h2>
            <p className="text-xs">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
          All Requests
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{posts.length}</span>
        </button>

        <button className="bg-white px-4 py-2 rounded-lg text-sm font-semibold border">
          My Requests
          <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-xs">0</span>
        </button>

        <button className="bg-white px-4 py-2 rounded-lg text-sm font-semibold border">
          My Offers
          <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-xs">0</span>
        </button>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search requests..."
              className="w-full pl-10 pr-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold hover:bg-gray-200">
            <Filter size={16} />
            Filters
          </button>

          <button onClick={() => navigate('/post-request')}
           className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
            <Plus size={16} />
            Post Request
          </button>
        </div>
      </div>

      {/* Empty State */}
      { posts.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {posts.map((post) => (
      <PostReqCard
        key={post._id}
        item={post}
      />
    ))}
  </div> 
      ):(
      <div className="bg-white rounded-lg shadow-sm h-80 flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Package size={32} className="text-gray-400" />
        </div>

        <h2 className="text-lg font-semibold text-slate-900">No requests found</h2>

        <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or search criteria.</p>

        <button  onClick={() => navigate('/post-request')}
        className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
          <Plus size={16} />
          Post a Request
        </button>
      </div>
      )
    }
    </div>
  );
};


export default Wanted;