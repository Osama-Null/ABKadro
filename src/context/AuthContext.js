import React, { createContext, useState } from "react";
import employees from "../data/employees";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Token is the employee's id

  const login = (email, password) => {
    const user = employees.find(
      (emp) => emp.contactInfo.email === email && emp.password === password
    );
    if (user) {
      setToken(user.id); // Set token to user's id
      return user.role; // Return role for navigation
    }
    return null; // Login failed
  };

  const logout = () => {
    setToken(null); // Clear token to log out
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};