import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import Cookies from "js-cookie";
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";
import "../components/styles/LoginHomepage.css";

interface Lesson {
  id: string;
  subject: string;
  student: string;
  date: string;
  location: string;
  contact: string;
  status: string;
}

const TutorHomepage: React.FC = () => {
  const [schedule, setSchedule] = useState<Lesson[]>([]);
  const [newLesson, setNewLesson] = useState({
    subject: "",
    student: "",
    date: "",
    location: "",
    contact: "",
    status: "Pending",
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
      await addDoc(collection(db, "lessons"), {
        tutorEmail: userEmail,
        ...newLesson,
      });

      alert("✅ Lesson added successfully!");
      setNewLesson({
        subject: "",
        student: "",
        date: "",
        location: "",
        contact: "",
        status: "Pending",
      });
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
      <h1 className="scheduleheader">Your Teaching Schedule</h1>

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
            {schedule.map((row) => (
              <tr key={row.id}>
                <td>{row.subject}</td>
                <td>{row.student}</td>
                <td>{row.date}</td>
                <td>{row.location}</td>
                <td>{row.contact}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {/* Add New Lesson */}
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
            type="text"
            placeholder="Student Name"
            value={newLesson.student}
            onChange={(e) =>
              setNewLesson({ ...newLesson, student: e.target.value })
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
          <button type="submit">Add Lesson</button>
        </form>
      </div>
    </div>
  );
};

export default TutorHomepage;
