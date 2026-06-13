import React, { useState } from 'react';
import { X, MessageSquare, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const ItemDetails = ({ item, onClose, onRequest }) => {
   const navigate = useNavigate();
  // Use dummy item for testing if no item provided
  const displayItem = item || dummyItem;
  
  if (!displayItem) return null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageUrl = displayItem.images && displayItem.images.length > 0 ? displayItem.images[currentImageIndex] : null;

  const handlePrevImage = () => {
    if (displayItem.images && displayItem.images.length > 1) {
      setCurrentImageIndex((prev) => (prev === 0 ? displayItem.images.length - 1 : prev - 1));
    }
  };

  const handleNextImage = () => {
    if (displayItem.images && displayItem.images.length > 1) {
      setCurrentImageIndex((prev) => (prev === displayItem.images.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">{displayItem.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image Gallery */}
          <div className="bg-linear-to-br from-gray-100 to-gray-200 rounded-lg h-80 flex items-center justify-center relative overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={displayItem.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Package size={80} className="text-gray-300" />
            )}

            {/* Image Navigation */}
            {displayItem.images && displayItem.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  ‹
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  ›
                </button>
                <div className="absolute bottom-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {displayItem.images.length}
                </div>
              </>
            )}
          </div>

          {/* Item Info */}
          <div className="space-y-4">
            {/* Title and Price */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{displayItem.title}</h3>
              <div className="flex items-center gap-4">
                {displayItem.price > 0 ? (
                  <span className="text-3xl font-bold text-blue-600">₹{displayItem.price}</span>
                ) : (
                  <span className="text-3xl font-bold text-green-600">Free</span>
                )}
                <span className="text-lg font-semibold px-4 py-2 rounded bg-blue-100 text-blue-700">
                  {displayItem.mode}
                </span>
              </div>
            </div>

            {/* Category & Condition */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="text-lg font-semibold text-slate-900">{displayItem.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Condition</p>
                <p className="text-lg font-semibold text-slate-900">{displayItem.condition}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Description</h4>
              <p className="text-gray-700 leading-relaxed">{displayItem.description}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 border-t border-gray-200 pt-6">
            <button
              onClick={() => onRequest && onRequest(displayItem.id, displayItem.mode)}
              className={`w-full py-3 rounded-lg font-medium transition text-white ${
                displayItem.mode === 'Give Away'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {displayItem.mode === 'Give Away' ? 'Claim Now' : 'Request Item'}
            </button>
           <button
  onClick={() => {
    console.log("OWNER ID:", displayItem.userId);

    navigate(`/chat/${displayItem.userId}`);
  }}
  className="w-full py-3 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2"
>
  <MessageSquare size={18} />
  Chat with Owner
</button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
