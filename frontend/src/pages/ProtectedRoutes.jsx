import React, { useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";

// anything written b/w <ProtectedRoute> here </ProtectedRoute> is children
export default function ProtectedRoute({ children }) {
  const { user, setUser } = useUserContext(); // user data
  console.log(user);
  const navigate = useNavigate(); // redirect anywhere

  const getUser = async () => {
    try {
      const res = await axios.post(
        // api call to backend route /get-user in routes which will authenticate and send user data
        "http://localhost:8000/user/get-user",
        {
          token: localStorage.getItem("token"), // getting token already stored in localstorage
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setUser(res.data.data); 
      } else {
        // if no user found in db with same token goto login
        navigate("/login");
        localStorage.clear();
      }
    } catch (error) {
      localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, setUser, navigate]);

  if (localStorage.getItem("token")) {

    // upar ki puri kahani sirf user authenticate karne ke liye,  agar hogya to component show kar denge
    return children;
  } else {
    // anyatha fir se login karenge
    return <Navigate to="/login" />;
  }
}
