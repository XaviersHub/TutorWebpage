import React from "react";
import { Link } from "react-router-dom";
import "./styles/HeaderSec.css";

const AccountWidget: React.FC = () => {
  return (
    <div
      className="d-flex justify-content-end align-items-center p-2"
      style={{ backgroundColor: "#B2D8E9" }}
    >
      <Link to="/LoginMain" className="nav-link accountwidget">
        Sign up/Log in
      </Link>
    </div>
  );
};

export default AccountWidget;
