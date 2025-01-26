import React from "react";
import "./styles/HeaderSec.css";

const AccountWidget: React.FC = () => {
  return (
    <div
      className="d-flex justify-content-end align-items-center p-2"
      style={{ backgroundColor: "#BDEDF2" }}
    >
      <a href="https://youtube.com" className="nav-link accountwidget">
        Sign up/Log in
      </a>
    </div>
  );
};

export default AccountWidget;
