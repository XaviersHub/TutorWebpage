import React from "react";
import "./styles/HeaderSec.css";
import { Link } from "react-router-dom";

const HeaderSection: React.FC = () => {
  return (
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="hero_title">
            Find A Tutor <strong>You</strong> Can Trust
          </h1>
          <div className="d-flex mt-3">
            {/* React Router Links */}
            <Link to="/find-tutor" className="btn btn-primary me-2 buttonsize">
              <div className="textsize">Find a Tutor</div>
            </Link>
            <Link to="/loginmain" className="btn btn-success buttonsize">
              <div className="textsize">Become a Tutor</div>
            </Link>
          </div>
        </div>

        <div className="col-md-6">
          <img
            src="/images/studyguy.jpg"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
