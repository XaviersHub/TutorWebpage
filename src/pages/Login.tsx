import React from "react";
import "../components/styles/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        {/* Sign-in Section */}
        <div className="signin-section">
          <h2 className="signin-title">SIGN IN</h2>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              className="input-field"
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter your password"
            />
          </div>
          <button className="login-button">
            LOGIN
          </button>
        </div>

        {/* Welcome Section */}
        <div className="welcome-section">
          <h2 className="welcome-title">Welcome!</h2>
          <div className="image-group">
            <img
              src="../images/man_teach.png" 
              alt="Teacher"
            />
            <img
              src="../images/woman_teach.png" 
              alt="Students"
            />
          </div>
          <p className="signup-text">Don't have an account yet?</p>
                <Link to="/SignUp" className="signup-link">
                  Sign up
                </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
