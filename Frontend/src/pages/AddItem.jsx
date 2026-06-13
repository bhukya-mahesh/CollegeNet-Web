import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import { createItem } from "../services/api";

const AddItem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Books",
    mode: "Sell",
    price: "",
    condition: "New",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews([reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const removeImage = () => {
    setImagePreviews([]);
    setImageFile(null);
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      if (!formData.title || !formData.description || !imageFile) {
        alert("Please fill all required fields and upload an image!");
        return;
      }
      
      const submitFormData = new FormData();
      submitFormData.append('title', formData.title);
      submitFormData.append('description', formData.description);
      submitFormData.append('category', formData.category);
      submitFormData.append('mode', formData.mode);
      submitFormData.append('price', formData.price || 0);
      submitFormData.append('condition', formData.condition);
      submitFormData.append('image', imageFile);

      const data = await createItem(submitFormData);
      alert("Item listed successfully!");
      // Reset form after success
      setFormData({
        title: "",
        description: "",
        category: "Books",
        mode: "Sell",
        price: "",
        condition: "New",
      });
      setImageFile(null);
      setImagePreviews([]);
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">List Your Item</h1>
        <p className="text-gray-500 text-sm mt-1">
          Share your item with the college community
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Item Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Advanced Physics Textbook"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Product Images */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Product Images *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload size={32} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </span>
              </label>
            </div>

            {imagePreviews.length > 0 && (
              <div className="mt-4">
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={imagePreviews[0]}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Product Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the item condition, features, and reason for selling..."
              rows="5"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option>Books</option>
              <option>Electronics</option>
              <option>Sports</option>
              <option>Stationery</option>
              <option>Clothing</option>
              <option>Furniture</option>
              <option>Musical Instruments</option>
              <option>Kitchen</option>
              <option>Other</option>
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Condition *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  value="New"
                  checked={formData.condition === "New"}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">New</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  value="Used"
                  checked={formData.condition === "Used"}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Used</span>
              </label>
            </div>
          </div>

          {/* Mode */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              What do you want to do? *
            </label>
            <select
              name="mode"
              value={formData.mode}
              onChange={handleInputChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option>Sell</option>
              <option>Rent</option>
              <option>Give Away</option>
            </select>
          </div>

          {/* Price Section */}
          {formData.mode === "Sell" && (
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price in rupees"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                required={formData.mode === "Sell"}
              />
            </div>
          )}

          {formData.mode === "Rent" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Price per Day (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 100"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  required={formData.mode === "Rent"}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Rental Period (days) *
                </label>
                <input
                  type="number"
                  placeholder="e.g., 7"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button onClick={handleSubmit}
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
            >
              List Item
            </button>
            <button
              type="button"
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
