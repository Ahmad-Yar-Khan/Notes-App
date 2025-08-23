import Home from "./components/Home";
import AddNote from "./components/AddNote";
import ViewNotes from "./components/ViewNotes";
import Signup from "./components/Signup";
import Login from "./components/Login";

import { useEffect } from "react";

import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/AuthProvider";

function App() {
  useEffect(() => {}, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/view-notes" element={<ViewNotes />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
