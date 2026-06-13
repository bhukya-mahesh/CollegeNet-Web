import React from "react";
import {
  X,
  Check,
  Smartphone,
  Shirt,
  Key,
  FileText,
  Briefcase,
  Package,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReport } from "../../context/ReportContext";


const ClaimItem = ({ onClose, onBack, onNext }) => {
  const{ formData, setFormData } = useReport();
  const navigate = useNavigate();

  const categories = [
    { name: "Electronics", icon: Smartphone },
    { name: "Clothing", icon: Shirt },
    { name: "Keys", icon: Key },
    { name: "Documents", icon: FileText },
    { name: "Bags & Wallets", icon: Briefcase },
    { name: "Accessories", icon: Package },
    { name: "Other", icon: Package },
  ];

  const urgencyLevels = [
    {
      name: "Low",
      color: "bg-gray-500",
    },
    {
      name: "Medium",
      color: "bg-yellow-500",
    },
    {
      name: "High",
      color: "bg-orange-500",
    },
    {
      name: "Critical",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-xl flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h2 className="text-lg font-bold">
            Report Lost or Found Item
          </h2>

          <button onClick={()=> navigate('/lostfound')}>
            <X size={20} />
          </button>
        </div>

         {/* Progress */}
<div className="px-5 py-4">
  <div className="flex items-center">
     <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-semibold">
      ✓
    </div>
    <div className="flex-1 h-[2px] bg-green-500 mx-2"></div>
    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
      2
    </div>
    <div className="flex-1 h-[2px] bg-gray-200 mx-2"></div>
    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-semibold">
      3
    </div>
    <div className="flex-1 h-[2px] bg-gray-200 mx-2"></div>
    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-semibold">
      4
    </div>
    <div className="flex-1 h-[2px] bg-gray-200 mx-2"></div>
    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-semibold">
      5
    </div>
  </div>

  <div className="grid grid-cols-5 mt-2 text-[11px] text-gray-500">
    <div className="text-center">Type</div>
    <div className="text-center  text-blue-600 font-medium">Details</div>
    <div className="text-center">
      Photos
    </div>
    <div className="text-center">Verify</div>
    <div className="text-center">Contact</div>
  </div>
</div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Title *
            </label>

           <input
              type="text"
              placeholder="e.g., Black iPhone 14 Pro, Blue Wallet..."
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Description *
            </label>

            <textarea
              rows="4"
              placeholder="Describe the item in detail (color, size, distinguishing features...)"
              className="w-full border rounded-lg px-3 py-2 text-sm resize-none outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Category *
            </label>

            <div className="grid grid-cols-3 gap-2">
              {categories.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.name}
                    onClick={() => setFormData({ ...formData, category: item.name })}
                    className={`border rounded-lg p-3 flex flex-col items-center gap-2 transition
                    ${
                      formData.category === item.name
                        ? "border-blue-500 bg-blue-50"
                        : "hover:border-gray-400"
                    }`}
                  >
                    <Icon size={18} />

                    <span className="text-xs">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Location *
              </label>

              <input onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                type="text"
                placeholder="e.g., Library 2nd Floor"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={formData.location}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Date Found/Lost *
              </label>

              <div className="relative">
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />

                <Calendar
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-sm font-semibold mb-3">
              Urgency Level
            </label>

            <div className="grid grid-cols-4 gap-2">
              {urgencyLevels.map((level) => (
                <button
                  key={level.name}
                  onClick={() =>
                    setFormData({ ...formData, urgency: level.name.toLowerCase() })
                  }
                  className={`border rounded-lg py-3 flex flex-col items-center gap-2 transition
                  ${
                    formData.urgency === level.name.toLowerCase()
                      ? "border-yellow-500 bg-yellow-50"
                      : ""
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${level.color}`}
                  />

                  <span className="text-sm font-medium">
                    {level.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 border-t">
          <button
            onClick={() => navigate('/report-item')}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium"
          >
            <ChevronLeft size={16} />
            Back
          </button>

          <button
            onClick={() => navigate('/report-photos')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ClaimItem;