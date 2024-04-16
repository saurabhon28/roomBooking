import React, { useEffect, useState } from "react";

function Navbar() {
  // State to store the welcome message
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    // Retrieve message from local storage
    const message = localStorage.getItem("message");
    // Update state with the message
    if (message) {
      setWelcomeMessage(message);
    }
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  // Function to handle logout
  const handleLogout = () => {
    // Remove token and message from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("message");
    localStorage.removeItem("user");
    // Redirect to login
    window.location.href = "/login";
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <a className="navbar-brand" href="#">
          BEAUTIFUL STAY
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* Conditionally render based on welcomeMessage */}
            {welcomeMessage ? (
              <>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {welcomeMessage}
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton">
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={handleLogout}>
                      Logout
                    </a>
                    <a className="dropdown-item" href="/profile">
                      Profile
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <a className="nav-link" href="/register">
                    REGISTER
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    LOGIN
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
