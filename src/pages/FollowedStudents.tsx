import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../database/firebaseConfig";
import {
  collection,
  query,
  getDocs,
  where,
  addDoc,
} from "firebase/firestore";
import Cookies from "js-cookie";
import AccountWidget from "../components/AccountWidget";
import NavBarTutor from "../components/NavBarTutor";
import "../components/styles/TutorProfile.css";

interface Student {
  name: string;
  levels: string;
  email: string;
}

const FollowedStudents: React.FC = () => {
  const [followedStudents, setFollowedStudents] = useState<Student[]>([]);
  const navigate = useNavigate();
  const { tutorId } = useParams<{ tutorId?: string }>();
  const userEmail = Cookies.get("userEmail");

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

  const handleMessage = async (studentEmail: string) => { // Accept studentEmail as a parameter
    try {
      let tutorUid = tutorId;
  
      // Ensure tutorId is retrieved correctly
      const tutorsRef = collection(db, "tutors");
      const q = query(tutorsRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        tutorUid = querySnapshot.docs[0].id;
      } else {
        console.error("Tutor ID not found for email:", userEmail);
        alert("Error retrieving tutor information.");
        return;
      }
  
      const chatroomsRef = collection(db, "chatrooms");
      const chatQuery = query(chatroomsRef, where("studentId", "==", studentEmail), where("tutorId", "==", tutorUid));
      const chatSnapshot = await getDocs(chatQuery);
  
      let chatroomId;
      if (!chatSnapshot.empty) {
        chatroomId = chatSnapshot.docs[0].id;
      } else {
        const newChatroomRef = await addDoc(chatroomsRef, {
          studentId: studentEmail, // Use studentEmail passed to the function
          tutorId: tutorUid,
          messages: [],
          createdAt: new Date(),
        });
        chatroomId = newChatroomRef.id;
      }
  
      navigate(`/chat/${chatroomId}`);
    } catch (error) {
      console.error("Error opening chatroom:", error);
      alert("Failed to open chatroom. Try again later.");
    }
  };
  

 return (
    <div className="homepage">
      <div className="d-flex justify-content-between" style={{ backgroundColor: "#B2D8E9" }}>
        <h2 className="title" style={{ fontSize: "60px", fontWeight: "bold", marginTop: "5px", marginRight: "120px" }}>TutorGo</h2>
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
                  <td><a href={`mailto:${student.email}`}>{student.email}</a></td>
                  <td>
                    <button className="btn btn-success mt-2" onClick={() => handleMessage(student.email)}>
                      Message {student.name}
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

export default FollowedStudents;
