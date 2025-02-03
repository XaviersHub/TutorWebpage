import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./styles/HeaderSec.css";

const AccountWidget: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Retrieve email from cookies
    const email = Cookies.get("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  // ✅ Logout function to remove cookie and update UI
  const handleLogout = () => {
    Cookies.remove("userEmail"); // Remove email from cookies
    setUserEmail(null); // Update UI state
    window.location.reload(); // Refresh page to reflect changes
  };

  return (
    <div
      className="d-flex justify-content-end align-items-center p-2"
      style={{ backgroundColor: "#B2D8E9" }}
    >
      {userEmail ? (
        <div className="d-flex align-items-center">
          <span className="nav-link accountwidget">{userEmail}</span>
          <button onClick={handleLogout} className="logout-button" style={logoutButtonStyle}>
            Logout
          </button>
        </div>
      ) : (
        <Link to="/LoginMain" className="nav-link accountwidget">
          Sign up/Log in
        </Link>
      )}
    </div>
  );
};

// ✅ Simple inline style for logout button
const logoutButtonStyle: React.CSSProperties = {
  marginLeft: "10px",
  padding: "5px 10px",
  backgroundColor: "#ff4d4d",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default AccountWidget;
