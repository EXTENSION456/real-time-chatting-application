import { useUser } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const AuthRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userInfo } = useUser();

  useEffect(() => {
    if (userInfo !== undefined) {
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return children;
};




