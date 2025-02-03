import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../database/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
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

  return (
    <div>
      {/* Top Bar */}
      <div
        className="d-flex justify-content-between"
        style={{ backgroundColor: "#B2D8E9" }}
      >
        {/*<SearchBar />*/}
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
                  tutor.photo && tutor.photo.startsWith("http")
                    ? tutor.photo
                    : "/images/user.png"
                } // ✅ Use S3 URL or default placeholder
                alt={tutor.fullName}
                className="profile-photo"
                onError={(e) => (e.currentTarget.src = "/images/user.png")} // Fallback if S3 URL fails
              />
              <p>
                <strong>Subjects:</strong>{" "}
                {tutor.subjects && tutor.subjects.length > 0
                  ? tutor.subjects.join(", ")
                  : "Not provided"}
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
              <button className="btn btn-primary mt-2">Write a Review</button>
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

              {/* Buttons */}
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
