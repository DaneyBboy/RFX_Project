import { createContext, useState, useEffect } from "react";

// Check localStorage for loggedIn and role when the component mounts
const loggedInlocal = localStorage.getItem("loggedIn");

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  // Initialize state based on localStorage values
  const [isLoggedin, setLoggedin] = useState(loggedInlocal==='true'?true:false);
  
  // Use a function to initialize the role from localStorage
  const [role, setRole] = useState(() => {
    const savedRole = localStorage.getItem("role");
    return savedRole || ""; // Default to empty string if no role is found
  });

  // Persist the loggedIn and role to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("loggedIn", isLoggedin.toString());
  }, [isLoggedin]);

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role); // Store role if it exists
    } else {
      localStorage.removeItem("role"); // Remove role if it's cleared
    }
  }, [role]);

  // Function to handle login
  function login(userRole) {
    setLoggedin(true);
    setRole(userRole);
  }

  // Function to handle logout
  function logout() {
    setLoggedin(false);
    setRole(""); // Clear role on logout
  }

  return (
    <LoginContext.Provider value={{ loggedIn: isLoggedin, role, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
