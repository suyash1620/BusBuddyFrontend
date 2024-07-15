import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Appbar = () => {
  const [logintoken] = useState(localStorage.getItem("token"));
  const loginav = useNavigate();
  const logout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn")
    window.location.href = "/login";
  };

  return (
    
    <div>
      <ul style={{listStyle:"none"}}>
        <li><NavLink to="/home"></NavLink></li>
        <li><NavLink to="/form"></NavLink></li>
        <li><NavLink to="/list"></NavLink></li>
        <li><NavLink to="/signup"></NavLink></li>
        <li><NavLink to="/login"></NavLink></li>
      </ul>
      {!logintoken && (
                <span onClick={()=>loginav("/login")} style={{ fontSize:"18px", cursor:"pointer" }}>Please Login First</span>
              )}
              {logintoken ? (
                <button onClick={logout} className="logoutbtn">Logout </button>
              ) : (
                ""
              )}
    </div>
  );
};

export default Appbar;
