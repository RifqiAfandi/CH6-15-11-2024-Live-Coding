import { useEffect, useState } from "react";
import { Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import NotFound from "./pages/404";
import Hello from "./pages/Hello";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <>
      {isAuthenticated && <Navbar onLogout={logout} />}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Homepage /> : <Navigate to="/login/" />}
        ></Route>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route path="/hello" element={<Hello />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}
export default App;
