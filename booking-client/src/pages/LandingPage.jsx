import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="row landing">
      <div className="col-md-12 text-center">
        <div className="landing-title">
          <h2 style={{ color: "white", fontSize: "130px" }}>Beautyful Stay</h2>
        </div>

        <h1 style={{ color: "white" }}>
          “Courteous treatment will make a customer a walking advertisement.”
        </h1>
        <Link to="/home">
          <button
            className="btn landing-btn"
            style={{ color: "white", backgroundColor: "black" }}>
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
