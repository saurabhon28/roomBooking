import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const registerHandle = async (e) => {
    e.preventDefault();
    if (password == cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };

      try {
        const result = await axios.post(
          "http://localhost:5000/api/register",
          user
        );

        console.log(result);
      } catch (error) {
        console.log(error);
      }

      setName("");
      setEmail("");
      setPassword("");
      setCpassword("");
      console.log(user);
    } else {
      alert("password and confirn password should be same");
    }
  };
  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div className="bs">
            <h2>Register</h2>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter Name"
            />
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
            <input
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Confirm Password"
            />
            <button onClick={registerHandle} className="btn btn-primary mt-3">
              Register
            </button>
            <p className="mt-1">
              If already have account?<Link to={"/login"}>Click here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
