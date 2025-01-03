import React from "react";
import "./styles/HeaderSec.css";

const SearchBar: React.FC = () => {
  return (
    <div
      className="d-flex justify-content-start align-items-center searchbarcontainer"
      style={{ backgroundColor: "#BDEDF2" }}
    >
      <input
        type="text"
        placeholder="Search..."
        className="form-control searchbar"
        style={{ maxWidth: "300px" }}
      />
    </div>
  );
};

export default SearchBar;
