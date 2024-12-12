import { createContext, useState } from "react";

const loggedInlocal = localStorage.getItem("loggedIn")

export const LoginContext = createContext()

export const LoginProvider = ({children}) =>{

  const [isLoggedin, setLoggedin] = useState(loggedInlocal=='true'?true:false);
  const [role, setRole] = useState("");
  

  function login(userRole) {
    localStorage.setItem("loggedIn", "true")
    setLoggedin(true);
    setRole(userRole);
    
  }

  function logout() {
    localStorage.setItem("loggedIn", "false")
    setLoggedin(false);
    setRole("");    
  }  

  return(
    <LoginContext.Provider value={{loggedIn: isLoggedin, role, login, logout}}>
      {children}
    </LoginContext.Provider>
  )

}

