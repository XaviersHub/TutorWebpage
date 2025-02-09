import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../database/firebaseConfig";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import Cookies from "js-cookie";
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
  const [followStatus, setFollowStatus] = useState<string | null>(null); 
  const userEmail = Cookies.get("userEmail");

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
          setTutor({ id: tutorSnap.id, ...tutorSnap.data() } as Tutor);
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

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (!userEmail || !tutor?.email) return;

      try {
       
        const studentsRef = collection(db, "students");
        const studentQuery = query(
          studentsRef,
          where("email", "==", userEmail)
        );
        const studentSnapshot = await getDocs(studentQuery);

        if (!studentSnapshot.empty) {
          const studentData = studentSnapshot.docs[0].data();
          if (studentData.following?.includes(tutor.email)) {
            setFollowStatus("following");
            return;
          }
        }

        
        const followRequestsRef = collection(db, "followRequests");
        const followQuery = query(
          followRequestsRef,
          where("studentEmail", "==", userEmail),
          where("tutorEmail", "==", tutor.email)
        );
        const followSnapshot = await getDocs(followQuery);

        if (!followSnapshot.empty) {
          setFollowStatus("pending");
        } else {
          setFollowStatus(null);
        }
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };

    checkFollowStatus();
  }, [tutor, userEmail]);

  const handleFollowRequest = async () => {
    if (!userEmail || !tutor?.email) return;

    try {
      await addDoc(collection(db, "followRequests"), {
        studentEmail: userEmail,
        tutorEmail: tutor.email,
        status: "pending",
      });

      setFollowStatus("pending");
      alert(`📩 Follow request sent to ${tutor.fullName}!`);
    } catch (error) {
      console.error("Error sending follow request:", error);
    }
  };

  return (
    <div>
    
      <div
        className="d-flex justify-content-between"
        style={{ backgroundColor: "#B2D8E9" }}
      >
        <AccountWidget />
      </div>
      <NavBar />

    
      <div className="container2 mt-4">
        {loading ? (
          <p>Loading tutor details...</p>
        ) : tutor ? (
          <div className="profile-container">
            <div className="profile-photo-section">
              <img
                src={
                  tutor.photo?.startsWith("http")
                    ? tutor.photo
                    : "/images/user.png"
                }
                alt={tutor.fullName}
                className="profile-photo"
                onError={(e) => (e.currentTarget.src = "/images/user.png")}
              />
              <p>
                <strong>Subjects:</strong>{" "}
                {tutor.subjects?.join(", ") || "Not provided"}
              </p>
              <p>
                <strong>Levels:</strong> {tutor.levels || "Not provided"}
              </p>
              <p>
                <strong>Location:</strong> {tutor.location || "Not provided"}
              </p>
              <p>
                <strong>Reviews:</strong> {"⭐".repeat(tutor.reviews || 0)}
              </p>
            </div>

            <div className="profile-details">
              <h2>{tutor.fullName}</h2>
              <p>
                <strong>About:</strong> {tutor.bio || "No bio available."}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${tutor.email}`}>{tutor.email}</a>
              </p>

          
              {followStatus === "following" ? (
                <button className="btn btn-danger mt-2" disabled>
                  ✅ Following
                </button>
              ) : followStatus === "pending" ? (
                <button className="btn btn-warning mt-2" disabled>
                  ⏳ Pending Follow
                </button>
              ) : (
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleFollowRequest}
                >
                  ➕ Request to Follow
                </button>
              )}

              <button
                className="btn btn-secondary mt-2"
                onClick={() => navigate("/find-tutor")}
              >
                Back to Tutor Finder
              </button>
              <button
                className="btn btn-success mt-2"
                onClick={() => navigate(`/chat/${tutorId}`)}
              >
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
