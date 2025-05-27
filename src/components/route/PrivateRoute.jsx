import { useUser } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userInfo } = useUser();

  useEffect(() => {
    if (userInfo === undefined) {
      console.log("navigating into auth");
      navigate("/auth");
    } else if (!userInfo?.firstName || !userInfo?.lastName) {
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return children;
};
