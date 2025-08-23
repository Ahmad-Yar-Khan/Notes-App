import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../utils/AuthProvider.tsx";
import { LogIn, User, Lock } from "lucide-react";

interface MyJwtPayload {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setIsUserLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.password) {
      setMessage("Username and password are required");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);

        const decoded = jwtDecode<MyJwtPayload>(response.data.token);

        // update global context here
        setUser(decoded);
        setIsUserLoggedIn(true);

        localStorage.setItem("userInfo", JSON.stringify(decoded));

        setMessage("Login successful! Redirecting...");
        setMessageType("success");

        setTimeout(() => navigate("/home"), 1500);
      }
    } catch (error: any) {
      if (error.response) {
        // Handle specific error messages from backend
        const errorMessage = error.response.data.error || "Login failed";
        setMessage(errorMessage);
      } else {
        setMessage("Network error. Please try again.");
      }
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 w-full max-w-md p-8">
        {/* Header with Icon */}
        <div className="text-center mb-8">
          <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-xl mb-6 text-center font-medium ${
              messageType === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50 focus:bg-white"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Navigation Buttons */}
        <div className="mt-8 space-y-3">
          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <button
              onClick={() => navigate("/signup")}
              className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
