import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRequireAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null;
};
