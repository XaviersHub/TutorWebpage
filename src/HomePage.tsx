import React from 'react';
import "./MySchedule.css"

const HomePage: React.FC = () => {
  return (
    <>
    <div className="home-page">
    <div className="header-bar"></div>
    <h1>Welcome!</h1>

      <p><h5>Please navigate to desired tabs below to get started!</h5></p>
    </div>
    <ul className="list-group">
        <li className="list-group-item custom-list-item d-flex justify-content-between align-items-center">
          Profile
        </li>
        <li className="list-group-item custom-list-item d-flex justify-content-between align-items-center">
          Message
        </li>
        <li className="list-group-item custom-list-item d-flex justify-content-between align-items-center">
          MySchedule
        </li>
        <li className="list-group-item custom-list-item d-flex justify-content-between align-items-center">
          Student Requests
        </li>
      </ul>


    </>
  );
};

export default HomePage;