import React from "react";
import "./styles/HeaderSec.css";
import { Link } from "react-router-dom";




const HeaderSection: React.FC = () => {
  return (
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="hero_title">
          <strong> Find A Tutor <br />
            <strong><u>You</u></strong>
            <br /> Can Trust</strong>
          </h1>
          <br ></br>

        
          <div className="buttoncontainer d-flex custom-margin ps-0">
           
            <Link to="/find-tutor" className="btn btn-primary me-2 buttonsize">
              <div className="textsize">Find a Tutor</div>
            </Link>
            <Link to="/TutorSignUp" className="btn btn-success buttonsize">
              <div className="textsize">Become a Tutor</div>
            </Link>
          </div>
        </div>

        <div className="custom-image-container col-md-6">
          <img src="/images/tutor.jpg" alt="Picture" className="custom-image rounded" />
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
