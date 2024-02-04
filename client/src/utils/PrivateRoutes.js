import { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";

const PrivateRoutes = () => {
//   let auth = { token: false };
  const { isAuthenticated, setIsAuthenticated, userData } = useAuth();
  const navigate = useNavigate();

  

  useEffect(() => {
    // navigate("/")
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
