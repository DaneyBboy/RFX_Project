import { create } from "@mui/material/styles/createTransitions";
import { createContext, useState } from "react";

const loggedInlocal = localStorage.getItem("loggedIn")

export const LoginContext = createContext()

export const LoginProvider = ({children}) =>{

  const [loggedIn, setLoggedin] = useState(loggedInlocal=='true'?true:false);
  

  function login() {
    localStorage.setItem("loggedIn", "true")
    setLoggedin(true);
    
  }

  function logout() {
    localStorage.setItem("loggedIn", "false")
    setLoggedin(false);    
  }  

  return(
    <LoginContext.Provider value={{loggedIn, setLoggedin, login, logout}}>
      {children}
    </LoginContext.Provider>
  )

}

