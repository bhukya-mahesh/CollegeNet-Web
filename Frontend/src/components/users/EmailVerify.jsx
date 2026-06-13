import React, { useState } from "react";
import axios from "axios";
import { Mail, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const sendOtp = async () => {
    try {
      setSendingOtp(true);
      setError("");
      setMessage("");

      const res = await axios.post(
        "http://localhost:4545/api/auth/sendverifyotp",
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setMessage("Verification OTP sent to your email.");
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to send OTP"
      );
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await axios.post(
        "http://localhost:4545/api/auth/verifyemailotp",
        { otp },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setMessage("Email verified successfully!");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
            <Mail className="text-white" size={28} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-slate-900">
          Verify Your Email
        </h2>

        <p className="text-center text-slate-500 text-sm mt-2">
          Enter the OTP sent to your email address
        </p>

        <button
          onClick={sendOtp}
          disabled={sendingOtp}
          className={`w-full mt-6 py-2 rounded-lg text-white font-medium ${
            sendingOtp
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {sendingOtp ? "Sending OTP..." : "Send OTP"}
        </button>

        <form
          onSubmit={verifyOtp}
          className="mt-5 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Verification OTP
            </label>

            <input
              type="text"
              maxLength={6}
              required
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
              }
              placeholder="Enter 6-digit OTP"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {message && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <ShieldCheck size={18} />
              <span>{message}</span>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading
              ? "Verifying..."
              : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;