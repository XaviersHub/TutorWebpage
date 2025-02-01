import React from 'react';
import './MySchedule.css';

const MySchedule: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center text-dark">My Schedule</h1>
      <h5 className="text-muted text-center mb-4">Schedules below:</h5>
      <ul className="list-group">
        <li className="list-group-item custom-list-item d-flex justify-content-between align-items-center">
          Johnnie Tan (Call) / 21 Feb 25
        </li>
        <li className="list-group-item custom-list-item d-flex justify-content-between align-items-center">
          Stacy Lim (Call) / 28 Feb 25
        </li>
      </ul>
    </div>
  );
};

export default MySchedule;
