import {
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";



const ReportCard = ({ item }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition overflow-hidden">

      {/* Image */}
      <div className="h-48 bg-gray-100">
        <img
          src={
            item.photos?.[0]
              ? `http://localhost:4545/${item.photos[0]}`
              : "/placeholder.png"
          }
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">

        <div className="flex items-center justify-between mb-2">

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              item.reportType === "lost"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {item.reportType.toUpperCase()}
          </span>

          <span
            className={`text-xs px-2 py-1 rounded-full ${
              item.status === "active"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {item.status}
          </span>
        </div>

        <h3 className="font-bold text-lg mb-1">
          {item.title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {item.description}
        </p>

        <div className="space-y-2 text-sm text-gray-600">

          <div className="flex items-center gap-2">
            <MapPin size={15} />
            {item.location}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={15} />
            {new Date(item.date).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-2">
            <AlertTriangle size={15} />
            Urgency: {item.urgency}
          </div>

        </div>

        <div className="mt-4 flex justify-between items-center">

          <span className="text-xs text-gray-500">
            {item.category}
          </span>

          <button 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
            onClick={() => navigate(`/reports-card-details/${item._id}`)}
          >
            View Details
          </button>

        </div>

      </div>
    </div>
  );
};

export default ReportCard;