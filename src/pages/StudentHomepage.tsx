import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc, query, where, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import Cookies from "js-cookie";
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";
import "../components/styles/LoginHomepage.css";
import "../components/styles/StudentHomepage.css";

interface Session {
  id: string;
  subject: string;
  tutorEmail: string;
  date: string;
  time: string;
  status: string;
}

const StudentHomepage: React.FC = () => {
  const [schedule, setSchedule] = useState<Session[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tutorEmail, setTutorEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");

  const studentEmail = Cookies.get("userEmail");

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isModalOpen]);

  useEffect(() => {
    const fetchSessions = async () => {
      if (!studentEmail) return;
      try {
        const q = query(collection(db, "sessionRequests"), where("studentEmail", "==", studentEmail));
        const querySnapshot = await getDocs(q);
        const sessions: Session[] = querySnapshot.docs.map((doc: DocumentData) => ({ id: doc.id, ...doc.data() }));
        setSchedule(sessions);
      } catch (error) {
        console.error("Error fetching sessions: ", error);
      }
    };
    fetchSessions();
  }, [studentEmail]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!studentEmail || !tutorEmail || !date || !time || !subject) {
      setError("❌ Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "sessionRequests"), {
        studentEmail,
        tutorEmail,
        date,
        time,
        subject,
        status: "Pending",
        createdAt: new Date(),
      });

      alert("✅ Session request submitted successfully!");
      setIsModalOpen(false);
    } catch (err: any) {
      setError("❌ Failed to submit request. Try again.");
      console.error("Firestore error:", err.message);
    }
  };

  return (
    <div className="homepage">
      <div className="d-flex justify-content-between" style={{ backgroundColor: "#B2D8E9" }}>
        <SearchBar />
        <h2 className="title" style={{ fontSize: "60px", fontWeight: "bold", marginTop: "15px" }}>TutorGo</h2>
        <AccountWidget />
      </div>

      <NavBar />
      <h1 className="scheduleheader">Your Schedule</h1>
      <br></br>
      <br></br>
      <div className="schedulecontainer">
        <table className="scheduletable">
          <thead>
            <tr className="tableheader">
              <th>Subject</th>
              <th>Tutor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.id}>
                <td>{row.subject}</td>
                <td>{row.tutorEmail}</td>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="schedule-button" onClick={() => setIsModalOpen(true)}>
        Schedule Session
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Schedule a Session</h3>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <label>Tutor Email:</label>
              <input
                type="email"
                placeholder="Enter tutor's email"
                value={tutorEmail}
                onChange={(e) => setTutorEmail(e.target.value)}
                required
              />

              <label>Subject:</label>
              <input
                type="text"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />

              <label>Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

              <label>Time:</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />

              <button type="submit" className="submit-button">
                Submit Request
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHomepage;
