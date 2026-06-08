import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const checkTokenExpiration = (token) => {
    if (!token) {
      return true;
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Invalid token:", error);
      return true;
    }
  };

//   const getEmail = (token) => {
//     if (!token) {
//       return null;
//     }

//     try {
//       const decodedToken = jwtDecode(token);
//       return decodedToken.email;
//     } catch (error) {
//       console.error("Invalid token:", error);
//       return null;
//     }
//   };

//   const getUserId = (token) => {
//     if (!token) {
//       return null;
//     }

//     try {
//       const decodedToken = jwtDecode(token);
//       return decodedToken.userId;
//     } catch (error) {
//       console.error("Invalid token:", error);
//       return null;
//     }
//   };

//   const getRole = (token) => {
//     if (!token) {
//       return null;
//     }

//     try {
//       const decodedToken = jwtDecode(token);
//       return decodedToken.role;
//     } catch (error) {
//       console.error("Invalid token:", error);
//       return null;
//     }
//   };

  const decodeJWTToken = (token) => {
    if (!token) {
      return null;
    }

    try {
      const decodedToken = jwtDecode(token);
      sessionStorage.clear();
      sessionStorage.setItem("token", token);
      const { userId, userName, role, email } = decodedToken; 
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("email", email);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  };

  const isAuthenticated = () => {
    const token = sessionStorage.getItem("token");

    if (checkTokenExpiration(token)) {
      sessionStorage.removeItem("token");
      navigate("/");
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ decodeJWTToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
