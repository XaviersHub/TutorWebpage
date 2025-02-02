import React from "react";
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";

const Reviews = () => {
  return (
    <div className="homepage">
      <div
        className="d-flex justify-content-between"
        style={{ backgroundColor: "#B2D8E9" }}
      >
        <SearchBar />
        <h2 className="title" style={{ fontSize: "60px", fontWeight: "bold", marginTop:"15px" }}>TutorGo</h2>
        <AccountWidget />
      </div>
      <NavBar />
    </div>
  );
};

export default Reviews;
