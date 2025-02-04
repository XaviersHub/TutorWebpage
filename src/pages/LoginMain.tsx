import React from "react";
import "../components/styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import WelcomeSection from "../components/WelcomeSection";

const LoginMain = () => {
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <button
        className="btn btn-secondary back-button"
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ⬅ Back
      </button>
      <div className="login-box">
        {/* Sign-in Section */}
        <div className="signin-section2">
          <h2 className="signin-title">SELECT LOGIN TYPE</h2>
          <div className="">
            <Link to="/StudentLogin">
              <button className="student-login-button">
                - Student Login -
              </button>
            </Link>
            <div className="signup-text">
              Don't have a STUDENT account yet?
              <Link to="/StudentSignUp" className="signup-link">
                {" "}
                Sign up
              </Link>
            </div>
          </div>
          <Link to="/TutorLogin">
            <button className="tutor-login-button">- Tutor Login -</button>
          </Link>
          <div className="signup-text">
            Don't have a TUTOR account yet?
            <Link to="/TutorSignUp" className="signup-link">
              Sign up
            </Link>
          </div>
        </div>
        <WelcomeSection></WelcomeSection>
      </div>
    </div>
  );
};

export default LoginMain;
