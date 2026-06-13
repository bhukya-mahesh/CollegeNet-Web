import React from "react";
import { Tag, Package } from "lucide-react";

const ItemCard = ({ item, onSelect }) => {
  const imageUrl = item.images && item.images[0] ? item.images[0] : null;

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
      onClick={() => onSelect(item)}
    >
      {/* Image */}
      <div className="bg-linear-to-br from-gray-100 to-gray-200 h-40 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <Package size={40} className="text-gray-400" />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 truncate">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 truncate mt-1">
          {item.description}
        </p>

        {/* Category and Condition */}
        <div className="flex items-center gap-2 my-2 text-xs">
          <Tag size={12} className="text-gray-500" />
          <span className="text-gray-600">{item.category}</span>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
            {item.condition}
          </span>
        </div>

        {/* Price and Mode */}
        <div className="flex items-center justify-between">
          <div>
            {item.price > 0 ? (
              <span className="text-lg font-bold text-blue-600">
                ₹{item.price}
              </span>
            ) : (
              <span className="text-lg font-bold text-green-600">
                Free
              </span>
            )}
          </div>
          <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-700">
            {item.mode}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
