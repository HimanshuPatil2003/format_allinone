import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialState = {
  user: null,
  isAuthenticated: false,
};

// any dispatch function on this page will change this global object only
const UserContext = createContext(); // similar to user provider, make data accessible globally
function reducer(state, action) {
  switch (action.type) {
    //MAIN authenticating user for global user
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}
const UserProvider = ({ children }) => {
  //dispatch-> sending 2 things, action & data || a method in useReducer
  const [{ user, isAuthenticated }, dispatch] = useReducer( // main function for global access
    reducer,
    initialState
  );





  //main logic for login     form->Login.jsx (login)-> UserCOntext(login)-> backend (/user/login)-> if exist res OK-> setToken

  async function login(email, password) {
    const userData = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        userData
      );
      
      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token); 
        toast.success(response.data.message);
        dispatch({ type: "login", payload: userData }); // 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("An error occurred while registering. Please try again.");
    }
  }

  // 
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };


// for login and logout facility 
