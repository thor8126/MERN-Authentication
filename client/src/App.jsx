import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Importing useSelector and useDispatch hooks
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import { SET_USER } from "./redux/AuthReducer"; // Importing SET_USER action

export default function App() {
  // Get user state from Redux store
  const user = useSelector((state) => state.authReducer.user);
  console.log(user);
  const dispatch = useDispatch(); // Get dispatch function from Redux

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("jwt");
      const expiration = localStorage.getItem("tokenExpiration");
      const storedUser = localStorage.getItem("user");

      if (token && expiration) {
        const tokenExpiration = new Date(expiration);
        if (tokenExpiration > new Date()) {
          const remainingTime = tokenExpiration - new Date();
          setTimeout(checkTokenExpiration, remainingTime);
          // Dispatch SET_USER with storedUser
          dispatch(SET_USER(JSON.parse(storedUser)));
        } else {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("tokenExpiration");
          localStorage.removeItem("user");
          // Dispatch SET_USER with null to clear user
          dispatch(SET_USER(null));
        }
      }
    };

    checkTokenExpiration();
  }, [dispatch]);

  return (
    <>
      <Navbar user={user} /> {/* Pass user directly */}
      <Routes>
        {/* Pass user as prop to components */}
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </>
  );
}
