import React, { useState } from "react";
import axios from "axios";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4545/api";
  

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      setLoading(true);
      setError("");
      setMessage("");
      const response = await axios.post(
        `${API_URL}/auth/send-reset-otp`,
        { email }
      );

      if (response.data.success) {
        setMessage("OTP sent successfully");

        setTimeout(() => {
          navigate("/reset-password", {
            state: { email },
          });
        }, 1000);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
            <Mail className="text-white" size={28} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-slate-900">
          Forgot Password
        </h2>

        <p className="text-center text-slate-500 text-sm mt-2">
          Enter your email address to receive a reset OTP
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="your.email@college.edu"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {message && (
            <p className="text-green-600 text-sm text-center">
              {message}
            </p>
          )}

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
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading
              ? "Sending OTP..."
              : "Send Reset OTP"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline font-medium"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;