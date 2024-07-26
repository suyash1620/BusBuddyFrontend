import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:1620/sign-up", {
        name,
        email,
        password,
        contact,
      });

      console.log(response.data, "userRegister");

      if (response.data.message.includes("SignUp Successful")) {
        window.location.href = "login";
      } else {
        alert("Invalid Data");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong");
    }
  };

  const navigateto = useNavigate();
  return (
    <div className="auth-wrapper">
      <div className="auth-inne">
        <form onSubmit={handleSubmit}>
          <h3 style={{ color: "white", textAlign: "center" }}>Sign Up</h3>
          <br />

          <div className="mb-3">
            <input
              type="text"
              style={{width:"250px"}}
              className="form-control"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              style={{width:"250px"}}
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              style={{width:"250px"}}
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              style={{width:"250px"}}
              className="form-control"
              placeholder="Enter Contact No."
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div
            className="d-grid"
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
          <p style={{color:"white"}}> 
              Already have an account
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => navigateto("/login")}
              > 
                Login
              </span>
            </p> 
            
           
          </div>
          
          <button
              type="submit"
              
              className="btn btn-danger"
              style={{ width: "100px", marginLeft:"5rem"}}
            >
              SIGN UP
            </button>
        </form>
        <br />
      </div>
    
    </div>
  );
}
