import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../database/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  collection,
  query,
  getDocs,
  where,
  addDoc,
} from "firebase/firestore"; // ✅ Import Firestore functions
import Cookies from "js-cookie"; // ✅ Import Cookies for user authentication
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";
import "../components/styles/TutorProfile.css";

import NavBarTutor from "../components/NavBarTutor";

// Type definition for the student
interface Student {
  name: string;
  levels: string;
  email: string;
}
interface Tutor {
  id: string;
  fullName: string;
  bio: string;
  email: string;
  subjects?: string[];
  levels?: string;
  location?: string;
  reviews?: number;
  photo?: string;
}


const handleMessage = async () => {
  const { tutorId } = useParams<{ tutorId?: string }>(); // ✅ Extract tutorId from URL
    const navigate = useNavigate();
    const [tutor, setTutor] = useState<Tutor | null>(null);
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const userEmail = Cookies.get("userEmail"); // ✅ Get logged-in student's email
    const studentEmail = Cookies.get("userEmail");
    if (!tutorId || !studentEmail) {
      alert("You must be logged in to message a tutor.");
      return;
    }

    try {
      const chatroomsRef = collection(db, "chatrooms");
      const q = query(chatroomsRef, where("studentId", "==", studentEmail), where("tutorId", "==", tutorId));
      const querySnapshot = await getDocs(q);

      let chatroomId;
      if (!querySnapshot.empty) {
        chatroomId = querySnapshot.docs[0].id;
      } else {
        const newChatroomRef = await addDoc(chatroomsRef, {
          studentId: studentEmail,
          tutorId,
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

const FollowedStudents: React.FC = () => {
  const [followedStudents, setFollowedStudents] = useState<Student[]>([]);

  const userEmail = Cookies.get("userEmail"); // Get the user email from cookies

  // Fetch followed students when the component mounts
  useEffect(() => {
    const fetchFollowedStudents = async () => {
      if (!userEmail) return;

      try {
        // Query to get the list of students who are following the tutor
        const studentsRef = collection(db, "students");
        const studentsQuery = query(studentsRef, where("following", "array-contains", userEmail));
        const studentsSnapshot = await getDocs(studentsQuery);

        // Process the data into the student array
        const followedStudentsList: Student[] = studentsSnapshot.docs.map((doc) => ({
          name: doc.data().name,
          levels: doc.data().levels, // Assuming 'level' is part of the student data
          email: doc.data().email,
        }));

        // Update the state with the fetched followed students
        setFollowedStudents(followedStudentsList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFollowedStudents();
  }, [userEmail]); // Trigger the effect when the userEmail changes

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
      <NavBarTutor/>
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
            <th>Message </th>
          </tr>
        </thead>
        <tbody>
          {followedStudents.length > 0 ? (
            followedStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.levels}</td>
                <td><a href={`mailto:${student.email}`}>{student.email}</a> {/* Link to student profile via email */}</td>
                <td><button className="btn btn-success mt-2" onClick={handleMessage}>
                Message {student.name}
              </button> </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No students following you yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default FollowedStudents;
