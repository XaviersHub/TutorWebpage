import React from "react";
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";
import HeaderSection from "../components/HeaderSection";
import "../components/styles/HeaderSec.css";

const HomePage: React.FC = () => {
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
      <HeaderSection />
    </div>
  );
};

export default HomePage;
