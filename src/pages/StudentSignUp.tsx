import React from "react";
import "../components/styles/Login.css";

const StudentSignUp = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        {/* Sign-in Section */}
        <div className="signin-section">
          <h2 className="signin-title">Register as a STUDENT</h2>
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
          <div className="input-group">
            <label className="input-label">Subjects</label>
            <input
              type="subjects"
              className="input-field"
              placeholder="Enter your Subjects"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Levels</label>
            <input
              type="levels"
              className="input-field"
              placeholder="Enter your Levels"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Location</label>
            <input
              type="location"
              className="input-field"
              placeholder="Enter your Location"
            />
          </div>
          <button className="login-button">
            SIGN UP
          </button>
        </div>

        {/* Welcome Section */}
        <div className="welcome-section">
          <h2 className="welcome-title"></h2>
        </div>
      </div>
    </div>
  );
};

export default StudentSignUp;
