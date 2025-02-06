import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import Cookies from "js-cookie";
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";
import "../components/styles/LoginHomepage.css";
import NavBarTutor from "../components/NavBarTutor";
import FollowedStudents from "./FollowedStudents";

interface Lesson {
  id: string;
  subject: string;
  date: string;
  time: string;
  location: string;
  contact: string;
  students: string[]; // Array of students attending the lesson
  isPublic: boolean;
}

const TutorHomepage: React.FC = () => {
  const [schedule, setSchedule] = useState<Lesson[]>([]);
  const [newLesson, setNewLesson] = useState({
    subject: "",
    date: "",
    time: "",
    location: "",
    contact: "",
    studentEmail: "", // Only needed for private lessons
    isPublic: false, // Default to private
  });

  const userEmail = Cookies.get("userEmail");

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!userEmail) return;

      try {
        const lessonsRef = collection(db, "lessons");
        const q = query(lessonsRef, where("tutorEmail", "==", userEmail));
        const querySnapshot = await getDocs(q);

        const tutorLessons: Lesson[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Lesson[];

        setSchedule(tutorLessons);
      } catch (error) {
        console.error("Error fetching tutor schedule:", error);
      }
    };

    fetchSchedule();
  }, [userEmail]);

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) return;

    try {
      const newLessonData = {
        tutorEmail: userEmail,
        tutor: userEmail,
        subject: newLesson.subject,
        date: newLesson.date,
        time: newLesson.time,
        location: newLesson.location,
        contact: newLesson.contact,
        students: newLesson.isPublic ? [] : [newLesson.studentEmail],
        isPublic: newLesson.isPublic,
      };

      const docRef = await addDoc(collection(db, "lessons"), newLessonData);
      const newLessonWithId = { id: docRef.id, ...newLessonData };

      // ✅ Update the UI immediately without needing a page refresh
      setSchedule((prevSchedule) => [...prevSchedule, newLessonWithId]);

      alert("✅ Lesson added successfully!");
      setNewLesson({
        subject: "",
        date: "",
        time: "",
        location: "",
        contact: "",
        studentEmail: "",
        isPublic: false,
      });

      // ✅ Notify StudentHomepage that a new lesson has been added
      window.dispatchEvent(new Event("lesson-updated"));
    } catch (error) {
      console.error("❌ Error adding lesson:", error);
    }
  };

  return (
    <div className="homepage">
      <div
        className="d-flex justify-content-between"
        style={{ backgroundColor: "#B2D8E9" }}
      >
       {/* <SearchBar /> */}
       <h2 className="title" style={{ fontSize: "60px", fontWeight: "bold", marginTop:"5px", marginRight:"120px" }}>TutorGo</h2>
        <img src="/images/logo.png" alt="Picture" className="logo-image pill" />
        <AccountWidget />
      </div>
      <NavBarTutor />
      <div className="center-text">
      <h1>Your Teaching Schedule</h1>
      </div>

      <div className="schedulecontainer">
        <table className="scheduletable">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Students</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.id}>
                <td>{row.subject}</td>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td>{row.location}</td>
                <td>{row.contact}</td>
                <td>{row.isPublic ? "Public" : row.students.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Lesson Form */}
      <div className="form-container">
        <h3 className="scheduleheader2">Create Schedule</h3>
        <form onSubmit={handleAddLesson} className="lesson-form">
          <input
            type="text"
            placeholder="Subject"
            value={newLesson.subject}
            onChange={(e) =>
              setNewLesson({ ...newLesson, subject: e.target.value })
            }
            required
          />
          <input
            type="date"
            value={newLesson.date}
            onChange={(e) =>
              setNewLesson({ ...newLesson, date: e.target.value })
            }
            required
          />
          <input
            type="time"
            value={newLesson.time}
            onChange={(e) =>
              setNewLesson({ ...newLesson, time: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={newLesson.location}
            onChange={(e) =>
              setNewLesson({ ...newLesson, location: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Contact"
            value={newLesson.contact}
            onChange={(e) =>
              setNewLesson({ ...newLesson, contact: e.target.value })
            }
            required
          />

          <label>
            <input
              type="checkbox"
              checked={newLesson.isPublic}
              onChange={(e) =>
                setNewLesson({ ...newLesson, isPublic: e.target.checked })
              }
            />
            Public Lesson
          </label>

          {!newLesson.isPublic && (
            <input
              type="email"
              placeholder="Student Email"
              value={newLesson.studentEmail}
              onChange={(e) =>
                setNewLesson({ ...newLesson, studentEmail: e.target.value })
              }
              required
            />
          )}

          <button type="submit">Add Lesson</button>
        </form> 
      </div>
      
      
    </div>
  );
};

export default TutorHomepage;
