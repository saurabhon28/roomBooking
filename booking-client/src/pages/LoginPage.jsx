import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandle = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const result = await axios.post("http://localhost:5000/api/login", user);

      if (result.data.success) {
        // Store token in local storage
        localStorage.setItem("token", result.data.token);
        // Store message in local storage
        localStorage.setItem("message", result.data.message);
        //store username email and isAdmin in local storage
        localStorage.setItem("user", JSON.stringify(result.data.data));

        // Redirect to home
        window.location.href = "/home";
      } else {
        // Handle error
        console.error(result);
      }
    } catch (error) {
      console.log(error);
    }

    setEmail("");
    setPassword("");

    console.log(user);
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div className="bs">
            <h2>Login</h2>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Enter Password"
            />

            <button onClick={loginHandle} className="btn btn-primary mt-3">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
