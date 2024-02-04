import React, { createContext, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

// Create the Auth Context
const AuthContext = createContext();

// Create the Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("authToken")) || false
  );
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("mainUser")) || null
  );
  const [mainUserId, setMainUserId] = useState(
    JSON.parse(localStorage.getItem("mainUser"))?._id || null
  );
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("AuthContext user data>>>>>", userData);
    setIsAuthenticated(JSON.parse(localStorage.getItem("authToken")) || false);
    setUserData(JSON.parse(localStorage.getItem("mainUser")) || null);
  }, [data, dispatch]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userData, mainUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
