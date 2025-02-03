import React from "react";
import "../components/styles/Login.css";
import { Link } from "react-router-dom";

const WelcomeSection = () => {
    return(
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
  </div>
    );
};
export default WelcomeSection;
