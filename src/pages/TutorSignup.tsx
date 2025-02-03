import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🚀 Import useNavigate for redirection
import { collection, addDoc } from "firebase/firestore";
import { db } from "../database/firebaseConfig"; // Firestore config
import "../components/styles/Login.css";
import WelcomeSection from "../components/WelcomeSection";

const TutorSignUp: React.FC = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation hook

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

  const [error, setError] = useState("");

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  // Handle form submission
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🚀 Tutor form submission triggered!");

      // ✅ Write data to Firestore in the "tutors" collection
      await addDoc(collection(db, "tutors"), {
        email: formData.email,
        password: formData.password, // Consider removing this for security
        fullName: formData.fullName,
        nric: formData.nric,
        subjects: formData.subjects,
        levels: formData.levels,
        location: formData.location,
        bio: formData.bio,
        createdAt: new Date(),
      });

      alert("✅ Tutor registered successfully!");
      // 🚀 Redirect user to Login page
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
                {["English", "Mathematics", "Science", "Humanities"].map((subj) => (
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
                ))}
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