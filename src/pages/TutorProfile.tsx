import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../database/firebaseConfig";
import { doc, getDoc, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";
import "../components/styles/TutorProfile.css";

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

const TutorProfile = () => {
  const { tutorId } = useParams<{ tutorId?: string }>();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);
  const studentEmail = Cookies.get("userEmail");

  useEffect(() => {
    const fetchTutor = async () => {
      if (!tutorId) {
        console.error("No tutor ID provided.");
        setLoading(false);
        return;
      }

      try {
        const tutorRef = doc(db, "tutors", tutorId);
        const tutorSnap = await getDoc(tutorRef);

        if (tutorSnap.exists()) {
          const tutorData = { id: tutorSnap.id, ...tutorSnap.data() } as Tutor;
          console.log("Fetched Tutor Data:", tutorData);
          setTutor(tutorData);
        } else {
          console.error("Tutor not found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tutor:", error);
        setLoading(false);
      }
    };

    fetchTutor();
  }, [tutorId]);

  const handleMessage = async () => {
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

  return (
    <div>
      <div className="d-flex justify-content-between" style={{ backgroundColor: "#BDEDF2" }}>
        <SearchBar />
        <AccountWidget />
      </div>
      <NavBar />

      <div className="container mt-4">
        {loading ? (
          <p>Loading tutor details...</p>
        ) : tutor ? (
          <div className="profile-container">
            <div className="profile-photo-section">
              <img
                src={tutor.photo?.startsWith("http") ? tutor.photo : "/images/user.png"}
                alt={tutor.fullName}
                className="profile-photo"
                onError={(e) => (e.currentTarget.src = "/images/user.png")}
              />
              <p><strong>Subjects:</strong> {tutor.subjects?.join(", ") || "Not provided"}</p>
              <p><strong>Levels:</strong> {tutor.levels || "Not provided"}</p>
              <p><strong>Location:</strong> {tutor.location || "Not provided"}</p>
              <p><strong>Reviews:</strong> {"⭐".repeat(tutor.reviews || 0)}</p>
              <button className="btn btn-primary mt-2">Write a Review</button>
            </div>

            <div className="profile-details">
              <h2>{tutor.fullName}</h2>
              <p><strong>About:</strong> {tutor.bio || "No bio available."}</p>
              <p><strong>Email:</strong> <a href={`mailto:${tutor.email}`}>{tutor.email}</a></p>
              <button className="btn btn-secondary mt-2" onClick={() => navigate("/find-tutor")}>
                Back to Tutor Finder
              </button>
              <button className="btn btn-success mt-2" onClick={handleMessage}>
                Message {tutor.fullName}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-danger">Tutor profile not found.</p>
        )}
      </div>
    </div>
  );
};

export default TutorProfile;
