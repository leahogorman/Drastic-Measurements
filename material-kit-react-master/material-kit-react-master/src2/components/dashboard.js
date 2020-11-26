import React,{useState,useRef, useContext} from "react";
import AuthContext, { AuthProvider } from "./authprovider.js";

function Dashboard(props){
    const auth = useContext(AuthContext);
    const user = auth.user;
      return(
         <h1>Welcome {user ? user.displayName : ""} </h1> 
      )
}

export default Dashboard;