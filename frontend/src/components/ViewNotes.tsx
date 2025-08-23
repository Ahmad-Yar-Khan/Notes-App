import React, { useState, useEffect } from "react";
import { ArrowLeft, PlusCircle, FileText, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SingleNote from "./SingleNote";

interface Note {
  id: string;
  title: string;
  noteText: string;
  date: Date; // store as Date object
  status: "pending" | "completed";
}

const ViewNotes: React.FC = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("authToken"); // wherever you saved the JWT

      const response = await fetch("http://localhost:3000/api/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 👈 Send token here
        },
      });

      if (response.ok) {
        const data = await response.json();

        const transformedNotes: Note[] = data.map((note: any) => ({
          id: note.id,
          title: note.title,
          noteText: note.noteText,
          status: note.status === true ? "pending" : "completed",
          date: new Date(note.date),
        }));

        setNotes(transformedNotes);
      } else {
        console.error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (selectedNote) {
    return (
      <SingleNote note={selectedNote} onBack={() => setSelectedNote(null)} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>

          <button
            onClick={() => navigate("/add-note")}
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Note
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Notes</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No notes found</p>
            <p className="text-gray-500 mt-2">
              Create your first note to get started
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {notes.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 cursor-pointer group hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                      {note.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {note.noteText.length > 150
                        ? `${note.noteText.substring(0, 150)}...`
                        : note.noteText}
                    </p>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(note.date)}
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        note.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {note.status === "completed" ? "Completed" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewNotes;
