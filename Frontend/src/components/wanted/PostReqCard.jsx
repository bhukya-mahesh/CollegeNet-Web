import React from "react";
import {
  Calendar,
  Package,
  DollarSign,
  AlertTriangle,
  Eye,
  IndianRupee,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PostReqCard = ({ item }) => {
  const navigate = useNavigate();

  const urgencyColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-orange-100 text-orange-700",
    urgent: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition overflow-hidden">

      {/* Image */}
      <div className="h-48 bg-gray-100">
        <img
          src={
            item.image
              ? `http://localhost:4545/${item.image}`
              : "https://placehold.co/600x400?text=Wanted+Item"
          }
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              urgencyColors[item.urgency]
            }`}
          >
            {item.urgency?.toUpperCase()}
          </span>

          <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
            {item.category}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
          {item.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {item.description}
        </p>

        {/* Details */}
        <div className="space-y-2 text-sm text-gray-600">

          <div className="flex items-center gap-2">
            <Package size={16} />
            Quantity Needed: {item.quantity}
          </div>

          <div className="flex items-center gap-2">
            <IndianRupee size={16} />
            Budget:{" "}
            {item.budget === "free"
              ? "Free Only"
              : item.budget === "max"
              ? `₹${item.maxPrice}`
              : "Any"}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {new Date(item.createdAt).toLocaleDateString()}
          </div>

        </div>

        {/* Footer */}
        <div className="mt-5 flex justify-between items-center">

          <span className="text-xs text-gray-500">
            {item.condition}
          </span>

          <button
            onClick={() =>
              navigate(`/wanted-details/${item._id}`)
            }
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium"
          >
            <Eye size={16} />
            View Details
          </button>

        </div>
      </div>
    </div>
  );
};

export default PostReqCard;