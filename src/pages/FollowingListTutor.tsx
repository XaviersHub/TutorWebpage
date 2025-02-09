import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../database/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  collection,
  query,
  getDocs,
  where,
  addDoc,
} from "firebase/firestore";
import Cookies from "js-cookie";
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";
import "../components/styles/TutorFollow.css";

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
  const navigate = useNavigate();
  const userEmail = Cookies.get("userEmail");

  useEffect(() => {
    const fetchFollowingTutors = async () => {
      if (!userEmail) return;

      try {
        const studentsRef = collection(db, "students");
        const studentQuery = query(studentsRef, where("email", "==", userEmail));
        const studentSnapshot = await getDocs(studentQuery);

        if (studentSnapshot.empty) {
          console.error("Student not found.");
          return;
        }

        const studentData = studentSnapshot.docs[0].data();
        const followingList: string[] = studentData.following || [];

        if (followingList.length === 0) {
          setFollowingTutors([]);
          return;
        }

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

  const handleUnfollow = async (tutorEmail: string) => {
    if (!userEmail) return;

    try {
      const studentsRef = collection(db, "students");
      const studentQuery = query(studentsRef, where("email", "==", userEmail));
      const studentSnapshot = await getDocs(studentQuery);

      if (studentSnapshot.empty) {
        console.error("Student document not found.");
        return;
      }

      const studentDoc = studentSnapshot.docs[0].ref;


      await updateDoc(studentDoc, {
        following: arrayRemove(tutorEmail),
      });


      setFollowingTutors((prevTutors) =>
        prevTutors.filter((tutor) => tutor.email !== tutorEmail)
      );

      alert(`Unfollowed ${tutorEmail}`);
    } catch (error) {
      console.error("Error unfollowing tutor:", error);
      alert("Failed to unfollow. Try again later.");
    }
  };

  const handleMessage = async (tutorEmail: string) => {
    try {
      let tutorUid: string | undefined = undefined;

      const tutorsRef = collection(db, "tutors");
      const q = query(tutorsRef, where("email", "==", tutorEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        tutorUid = querySnapshot.docs[0].id;
      } else {
        console.error("Tutor ID not found for email:", tutorEmail);
        alert("Error retrieving tutor information.");
        return;
      }

      const chatroomsRef = collection(db, "chatrooms");
      const chatQuery = query(
        chatroomsRef,
        where("studentId", "==", userEmail),
        where("tutorId", "==", tutorUid)
      );
      const chatSnapshot = await getDocs(chatQuery);

      let chatroomId;
      if (!chatSnapshot.empty) {
        chatroomId = chatSnapshot.docs[0].id;
      } else {
        const newChatroomRef = await addDoc(chatroomsRef, {
          studentId: userEmail,
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
        <h2 className="title" style={{ fontSize: "60px", fontWeight: "bold", marginTop: "0px", marginRight: "120px" }}>
          TutorGo
        </h2>
        <img src="/images/logo.png" alt="Picture" className="logo-image pill" />
        <AccountWidget />
      </div>
      <NavBar />
      
      <h1 className="followheader">Tutors You Follow</h1>
      
      <div className="followcontainer">
        
        <table className="tutortable">
          <thead>
            <tr className="tutortr">
              <th>Name</th>
              <th>Level</th>
              <th>Tutor Email</th>
              <th>Message</th>
              <th>Unfollow</th>
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
                      Message 
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-danger mt-2" onClick={() => handleUnfollow(tutor.email)}>
                      Unfollow
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>You're not following any tutors yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FollowingListTutor;

