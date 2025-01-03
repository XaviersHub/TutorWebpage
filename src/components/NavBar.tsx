import React from "react";
import "./styles/Navbar.scss";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav
      className="navbar navbar-expand-lg bar-alignment"
      style={{ backgroundColor: "#BDEDF2" }}
    >
      <div className="container-fluid navbarSize">
        {/* Email Section */}
        <div className="d-flex align-items-center">
          <a href="mailto:support@example.com" className="nav-link active">
            📧 Email
          </a>
        </div>

        {/* Center Navigation Links */}
        <div className="navbar-nav mx-auto">
          <Link to="/" className="nav-link active">
            HOME
          </Link>
          <Link to="/about" className="nav-link active">
            ABOUT US
          </Link>
          <Link to="/contact" className="nav-link active">
            CONTACT
          </Link>
          <Link to="/faqs" className="nav-link active">
            FAQS
          </Link>
          <Link to="/reviews" className="nav-link active">
            REVIEWS
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="d-flex">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link active socialMed"
          >
            <img src="/images/meta.png" className="widget-size" alt="Meta" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link active socialMed"
          >
            <img src="/images/IG.png" className="widget-size" alt="Instagram" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link active socialMed"
          >
            <img
              src="/images/linkedin.png"
              className="widget-size"
              alt="LinkedIn"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
