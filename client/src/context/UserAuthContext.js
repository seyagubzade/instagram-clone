import React, { createContext, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";

// Create the Auth Context
const AuthContext = createContext();

// Create the Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem("authUser"))?.token || false);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("authUser"))?.user || null);

  const { data } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Test>>>>",data)
    console.log("AuthContext user data>>>>>",userData)
    setIsAuthenticated((JSON.parse(localStorage.getItem("authUser"))?.token) || false);
    setUserData(JSON.parse(localStorage.getItem("authUser"))?.user || null)
    console.log("AuthContext user BEzdim>>>>>",isAuthenticated)
  }, [data]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData }}>
      {children}
    </AuthContext.Provider>
  );  
};

// Custom hook to use the Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
