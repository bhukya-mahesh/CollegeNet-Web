import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4545/api";

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    otp: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await axios.post(
        `${API_URL}/auth/resetpassword`,
        formData
      );

      if (response.data.success) {
        setMessage("Password reset successfully");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center">
            <Lock className="text-white" size={28} />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-slate-900">
          Reset Password
        </h2>

        <p className="text-center text-slate-500 text-sm mt-2">
          Enter your OTP and create a new password
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@college.edu"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* OTP */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              OTP
            </label>

            <input
              type="text"
              name="otp"
              required
              maxLength={6}
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter 6-digit OTP"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              New Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                required
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Success */}
          {message && (
            <p className="text-green-600 text-sm text-center">
              {message}
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-2 rounded-lg transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading
              ? "Resetting Password..."
              : "Reset Password"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Back to{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer hover:underline font-medium"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;