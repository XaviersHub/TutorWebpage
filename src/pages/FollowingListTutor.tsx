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

interface Tutor {
  name: string;
  email: string;
  subjects?: string[];
  levels?: string;
  location?: string;
  reviews?: number;
  photo?: string;
}

const FollowingListTutor = () => {
  const [followingTutors, setFollowingTutors] = useState<Tutor[]>([]);
  const { tutorId } = useParams<{ tutorId?: string }>(); // ✅ Extract tutorId from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const userEmail = Cookies.get("userEmail"); // ✅ Get logged-in student's email

  useEffect(() => {
    const fetchFollowingTutors = async () => {
      if (!userEmail) return;

      try {
        // Step 1: Get the "following" list of tutor emails from the student document
        const studentsRef = collection(db, "students");
        const studentQuery = query(studentsRef, where("email", "==", userEmail));
        const studentSnapshot = await getDocs(studentQuery);

        if (studentSnapshot.empty) {
          console.error("Student not found.");
          return;
        }

        const studentData = studentSnapshot.docs[0].data();
        const followingList: string[] = studentData.following || []; // List of tutor emails

        if (followingList.length === 0) {
          setFollowingTutors([]);
          return;
        }

        // Step 2: Query tutors using the emails from the following list
        const tutorsRef = collection(db, "tutors");
        const tutorsQuery = query(tutorsRef, where("email", "in", followingList));
        const tutorsSnapshot = await getDocs(tutorsQuery);

        const tutorsList: Tutor[] = tutorsSnapshot.docs.map((doc) => ({
          name: doc.data().fullName,
          levels: doc.data().levels,
          email: doc.data().email,
        }));

        setFollowingTutors(tutorsList);
      } catch (error) {
        console.error("Error fetching following tutors:", error);
      }
    };

    fetchFollowingTutors();
  }, [userEmail]);

  const handleMessage = async (tutorEmail: string) => { // Changed to tutorEmail
    try {
      let tutorUid = tutorId;
 
      // Ensure tutorId is retrieved correctly by querying tutor using tutorEmail
      const tutorsRef = collection(db, "tutors");
      const q = query(tutorsRef, where("email", "==", tutorEmail));  // Use tutorEmail here
      const querySnapshot = await getDocs(q);
 
      if (!querySnapshot.empty) {
        tutorUid = querySnapshot.docs[0].id;
      } else {
        console.error("Tutor ID not found for email:", tutorEmail);  // Changed to tutorEmail
        alert("Error retrieving tutor information.");
        return;
      }
 
      const chatroomsRef = collection(db, "chatrooms");
      const chatQuery = query(chatroomsRef, where("studentId", "==", userEmail), where("tutorId", "==", tutorUid));
      const chatSnapshot = await getDocs(chatQuery);
 
      let chatroomId;
      if (!chatSnapshot.empty) {
        chatroomId = chatSnapshot.docs[0].id;
      } else {
        const newChatroomRef = await addDoc(chatroomsRef, {
          studentId: userEmail, // Use the logged-in student's email
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
        <h2 className="title" style={{ fontSize: "60px", fontWeight: "bold", marginTop: "5px", marginRight: "120px" }}>
          TutorGo
        </h2>
        <img src="/images/logo.png" alt="Picture" className="logo-image pill" />
        <AccountWidget />
      </div>
      <NavBar />
      <div className="center-text">
        <h1>Tutors You Follow</h1>
      </div>
      <div className="schedulecontainer">
        <table className="scheduletable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Tutor Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {followingTutors.length > 0 ? (
              followingTutors.map((tutor, index) => (
                <tr key={index}>
                  <td>{tutor.name}</td>
                  <td>{tutor.levels}</td>
                  <td>
                    <a href={`mailto:${tutor.email}`}>{tutor.email}</a>
                  </td>
                  <td>
                    <button className="btn btn-success mt-2" onClick={() => handleMessage(tutor.email)}>
                      Message {tutor.name}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>You're not following any tutors yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FollowingListTutor;
