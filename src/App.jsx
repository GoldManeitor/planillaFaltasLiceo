import { useState, useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { supabase } from "./supabase/client";
import WebManagerProvider from "./context/WebManager";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }, []);
  return (
    <div className="h-[100vh]">
      <Routes>
        <Route
          path="/"
          element={
            <WebManagerProvider>
              <Home />
            </WebManagerProvider>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
