import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";
import "../components/styles/LoginHomepage.css";

const TutorHomepage: React.FC = () => {
  const [schedule, setSchedule] = useState([
    { subject: "Math", tutor: "Mr. Smith", date: "2025-02-05", location: "Room 101", contact: "123-456", status: "Pending" },
    { subject: "Physics", tutor: "Ms. Doe", date: "2025-02-06", location: "Room 102", contact: "789-012", status: "Confirmed" },
  ]);

  return (
    <div className="homepage">
      <div className="d-flex justify-content-between" style={{ backgroundColor: "#B2D8E9" }}>
        <SearchBar />
        <h2 className="title" style={{ fontSize: "60px", fontWeight: "bold", marginTop: "15px" }}>TutorGo</h2>
        <AccountWidget />
      </div>
      <NavBar />
      <h1 className="scheduleheader">Upcoming Lessons</h1>
      <br />
      <br />
      <div className="schedulecontainer">
        <table className="scheduletable">
          <thead>
            <tr className="tableheader">
              <th>Subject</th>
              <th>Student</th>
              <th>Date</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row, index) => (
              <tr key={index}>
                <td>{row.subject}</td>
                <td>{row.tutor}</td>
                <td>{row.date}</td>
                <td>{row.location}</td>
                <td>{row.contact}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/find-tutor" className="schedule-button">Create Lesson</Link>
    </div>
  );
};

export default TutorHomepage;
