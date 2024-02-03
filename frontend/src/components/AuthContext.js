import { createContext, useContext, useState } from "react";
import Avatar from "../assets/images/avatar.png";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user] = useState({
    id: localStorage.getItem("id"),
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    fullname: localStorage.getItem("fullname"),
    gender: localStorage.getItem("gender"),
    dateOfBirth: localStorage.getItem("dateOfBirth"),
    phone: localStorage.getItem("phone"),
    address: localStorage.getItem("address"),
    image: Avatar,
  });
  
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
