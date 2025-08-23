import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserPlus, User, Mail, Lock } from "lucide-react";

const Signup: React.FC = () => {
  const onNavigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    FirstName: "",
    LastName: "",
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
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.FirstName ||
      !formData.LastName
    ) {
      setMessage("All fields are required");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/sign-up",
        formData
      );

      if (response.status === 201) {
        setMessage("Account created successfully! You can now log in.");
        setMessageType("success");

        // Clear form
        setFormData({
          username: "",
          email: "",
          password: "",
          FirstName: "",
          LastName: "",
        });

        // Optional: Navigate to login
        // setTimeout(() => onNavigate("/login"), 2000);
      }
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data || "Signup failed");
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
          <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Join Us</h2>
          <p className="text-gray-600">Create your account to get started</p>
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
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label
                htmlFor="FirstName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="FirstName"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleInputChange}
                  className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-gray-50 focus:bg-white text-sm"
                  placeholder="First"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="LastName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="LastName"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleInputChange}
                  className="w-full pl-9 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-gray-50 focus:bg-white text-sm"
                  placeholder="Last"
                  required
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-gray-50 focus:bg-white"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-gray-50 focus:bg-white"
                placeholder="Choose a username"
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-gray-50 focus:bg-white"
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Navigation Buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => onNavigate("/")}
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Back to Login
          </button>

          <div className="text-center">
            <span className="text-gray-600">Already have an account? </span>
            <button
              onClick={() => onNavigate("/login")}
              className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
