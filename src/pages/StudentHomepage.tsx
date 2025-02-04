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
  tutorEmail: string;
  date: string;
  time: string;
  location: string;
  contact: string;
  isPublic: boolean;
  students: string[];
}

const StudentHomepage: React.FC = () => {
  const [schedule, setSchedule] = useState<Lesson[]>([]);
  const [followingTutors, setFollowingTutors] = useState<string[]>([]);
  const userEmail = Cookies.get("userEmail");

  useEffect(() => {
    const fetchFollowingTutors = async () => {
      if (!userEmail) return;

      try {
        const studentRef = collection(db, "students");
        const q = query(studentRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const studentData = querySnapshot.docs[0].data();
          console.log("👀 Fetched Following Tutors:", studentData.following);
          setFollowingTutors(studentData.following || []);
        }
      } catch (error) {
        console.error("❌ Error fetching followed tutors:", error);
      }
    };

    fetchFollowingTutors();
  }, [userEmail]);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!userEmail || followingTutors.length === 0) {
        console.warn("⚠️ No tutors followed yet.");
        return;
      }

      try {
        const lessonsRef = collection(db, "lessons");
        const q = query(lessonsRef);
        const querySnapshot = await getDocs(q);

        const allLessons: Lesson[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Lesson[];

        console.log("📚 All Lessons Fetched:", allLessons);

        const studentLessons: Lesson[] = allLessons.filter(
          (lesson) =>
            lesson.students.includes(userEmail) ||
            (lesson.isPublic && followingTutors.includes(lesson.tutorEmail))
        );

        console.log("✅ Filtered Lessons for Student:", studentLessons);
        setSchedule(studentLessons);
      } catch (error) {
        console.error("❌ Error fetching student schedule:", error);
      }
    };

    fetchSchedule();

    const handleFollowUpdate = () => fetchSchedule();
    window.addEventListener("follow-updated", handleFollowUpdate);

    return () =>
      window.removeEventListener("follow-updated", handleFollowUpdate);
  }, [userEmail, followingTutors]);

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
              <th>Time</th>
              <th>Location</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {schedule.length > 0 ? (
              schedule.map((row) => (
                <tr key={row.id}>
                  <td>{row.subject}</td>
                  <td>{row.tutor}</td>
                  <td>{row.date}</td>
                  <td>{row.time}</td>
                  <td>{row.location}</td>
                  <td>{row.contact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No upcoming lessons.
                </td>
              </tr>
            )}
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
