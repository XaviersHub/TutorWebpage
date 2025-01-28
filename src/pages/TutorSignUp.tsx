import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🚀 Import useNavigate for redirection
import { collection, addDoc } from "firebase/firestore";
import { db } from "../database/firebaseConfig"; // Firestore config
import "../components/styles/Login.css";

const StudentSignUp: React.FC = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation hook

  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    subjects: string[];
    levels: string;
    location: string;
  }>({
    email: "",
    password: "",
    subjects: [],
    levels: "",
    location: "",
  });

  const [error, setError] = useState("");

  // Handle input changes for text fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle checkboxes for subject selection
  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      subjects: checked
        ? [...prevData.subjects, value] // Add subject if checked
        : prevData.subjects.filter((subject) => subject !== value), // Remove if unchecked
    }));
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🚀 Student form submission triggered!");

      // ✅ Write data directly to Firestore in "students" collection
      await addDoc(collection(db, "students"), {
        email: formData.email,
        password: formData.password, // Consider removing this for security
        subjects: formData.subjects,
        levels: formData.levels,
        location: formData.location,
        createdAt: new Date(),
      });

      alert("✅ Student registered successfully!");
      // 🚀 Redirect user to the Login page
      navigate("/LoginMain");
    } catch (err) {
      setError("❌ Error: " + (err as Error).message);
      console.error("❌ Firestore error:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="signup-box">
        <div className="signin-section">
          <h2 className="signin-title">Register as a STUDENT</h2>
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
              <label className="input-label">Subjects</label>
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

            <button type="submit" className="login-button">
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentSignUp;
