import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../../context/AuthContext'

const Register = () => {
const navigate = useNavigate();
const { checkAuth } = useAuth();

const [showPassword, setShowPassword] = useState(false);

const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
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
    "http://localhost:4545/api/auth/register",
    formData,
    {
      withCredentials: true,
    }
  );

  if (response.data.success) {
     await checkAuth();
    navigate("/verify-email");
  } else {
    setError(response.data.message);
  }
} catch (err) {
  setError(
    err.response?.data?.message ||
    "Registration failed"
  );
} finally {
  setLoading(false);
}


};

return ( <div className="min-h-screen bg-gray-50">
{/* Navbar */} <nav className="bg-white border-b border-gray-200"> <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"> <div className="flex items-center gap-2"> <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"> <span className="text-white font-bold text-sm">C</span> </div>

        <h1 className="text-lg font-bold text-slate-900">
          CollegeNet
        </h1>
      </div>

      <button
        onClick={() => navigate("/login")}
        className="text-slate-600 text-sm hover:text-blue-600"
      >
        Login
      </button>
    </div>
  </nav>

  {/* Register Card */}
  <div className="flex items-center justify-center py-10 px-4">
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

      <div className="flex justify-center mb-6">
        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
          <span className="text-white text-2xl font-bold">C</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center text-slate-900">
        Create Account
      </h2>

      <p className="text-center text-slate-500 text-sm mt-2">
        Join the CollegeNet community
      </p>

      <form
        className="mt-6 space-y-4"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

      <button 
          type="submit"
          disabled={loading}
          className={`w-full text-white text-sm font-semibold py-2 rounded-lg transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </form>

      <p className="text-center text-slate-500 text-sm mt-6">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-600 font-semibold cursor-pointer hover:underline"
        >
          Sign In
        </span>
      </p>
    </div>
  </div>
</div>


);
};

export default Register;
