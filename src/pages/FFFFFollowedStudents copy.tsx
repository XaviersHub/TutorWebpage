import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import Cookies from "js-cookie";
import AccountWidget from "../components/AccountWidget";
import NavBarTutor from "../components/NavBarTutor";
import { useNavigate } from "react-router-dom"; // Import navigation hook

interface Student {
  name: string;
  levels: string;
  email: string;
}

const FollowedStudentsD: React.FC = () => {
  const [followedStudents, setFollowedStudents] = useState<Student[]>([]);
  const userEmail = Cookies.get("userEmail");
  const navigate = useNavigate(); // Initialize navigation hook

  useEffect(() => {
    const fetchFollowedStudents = async () => {
      if (!userEmail) return;

      try {
        const studentsRef = collection(db, "students");
        const studentsQuery = query(studentsRef, where("following", "array-contains", userEmail));
        const studentsSnapshot = await getDocs(studentsQuery);

        const followedStudentsList: Student[] = studentsSnapshot.docs.map((doc) => ({
          name: doc.data().name,
          levels: doc.data().levels,
          email: doc.data().email,
        }));

        setFollowedStudents(followedStudentsList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFollowedStudents();
  }, [userEmail]);

  const handleMessageClick = (studentEmail: string) => {
    navigate(`/chat/${studentEmail}`); // Navigate to chat room with student
  };

  return (
    <div className="homepage">
      <div className="d-flex justify-content-between" style={{ backgroundColor: "#B2D8E9" }}>
        <h2 className="title" style={{ fontSize: "60px", fontWeight: "bold", marginTop: "5px", marginRight: "120px" }}>
          TutorGo
        </h2>
        <img src="/images/logo.png" alt="Picture" className="logo-image pill" />
        <AccountWidget />
      </div>
      <NavBarTutor />
      <div className="center-text">
        <h1>Your Student Followers</h1>
      </div>
      <div className="schedulecontainer">
        <table className="scheduletable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Student Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {followedStudents.length > 0 ? (
              followedStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.levels}</td>
                  <td>
                    <a href={`mailto:${student.email}`}>{student.email}</a>
                  </td>
                  <td>
                    <button onClick={() => handleMessageClick(student.email)} className="message-button">
                      Message
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No students following you yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FollowedStudentsD;
