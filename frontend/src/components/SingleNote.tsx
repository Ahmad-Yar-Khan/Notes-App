import React from "react";
import { ArrowLeft, Calendar, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Note {
  id: string;
  title: string;
  noteText: string;
  date: string | Date;
  status: string | boolean;
}

interface SingleNoteProps {
  note: Note;
  onBack: () => void;
}

const SingleNote: React.FC<SingleNoteProps> = ({ note, onBack }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string | Date) => {
    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle back navigation - can use either the onBack prop or navigate to view-notes
  const handleBack = () => {
    if (onBack) {
      onBack(); // Use the callback if provided (for modal-style navigation)
    } else {
      navigate("/view-notes"); // Fallback to router navigation
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Notes
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{note.title}</h1>
            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  note.status === "completed" || note.status === false
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {note.status === "completed" || note.status === false ? (
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Completed
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Pending
                  </div>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center text-gray-600 mb-6">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(note.date)}
          </div>

          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {note.noteText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNote;
