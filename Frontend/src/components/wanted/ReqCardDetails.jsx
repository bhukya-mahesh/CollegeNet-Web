import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Package,
  DollarSign,
  Calendar,
  AlertTriangle,
  MessageCircle,
  CheckCircle,
  IndianRupee,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ReqCardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4545/api/wanted/${id}`
      );

      if (data.success) {
        setPost(data.post);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Request...
      </div>
    );
  }

  const urgencyColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-orange-100 text-orange-700",
    urgent: "bg-red-100 text-red-700",
  };
   
  console.log("POST USER ID:", post.userId);

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/wanted")}
        className="flex items-center gap-2 mb-6 text-gray-700 hover:text-purple-600"
      >
        <ArrowLeft size={18} />
        Back to Requests
      </button>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Image */}
        <div>
          <img
            src={
              post.image
                ? `http://localhost:4545/${post.image}`
                : "https://placehold.co/800x600?text=Wanted+Item"
            }
            alt={post.title}
            className="w-full h-[450px] object-cover rounded-2xl border"
          />
        </div>

        {/* Details */}
        <div>

          <div className="flex gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                urgencyColors[post.urgency]
              }`}
            >
              {post.urgency?.toUpperCase()}
            </span>

            <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4">
            {post.title}
          </h1>

          <p className="text-gray-600 leading-relaxed mb-6">
            {post.description}
          </p>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4">

            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package size={18} />
                <h3 className="font-semibold">
                  Quantity Needed
                </h3>
              </div>

              <p className="text-gray-600">
                {post.quantity}
              </p>
            </div>

            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <IndianRupee size={18} />
                <h3 className="font-semibold">
                  Budget
                </h3>
              </div>

              <p className="text-gray-600">
                {post.budget === "free"
                  ? "Free Only"
                  : post.budget === "max"
                  ? `₹${post.maxPrice}`
                  : "Any Price"}
              </p>
            </div>

            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} />
                <h3 className="font-semibold">
                  Preferred Condition
                </h3>
              </div>

              <p className="text-gray-600">
                {post.condition}
              </p>
            </div>

            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={18} />
                <h3 className="font-semibold">
                  Posted On
                </h3>
              </div>

              <p className="text-gray-600">
                {new Date(
                  post.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

          </div>

          {/* Expiry */}
          {post.expiryDate && (
            <div className="mt-6 border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={18} />
                <h3 className="font-semibold">
                  Request Expiry
                </h3>
              </div>

              <p className="text-gray-600">
                {new Date(
                  post.expiryDate
                ).toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Status */}
          <div className="mt-6 border rounded-xl p-4 bg-gray-50">
            <h3 className="font-semibold mb-2">
              Request Status
            </h3>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                post.status === "active"
                  ? "bg-green-100 text-green-700"
                  : post.status === "fulfilled"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {post.status}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">

            <button
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium"
            >
              I Can Help
            </button>

            <button
                  onClick={() => navigate(`/chat/${post.userId}`)}
              className="border px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-50"
            >
              <MessageCircle size={18} />
              Chat With Requester
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ReqCardDetails;