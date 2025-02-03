import React from "react";
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";
import HeaderSection from "../components/HeaderSection";
import AboutUs from "../pages/AboutUs";
import "../components/styles/HeaderSec.css";

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <div
        className="d-flex justify-content-between"
        style={{ backgroundColor: "#B2D8E9" }}
      >
        {/* <SearchBar /> */}
        <h2 className="title" style={{ fontSize: "60px", fontWeight: "bold", marginTop:"5px", marginRight:"120px" }}>TutorGo</h2>
        <img src="/images/logo.png" alt="Picture" className="logo-image pill" />
        <AccountWidget />
      </div>
      <NavBar />
      <HeaderSection />
    </div>
  );
};

export default HomePage;
