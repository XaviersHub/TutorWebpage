import React from "react";
import "../components/styles/Login.css";
import { Link } from "react-router-dom";
import WelcomeSection from "../components/WelcomeSection"

const LoginMain = () => {
    return(
        <div className="login-container">
              <div className="login-box">
                {/* Sign-in Section */}
                <div className="signin-section">
                  <h2 className="signin-title">SELECT LOGIN TYPE</h2>
                  <div className="">
                  <Link to="/StudentLogin">  
                  <button className="student-login-button">
                    - Student Login -
                  </button>
                  </Link> 
                  <p className="signup-text">Don't have a STUDENT account yet?</p>
                        <Link to="/StudentSignUp" className="signup-link">
                          Sign up
                        </Link>
                  </div>
                  <Link to="/TutorLogin">
                  <button className="tutor-login-button">
                    - Tutor Login -
                  </button>
                  </Link>
                  <p className="signup-text">Don't have a TUTOR account yet?</p>
                        <Link to="/TutorSignUp" className="signup-link">
                          Sign up
                        </Link>
                  </div>
                </div>
        
                {/* Welcome Section */}
                <WelcomeSection>
                </WelcomeSection>
                </div>
          );
        };
        
        export default LoginMain;
        
     
