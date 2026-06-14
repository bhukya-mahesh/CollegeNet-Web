
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../../context/AuthContext'


const Login = () => {
  const { checkAuth } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4545/api";

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const  [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    const response = await axios.post(
      `${API_URL}/auth/login`,
      formData,
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
       await checkAuth();
      navigate("/");
    } else {
      setError(response.data.message);
    }
  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>

            <h1 className="text-lg font-bold text-slate-900">
              CollegeNet
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
            onClick={() => navigate("/login")}
            className="text-slate-600 text-sm hover:text-blue-600">
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Login Card */}
      <div className="flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">C</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-slate-900">
            Welcome Back
          </h2>

          <p className="text-center text-slate-500 text-sm mt-2">
            Sign in to your CollegeNet account
          </p>

          {/* Form */}
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@college.edu"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
              {/* Error Message */}
              {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
                </p>
              )}

            {/* Button */}
            <button
                 type="submit"
                disabled={loading}
                 className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition"
                 >
               {loading ? "Signing In..." : "Sign In"}
              </button>
          </form>

          {/* Footer */}
          <p className="text-center text-slate-500 text-lg mt-8">
            Don't have an account?{" "}
            <span  
              onClick={() => navigate('/register')}
             className="text-blue-600 font-semibold cursor-pointer hover:underline">
              Sign Up
            </span>
          </p>
          <div className="text-right">
  <span
    onClick={() => navigate("/forgot-password")}
    className="text-sm text-blue-600 cursor-pointer hover:underline"
  >
    Forgot Password?
  </span>
</div>
        </div>
      </div>
    </div>
  );
};

export default Login;