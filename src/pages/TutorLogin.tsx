import React from "react";
import "../components/styles/Login.css";
import { Link } from "react-router-dom";
import WelcomeSection from "../components/WelcomeSection";

const TutorLogin = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        {/* Sign-in Section */}
        <div className="signin-section">
          <h2 className="signin-title">TUTOR SIGN IN</h2>
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
        <WelcomeSection></WelcomeSection>
        </div>
      </div>
  );
};

export default TutorLogin;
