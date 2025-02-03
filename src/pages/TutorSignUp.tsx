import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import { uploadProfilePicture } from "../utils/s3Upload"; // ✅ Import S3 Upload Function
import "../components/styles/Login.css";
import WelcomeSection from "../components/WelcomeSection";

const TutorSignUp: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    fullName: string;
    nric: string;
    subjects: string[];
    levels: string;
    location: string;
    bio: string;
  }>({
    email: "",
    password: "",
    fullName: "",
    nric: "",
    subjects: [],
    levels: "",
    location: "",
    bio: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle checkbox changes for subjects
  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      subjects: checked
        ? [...prevData.subjects, value]
        : prevData.subjects.filter((subject) => subject !== value),
    }));
  };

  // ✅ Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // ✅ Ensure it's an image file before setting state
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }

      setSelectedFile(file);
    }
  };

  // ✅ Handle Form Submission
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🚀 Tutor form submission triggered!");

      let imageUrl = "/images/user.png"; // Default Profile Picture

      // ✅ Upload profile picture to S3 if a file is selected
      if (selectedFile) {
        try {
          const uploadedUrl = await uploadProfilePicture(
            selectedFile,
            formData.email
          );
          if (uploadedUrl) {
            imageUrl = uploadedUrl; // ✅ Use the uploaded image URL
          } else {
            throw new Error("Image upload failed.");
          }
        } catch (uploadError) {
          console.error("❌ Image upload failed:", uploadError);
          setError("Image upload failed. Please try again.");
          return;
        }
      }

      // ✅ Write data to Firestore in the "tutors" collection
      await addDoc(collection(db, "tutors"), {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        nric: formData.nric,
        subjects: formData.subjects,
        levels: formData.levels,
        location: formData.location,
        bio: formData.bio,
        photo: imageUrl, // ✅ Store S3 URL or default profile picture
        createdAt: new Date(),
      });

      alert("✅ Tutor registered successfully!");
      navigate("/LoginMain");
    } catch (err) {
      setError("❌ Error: " + (err as Error).message);
      console.error("❌ Firestore error:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="signup-box">
        <div className="register-section">
          <h2 className="signin-title">Register as a TUTOR</h2>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSignUp}>
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="input-field"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                name="password"
                className="input-field"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="input-field"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Profile Picture</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="input-group">
              <label className="input-label">NRIC</label>
              <input
                type="text"
                name="nric"
                className="input-field"
                placeholder="Enter your NRIC"
                value={formData.nric}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Subjects Taught</label>
              <div className="checkbox-group">
                {["English", "Mathematics", "Science", "Humanities"].map(
                  (subj) => (
                    <label key={subj}>
                      <input
                        type="checkbox"
                        name="subjects"
                        value={subj}
                        className="input-field"
                        checked={formData.subjects.includes(subj)}
                        onChange={handleSubjectChange}
                      />{" "}
                      {subj}
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Levels</label>
              <input
                type="text"
                name="levels"
                className="input-field"
                placeholder="Enter your levels"
                value={formData.levels}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Location</label>
              <input
                type="text"
                name="location"
                className="input-field"
                placeholder="Enter your location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Bio/Experience</label>
              <textarea
                name="bio"
                className="input-field-bio"
                placeholder="Enter your bio/experience"
                value={formData.bio}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="login-button">
              SIGN UP
            </button>
          </form>
        </div>
        <WelcomeSection></WelcomeSection>
      </div>
    </div>
  );
};

export default TutorSignUp;