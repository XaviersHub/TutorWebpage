import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import Cookies from "js-cookie";
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";
import "../components/styles/LoginHomepage.css";

interface Lesson {
  id: string;
  subject: string;
  tutor: string;
  date: string;
  location: string;
  contact: string;
  status: string;
}

const StudentHomepage: React.FC = () => {
  const [schedule, setSchedule] = useState<Lesson[]>([]);
  const userEmail = Cookies.get("userEmail");

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!userEmail) return;

      try {
        const lessonsRef = collection(db, "lessons");
        const q = query(lessonsRef, where("studentEmail", "==", userEmail));
        const querySnapshot = await getDocs(q);

        const studentLessons: Lesson[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Lesson[];

        setSchedule(studentLessons);
      } catch (error) {
        console.error("Error fetching student schedule:", error);
      }
    };

    fetchSchedule();
  }, [userEmail]);

  return (
    <div className="homepage">
      <div
        className="d-flex justify-content-between"
        style={{ backgroundColor: "#B2D8E9" }}
      >
        <SearchBar />
        <h2
          className="title"
          style={{ fontSize: "60px", fontWeight: "bold", marginTop: "15px" }}
        >
          TutorGo
        </h2>
        <AccountWidget />
      </div>
      <NavBar />
      <h1 className="scheduleheader">Your Schedule</h1>

      <div className="schedulecontainer">
        <table className="scheduletable">
          <thead>
            <tr className="tableheader">
              <th>Subject</th>
              <th>Tutor</th>
              <th>Date</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.id}>
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

      <a href="/find-tutor" className="schedule-button">
        Find New Tutors
      </a>
    </div>
  );
};

export default StudentHomepage;
