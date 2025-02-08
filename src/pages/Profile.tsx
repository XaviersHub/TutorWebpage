import React, { useEffect, useState } from "react";
import { db } from "../database/firebaseConfig";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import Cookies from "js-cookie";
import AccountWidget from "../components/AccountWidget";
import NavBarTutor from "../components/NavBarTutor";
import "./Profile.css"

interface UserProfile {
  fullName: string;
  email: string;
  levels: string;
  location: string;
  nric: string;
  bio: string;
  photo: string;
  subjects: string[];
}

const Profile = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);  // State to track if we are in edit mode
  const [updatedData, setUpdatedData] = useState<UserProfile | null>(null);  // State to store the updated data

  useEffect(() => {
    const fetchUserData = async () => {
      const email = Cookies.get("userEmail"); // Get the email from cookies

      if (!email) {
        setError("❌ No user logged in.");
        setLoading(false);
        return;
      }

      try {
        // Query Firestore for the user by email
        const tutorsRef = collection(db, "tutors");
        const q = query(tutorsRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("❌ No profile found for this email.");
        } else {
          // Extract data and set the state
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            setUserData({
              fullName: data.fullName,
              email: data.email,
              levels: data.levels,
              location: data.location,
              nric: data.nric,
              bio: data.bio,
              photo: data.photo,
              subjects: data.subjects,
            });
            setUpdatedData({
              fullName: data.fullName,
              email: data.email,
              levels: data.levels,
              location: data.location,
              nric: data.nric,
              bio: data.bio,
              photo: data.photo,
              subjects: data.subjects,
            });
          });
        }
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
        setError("❌ Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    if (updatedData) {
      setUpdatedData({
        ...updatedData,
        [field]: e.target.value,
      });
    }
  };

  const handleSave = async () => {
    if (updatedData) {
      const email = Cookies.get("userEmail"); // Get the email from cookies
      if (!email) return;

      try {
        // Find the user in Firebase and update the data
        const tutorsRef = collection(db, "tutors");
        const q = query(tutorsRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (docSnapshot) => {
          const tutorDocRef = doc(db, "tutors", docSnapshot.id);
          await updateDoc(tutorDocRef, {
            fullName: updatedData.fullName,
            levels: updatedData.levels,
            location: updatedData.location,
            nric: updatedData.nric,
            bio: updatedData.bio,
            subjects: updatedData.subjects,
          });
        });
        setIsEditing(false);
        setUserData(updatedData); // Update the local state with the new data
      } catch (error) {
        setError("❌ Failed to update profile.");
        console.error("❌ Error updating user data:", error);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
    <div className="profile-container">
      <h2 style={{ fontWeight:"900", marginTop:"120px" }}>User Profile</h2>
      {userData && (
        <div className="profile-info">
          <img src={userData.photo} alt="Profile" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
          {isEditing ? (
  <div className="edit-form">
    <div>
      <label>Full Name:</label>
      <input
        type="text"
        value={updatedData.fullName}
        onChange={(e) => handleInputChange(e, "fullName")}
      />
    </div>
    <div>
      <label>Levels:</label>
      <input
        type="text"
        value={updatedData.levels}
        onChange={(e) => handleInputChange(e, "levels")}
      />
    </div>
    <div>
      <label>Location:</label>
      <input
        type="text"
        value={updatedData.location}
        onChange={(e) => handleInputChange(e, "location")}
      />
    </div>
    <div>
      <label>NRIC:</label>
      <input
        type="text"
        value={updatedData.nric}
        onChange={(e) => handleInputChange(e, "nric")}
      />
    </div>
    <div>
      <label>Bio:</label>
      <textarea
        value={updatedData.bio}
        onChange={(e) => handleInputChange(e, "bio")}
      />
    </div>
    <div>
      <label>Subjects:</label>
      <input
        type="text"
        value={updatedData.subjects.join(", ")}
        onChange={(e) => handleInputChange(e, "subjects")}
      />
    </div>
    <button onClick={handleSave}>Save</button>
  </div>
) : (
  <div>
    <p><strong>Full Name:</strong> {userData.fullName}</p>
    <p><strong>Email:</strong> {userData.email}</p>
    <p><strong>Levels:</strong> {userData.levels}</p>
    <p><strong>Location:</strong> {userData.location}</p>
    <p><strong>NRIC:</strong> {userData.nric}</p>
    <p><strong>Bio:</strong> {userData.bio || "No bio available."}</p>
    <p><strong>Subjects:</strong> {userData.subjects.join(", ")}</p>
    <button onClick={handleEditClick}>Edit</button>
  </div>
)}

        </div>
      )}
    </div>
    </div>
  );
};

export default Profile;
