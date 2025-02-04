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
} from "firebase/firestore"; // ✅ Import Firestore functions
import Cookies from "js-cookie"; // ✅ Import Cookies for user authentication
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
  const { tutorId } = useParams<{ tutorId?: string }>(); // ✅ Extract tutorId from URL
  const navigate = useNavigate();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const userEmail = Cookies.get("userEmail"); // ✅ Get logged-in student's email

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
          console.log("Fetched Tutor Data:", tutorData); // ✅ Debugging log
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

  useEffect(() => {
    const checkFollowingStatus = async () => {
      if (!userEmail || !tutor?.email) return;

      try {
        const studentRef = doc(db, "students", userEmail);
        const studentSnap = await getDoc(studentRef);

        if (studentSnap.exists()) {
          const studentData = studentSnap.data();
          setIsFollowing(studentData.following?.includes(tutor.email));
        }
      } catch (error) {
        console.error("Error checking following status:", error);
      }
    };

    checkFollowingStatus();
  }, [tutor, userEmail]);

  const handleFollow = async () => {
    if (!userEmail || !tutor?.email) return;

    try {
      // ✅ Query Firestore for the student document that matches the logged-in email
      const studentsRef = collection(db, "students");
      const q = query(studentsRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.warn(
          "Student document does not exist. Creating new student record..."
        );
        return;
      }

      const studentDoc = querySnapshot.docs[0]; // ✅ Get the first matching document
      const studentRef = doc(db, "students", studentDoc.id); // ✅ Use its ID

      if (isFollowing) {
        // ✅ Unfollow the tutor
        await updateDoc(studentRef, {
          following: arrayRemove(tutor.email),
        });
        setIsFollowing(false);
      } else {
        // ✅ Follow the tutor
        await updateDoc(studentRef, {
          following: arrayUnion(tutor.email),
        });
        setIsFollowing(true);
      }
      window.dispatchEvent(new Event("follow-updated"));
    } catch (error) {
      console.error("Error updating following status:", error);
    }
  };

  return (
    <div>
      {/* Top Bar */}
      <div
        className="d-flex justify-content-between"
        style={{ backgroundColor: "#B2D8E9" }}
      >
        <AccountWidget />
      </div>
      <NavBar />

      {/* Main Content */}
      <div className="container2 mt-4">
        {loading ? (
          <p>Loading tutor details...</p>
        ) : tutor ? (
          <div className="profile-container">
            {/* Left Section - Profile Photo & Info */}
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
              {userEmail && (
                <button
                  className="btn btn-primary mt-2"
                  onClick={() =>
                    navigate(`/write-review?tutorEmail=${tutor.email}`)
                  }
                >
                  Write a Review
                </button>
              )}
              <button
                className="btn btn-info mt-2"
                onClick={() =>
                  navigate(`/view-reviews?tutorEmail=${tutor.email}`)
                }
              >
                View Reviews
              </button>
            </div>

            {/* Right Section - Tutor Details & Contact */}
            <div className="profile-details">
              <h2>{tutor.fullName}</h2>
              <p>
                <strong>About:</strong> {tutor.bio || "No bio available."}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${tutor.email}`}>{tutor.email}</a>
              </p>

              {/* Follow Button */}
              <button
                className={`btn ${
                  isFollowing ? "btn-danger" : "btn-primary"
                } mt-2`}
                onClick={handleFollow}
              >
                {isFollowing ? "Unfollow" : "Follow Tutor"}
              </button>

              {/* Navigation Buttons */}
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
