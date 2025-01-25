import React from "react";
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";
import "../components/styles/HeaderSec.css";
import ContactForm from "../components/ContactForm";
import Chatbot from "../components/ChatBot";

const Contact = () => {
  return (
    <div>
      <div
        className="d-flex justify-content-between"
        style={{ backgroundColor: "#BDEDF2" }}
      >
        <SearchBar />
        <AccountWidget />
      </div>
      <NavBar />
      <div className="container mt-4">
        <div className="Contact card-title">
          <strong>Contact Information</strong>
          <div className="Contact-info cards">
            <div>
              <strong>Email Address:</strong>
              <a href="mailto:tutorapp533@gmail.com">Mail to here</a>
            </div>
            <div>
              <strong>Phone Number:</strong>
              <a href="tel:12345678">12345678</a>
            </div>
            <div className="d-flex align-items-center text-alignment">
              <strong>Social Media Links:</strong>
              <div className="social-container">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link active socialMed"
                >
                  <img
                    src="/images/meta.png"
                    className="widget-size"
                    alt="Meta"
                  />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link active socialMed"
                >
                  <img
                    src="/images/IG.png"
                    className="widget-size"
                    alt="Instagram"
                  />
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
          </div>
        </div>
        <div className="Contact-form card-title">
          <strong>Contact Form</strong>
          <div className="Contact-info cards">
            <ContactForm />
          </div>
        </div>
        <div>
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default Contact;
