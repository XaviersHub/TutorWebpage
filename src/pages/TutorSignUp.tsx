import React from "react";
import "../components/styles/Login.css";

const StudentSignUp = () => {
  return (
    <div className="login-container">
      <div className="signup-box">
        {/* Sign-in Section */}
        <div className="signin-section">
          <h2 className="signin-title">Register as a TUTOR</h2>
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
            <label className="input-label">Full Name</label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter your full Name"
            />
          </div>
          <div className="input-group">
            <label className="input-label">NRIC</label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter your NRIC"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Subjects Taught</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="subjects" value="English" className="input-field" /> English
              </label>
              <label>
                <input type="radio" name="subjects" value="Mathematics" className="input-field" /> Mathematics
              </label>
              <label>
                <input type="radio" name="subjects" value="Science" className="input-field" /> Science
              </label>
              <label>
                <input type="radio" name="subjects" value="Humanities" className="input-field" /> Humanities
              </label>
            </div>
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
          <div className="input-group">
            <label className="input-label">Bio/Experience</label>
            <input
              type="Bio"
              className="input-field"
              placeholder="Enter your bio/previous work experience"
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
