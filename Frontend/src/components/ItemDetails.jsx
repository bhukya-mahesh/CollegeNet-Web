import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Package,
  MessageSquare,
  ArrowLeft,
  IndianRupee,
  Calendar,
  Tag,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getItemById } from "../services/api";

const ItemDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchItem();
  }, [id]);
  const fetchItem = async () => {
  try {
    const res = await getItemById(id);

    if (res.data.success) {
      setItem(res.data.data);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const handlePrevImage = () => {
    if (!item?.images?.length) return;

    setCurrentImageIndex((prev) =>
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!item?.images?.length) return;

    setCurrentImageIndex((prev) =>
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex justify-center items-center h-screen">
        Item not found
      </div>
    );
  }

  const imageUrl =
    item.images && item.images.length > 0
      ? item.images[currentImageIndex]
      : null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 text-gray-700 hover:text-black"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left Section */}
          <div>
            <div className="bg-white border rounded-3xl overflow-hidden relative">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={item.title}
                  className="w-full h-[550px] object-cover"
                />
              ) : (
                <div className="h-[550px] flex items-center justify-center bg-gray-100">
                  <Package size={100} className="text-gray-400" />
                </div>
              )}

              {item.images?.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full"
                  >
                    ‹
                  </button>

                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div>
            {/* Tags */}
            <div className="flex gap-3 mb-4">
              <span className="px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                {item.category}
              </span>

              <span className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                {item.condition}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold text-slate-900 mb-5">
              {item.title}
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-8 mb-8">
              {item.description}
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-5 mb-6">
              <div className="border rounded-2xl p-5 bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <IndianRupee size={18} />
                  <p className="font-semibold">Price</p>
                </div>

                <p className="text-xl font-bold text-blue-600">
                  {item.price > 0 ? `₹${item.price}` : "Free"}
                </p>
              </div>

              <div className="border rounded-2xl p-5 bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <Tag size={18} />
                  <p className="font-semibold">Category</p>
                </div>

                <p>{item.category}</p>
              </div>

              <div className="border rounded-2xl p-5 bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <Package size={18} />
                  <p className="font-semibold">Condition</p>
                </div>

                <p>{item.condition}</p>
              </div>

              <div className="border rounded-2xl p-5 bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={18} />
                  <p className="font-semibold">Mode</p>
                </div>

                <p>{item.mode}</p>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white border rounded-2xl p-5 mb-8">
              <h3 className="font-semibold text-lg mb-3">Item Status</h3>

              <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full">
                Available
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition">
                Request Item
              </button>

              <button
                onClick={() => navigate(`/chat/${item.userId}`)}
                className="border px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:bg-gray-50"
              >
                <MessageSquare size={18} />
                Chat With Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;