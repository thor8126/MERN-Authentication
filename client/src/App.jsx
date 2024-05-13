import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("jwtToken");
      const expiration = localStorage.getItem("tokenExpiration");
      const user = localStorage.getItem("user");

      if (token && expiration) {
        const tokenExpiration = new Date(expiration);
        if (tokenExpiration > new Date()) {
          setUser(JSON.parse(user));
          const remainingTime = tokenExpiration - new Date();
          setTimeout(checkTokenExpiration, remainingTime);
        } else {
          setUser(null);
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("tokenExpiration");
          localStorage.removeItem("user");
        }
      }
    };

    // Initial check
    checkTokenExpiration();
  }, [setUser]);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </>
  );
}
