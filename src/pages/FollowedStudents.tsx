import React, { useEffect, useState } from "react";
import { db } from "../database/firebaseConfig";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  query,
  addDoc,
  getDocs,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Cookies from "js-cookie";
import AccountWidget from "../components/AccountWidget";
import NavBarTutor from "../components/NavBarTutor";
import "../components/styles/FollowList.css";

interface Student {
  name: string;
  levels: string;
  email: string;
}

interface FollowRequest {
  id: string;
  studentEmail: string;
  tutorEmail: string;
  status: string;
}

const FollowedStudents: React.FC = () => {
  const [followedStudents, setFollowedStudents] = useState<Student[]>([]);
  const [followRequests, setFollowRequests] = useState<FollowRequest[]>([]);
  const { tutorId } = useParams<{ tutorId?: string }>();
  const userEmail = Cookies.get("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFollowedStudents = async () => {
      if (!userEmail) return;

      try {
        // ✅ Fetch students who follow the tutor
        const studentsRef = collection(db, "students");
        const studentsQuery = query(
          studentsRef,
          where("following", "array-contains", userEmail)
        );
        const studentsSnapshot = await getDocs(studentsQuery);

        const followedStudentsList: Student[] = studentsSnapshot.docs.map(
          (doc) => ({
            name: doc.data().name,
            levels: doc.data().levels,
            email: doc.data().email,
          })
        );

        setFollowedStudents(followedStudentsList);
      } catch (error) {
        console.error("Error fetching followed students:", error);
      }
    };

    const fetchFollowRequests = async () => {
      if (!userEmail) return;

      try {
        // ✅ Fetch follow requests for this tutor
        const followRequestsRef = collection(db, "followRequests");
        const requestsQuery = query(
          followRequestsRef,
          where("tutorEmail", "==", userEmail),
          where("status", "==", "pending")
        );
        const requestsSnapshot = await getDocs(requestsQuery);

        const requestsList: FollowRequest[] = requestsSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            studentEmail: doc.data().studentEmail,
            tutorEmail: doc.data().tutorEmail,
            status: doc.data().status,
          })
        );

        setFollowRequests(requestsList);
      } catch (error) {
        console.error("Error fetching follow requests:", error);
      }
    };

    fetchFollowedStudents();
    fetchFollowRequests();
  }, [userEmail]);

  // ✅ Approve follow request
  const handleApproveFollow = async (request: FollowRequest) => {
    if (!userEmail) return;

    try {
      // ✅ Add the student to tutor’s "following" list
      const studentsRef = collection(db, "students");
      const studentQuery = query(
        studentsRef,
        where("email", "==", request.studentEmail)
      );
      const studentSnapshot = await getDocs(studentQuery);

      if (!studentSnapshot.empty) {
        const studentDoc = studentSnapshot.docs[0].ref;
        await updateDoc(studentDoc, {
          following: arrayUnion(request.tutorEmail),
        });
      }

      // ✅ Remove request from `followRequests`
      await deleteDoc(doc(db, "followRequests", request.id));

      // ✅ Update UI
      setFollowedStudents((prev) => [
        ...prev,
        { name: "Unknown", levels: "Unknown", email: request.studentEmail },
      ]);
      setFollowRequests((prev) => prev.filter((req) => req.id !== request.id));

      alert(`✅ Follow request from ${request.studentEmail} approved.`);
    } catch (error) {
      console.error("Error approving follow request:", error);
      alert("❌ Failed to approve follow request.");
    }
  };

  // ✅ Remove a student from following list
  const handleRemoveStudent = async (studentEmail: string) => {
    if (!userEmail) return;

    try {
      // ✅ Remove tutor from student's following list
      const studentsRef = collection(db, "students");
      const studentQuery = query(
        studentsRef,
        where("email", "==", studentEmail)
      );
      const studentSnapshot = await getDocs(studentQuery);

      if (!studentSnapshot.empty) {
        const studentDoc = studentSnapshot.docs[0].ref;
        await updateDoc(studentDoc, {
          following: arrayRemove(userEmail),
        });
      }

      // ✅ Update UI
      setFollowedStudents((prev) =>
        prev.filter((student) => student.email !== studentEmail)
      );

      alert(`❌ Removed ${studentEmail} from followers.`);
    } catch (error) {
      console.error("Error removing student:", error);
      alert("❌ Failed to remove follower.");
    }
  };

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
      <NavBarTutor />

      <div className="center-text">
        <h1 style={{ fontFamily: "IBM_Plex_Serif", fontWeight: "900" }}>
          Follow Requests
        </h1>
      </div>

      <div className="schedulecontainer5">
        <table className="scheduletable5">
          <thead>
            <tr>
              <th>Student Email</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {followRequests.length > 0 ? (
              followRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.studentEmail}</td>
                  <td>
                    <button
                      className="btn btn-success mt-2"
                      onClick={() => handleApproveFollow(request)}
                    >
                      ✅ Approve
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No follow requests yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="center-text">
        <h1 style={{ fontFamily: "IBM_Plex_Serif", fontWeight: "900" }}>
          Your Students
        </h1>
      </div>

      <div className="schedulecontainer5">
        <table className="scheduletable5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Student Email</th>
              <th>Message</th>
              <th>Remove</th>
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
                    <button className="btn btn-success mt-2" onClick={() => handleMessage(student.email)}>
                      Message {student.name}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => handleRemoveStudent(student.email)}
                    >
                      ❌ Remove
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
