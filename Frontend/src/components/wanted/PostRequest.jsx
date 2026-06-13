import React, { useRef, useState } from "react";
import {
  X,
  Upload,
  Smartphone,
  Sofa,
  Shirt,
  BookOpen,
  Dumbbell,
  Utensils,
  Wrench,
  Package,
  Tag,
  Gift,
  IndianRupee
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostRequest = ({ onClose }) => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("any");
  const [urgency, setUrgency] = useState("medium");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [condition, setCondition] = useState("Any Condition");
  const [expiryDate, setExpiryDate] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [maxPrice, setMaxPrice] = useState("");

  const categories = [
    { name: "Electronics", icon: Smartphone },
    { name: "Furniture", icon: Sofa },
    { name: "Clothing", icon: Shirt },
    { name: "Books", icon: BookOpen },
    { name: "Sports", icon: Dumbbell },
    { name: "Kitchen", icon: Utensils },
    { name: "Tools", icon: Wrench },
    { name: "Other", icon: Package },
  ];

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handlePostRequest = async () => {
  try {
    if (!title || !description || !category) {
      alert("Please fill in all required fields");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("budget", budget);
    formData.append("urgency", urgency);
    formData.append("quantity", quantity);
    formData.append("condition", condition);
    formData.append("expiryDate", expiryDate);
    formData.append("maxPrice", maxPrice);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const { data } = await axios.post(
      "http://localhost:4545/api/wanted",
      formData,
      {
    withCredentials: true,
  }
    );

    if (data.success) {
      alert("Request Posted Successfully");
      navigate("/wanted");
    }
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to post request"
    );
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl max-h-[85vh] rounded-xl shadow-xl flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h2 className="text-xl font-semibold">
            Post What You Need
          </h2>

          <button onClick={() => navigate('/wanted')}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Title *
            </label>

            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description *
            </label>

            <textarea
              rows="4"
              placeholder="Describe what you need and why..."
              className="w-full border rounded-lg px-4 py-2 text-sm resize-none outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Category *
            </label>

            <div className="grid grid-cols-4 gap-3">
              {categories.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.name}
                    onClick={() => setCategory(item.name)}
                    className={`border rounded-lg p-4 flex flex-col items-center gap-2 transition
                    ${
                      category === item.name
                        ? "border-blue-500 bg-blue-50"
                        : "hover:border-gray-400"
                    }`}
                  >
                    <Icon size={20} />

                    <span className="text-sm">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upload */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Reference Image (Optional)
            </label>

            <button
              onClick={() => fileInputRef.current.click()}
              className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50"
            >
              <Upload
                size={24}
                className="text-gray-400"
              />

              <span className="text-sm mt-2 text-gray-500">
                Add Image
              </span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />

            <p className="text-xs text-gray-500 mt-2">
              Add an image of what you're looking for
            </p>

            {image && (
              <img
                src={image}
                alt=""
                className="w-32 h-32 object-cover rounded-lg mt-3"
              />
            )}
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Budget
            </label>

            <div className="grid grid-cols-3 gap-3">

              <button
                onClick={() => setBudget("any")}
                className={`border rounded-lg p-4 text-center
                ${
                  budget === "any"
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
              >
                <Tag
                  size={20}
                  className="mx-auto mb-2"
                />

                <h4 className="font-medium text-sm">
                  Any
                </h4>

                <p className="text-xs text-gray-500 mt-1">
                  Open to any price
                </p>
              </button>

              <button
                onClick={() => setBudget("free")}
                className={`border rounded-lg p-4 text-center
                ${
                  budget === "free"
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
              >
                <Gift
                  size={20}
                  className="mx-auto mb-2"
                />

                <h4 className="font-medium text-sm">
                  Free Only
                </h4>

                <p className="text-xs text-gray-500 mt-1">
                  Looking for free items
                </p>
              </button>

                <button
                    type="button"
                     onClick={() => setBudget("max")}
                   className={`border rounded-lg p-4 text-center ${
                      budget === "max"
                   ? "border-blue-500 bg-blue-50"
                     : ""
                    }`}
                   >
                <IndianRupee size={20} className="mx-auto mb-2" />

                <h4 className="font-medium text-sm">
                  Max Price
                </h4>

                <p className="text-xs text-gray-500 mt-1">
                  Set maximum budget
                </p>
              </button>

            </div>
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Urgency
            </label>

            <div className="grid grid-cols-4 gap-2">

              {["low", "medium", "high", "urgent"].map(
                (level) => (
                  <button
                    key={level}
                    onClick={() =>
                      setUrgency(level)
                    }
                    className={`border rounded-lg py-2 text-sm capitalize transition
                    ${
                      urgency === level
                        ? "border-blue-500 bg-blue-50"
                        : ""
                    }`}
                  >
                    {level}
                  </button>
                )
              )}

            </div>
          </div>

          {/* Quantity + Condition */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium mb-2">
                Quantity Needed
              </label>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Preferred Condition
              </label>

              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 text-sm"
              >
                <option>Any Condition</option>
                <option>New</option>
                <option>Like New</option>
                <option>Used</option>
              </select>
            </div>

          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Expiry Date (Optional)
            </label>

            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-sm"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="border-t p-4 flex gap-3">
          <button
            onClick={() => navigate('/wanted')}
            className="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded-lg text-sm font-medium"
          >
            Cancel
          </button>

          <button   onClick={handlePostRequest}
           className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium">
            Post Request
          </button>
        </div>

      </div>
    </div>
  );
};

export default PostRequest;