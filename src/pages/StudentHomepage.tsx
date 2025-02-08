import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import Cookies from "js-cookie";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";
import "../components/styles/StudentHomepage.css";

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
  const [approvedTutors, setApprovedTutors] = useState<string[]>([]); // ✅ Approved tutors only
  const userEmail = Cookies.get("userEmail");

  /**
   * ✅ Fetch the list of tutors the student has been **approved to follow**
   */
  useEffect(() => {
    const fetchApprovedTutors = async () => {
      if (!userEmail) return;

      try {
        const studentRef = collection(db, "students");
        const q = query(studentRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const studentData = querySnapshot.docs[0].data();
          console.log("👀 Approved Tutors List:", studentData.following);
          setApprovedTutors(studentData.following || []);
        } else {
          console.warn("⚠️ No student document found.");
        }
      } catch (error) {
        console.error("❌ Error fetching approved tutors:", error);
      }
    };

    fetchApprovedTutors();

    // ✅ Listen for updates when follow status changes
    const handleFollowUpdate = () => fetchApprovedTutors();
    window.addEventListener("follow-updated", handleFollowUpdate);

    return () =>
      window.removeEventListener("follow-updated", handleFollowUpdate);
  }, [userEmail]);

  /**
   * ✅ Fetch lessons in real-time from approved tutors only
   */
  useEffect(() => {
    const fetchSchedule = async () => {
      if (
        !userEmail ||
        !Array.isArray(approvedTutors) ||
        approvedTutors.length === 0
      ) {
        console.warn("⚠️ No approved tutors yet.");
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

        // ✅ Filter lessons by tutors the student is **approved to follow**
        const studentLessons: Lesson[] = allLessons.filter(
          (lesson) =>
            (lesson.students ?? []).includes(userEmail) || // Private lessons
            (lesson.isPublic &&
              (approvedTutors ?? []).includes(lesson.tutorEmail)) // Public lessons from approved tutors
        );

        console.log("✅ Filtered Lessons for Student:", studentLessons);
        setSchedule(studentLessons);
      } catch (error) {
        console.error("❌ Error fetching student schedule:", error);
      }
    };

    fetchSchedule();

    const handleLessonUpdate = () => fetchSchedule();
    window.addEventListener("lesson-updated", handleLessonUpdate);

    return () =>
      window.removeEventListener("lesson-updated", handleLessonUpdate);
  }, [userEmail, approvedTutors]);

  return (
    <div className="homepage">
      <div
        className="d-flex justify-content-between"
        style={{ backgroundColor: "#B2D8E9" }}
      >
        <h2
          className="title"
          style={{
            fontSize: "60px",
            fontWeight: "bold",
            marginTop: "5px",
            marginRight: "120px",
          }}
        >
          TutorGo
        </h2>
        <img src="/images/logo.png" alt="Picture" className="logo-image pill" />
        <AccountWidget />
      </div>
      <NavBar />
      <h1 className="studentscheduleheader">Your Schedule</h1>
      <div className="studentschedulecontainer">
        <table className="studentscheduletable">
          <thead>
            <tr className="studenttableheader">
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
        <a href="/find-tutor" className="findtutor-button">
          Find New Tutors
        </a>
      </div>
    </div>
  );
};

export default StudentHomepage;
