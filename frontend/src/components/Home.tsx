import React from "react";
import { PlusCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider.tsx";
import LogoutButton from "./Logout";

const Home: React.FC = () => {
  const onNavigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Top-right logout */}
        <div className="flex justify-end mb-6">
          <LogoutButton />
        </div>

        {/* Centered welcome */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome {user.firstName + " " + user.lastName}
          </h1>
          <p className="text-gray-600">Organize your thoughts beautifully</p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div
            onClick={() => onNavigate("/add-note")}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 cursor-pointer group hover:-translate-y-1"
          >
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
                <PlusCircle className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Add New Note
              </h2>
              <p className="text-gray-600">
                Create a new note to capture your ideas
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate("/view-notes")}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 cursor-pointer group hover:-translate-y-1"
          >
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                View Notes
              </h2>
              <p className="text-gray-600">
                Browse and manage your existing notes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
