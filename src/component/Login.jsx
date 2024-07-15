import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:1620/user-login", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userRegister");
                if (data.message.includes("Login success")) {
                    window.localStorage.setItem("user", JSON.stringify(data.data));
                    window.localStorage.setItem("token", data.token);
                    window.localStorage.setItem("loggedIn", true);
                    // navigateto('/form');
                    window.location.href=('form')
                }
            });
    };
    const navigateto = useNavigate()

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                    <h3 style={{ color: "white" }}>LOGIN</h3>
                    <br />

                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
<p>Don't have an account <span style={{color:"blue" , cursor:"pointer"}}  onClick={() => navigateto("/signup")}>Signup</span></p>
                    <div className="d-grid" style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                        <button type="submit" className="btn btn-danger" style={{ width: "180px" }}>
                            LOGIN
                        </button>
                    </div>
                 
                </form>
            </div>
        </div>
    );
}