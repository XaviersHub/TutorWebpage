import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import { uploadProfilePicture } from "../utils/s3Upload"; // ✅ Import AWS S3 upload function
import "../components/styles/Login.css";
import WelcomeSection from "../components/WelcomeSection";

const StudentSignUp: React.FC = () => {
  const navigate = useNavigate();

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

  const [selectedFile, setSelectedFile] = useState<File | null>(null); // ✅ Declare state for file
  const [error, setError] = useState("");

  // ✅ Handle input changes for text fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle checkboxes for subject selection
  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      subjects: checked
        ? [...prevData.subjects, value]
        : prevData.subjects.filter((subject) => subject !== value),
    }));
  };

  // ✅ Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // ✅ Handle form submission
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!selectedFile) {
      alert("❌ Please upload a profile picture.");
      return;
    }

    try {
      console.log("🚀 Uploading profile picture to S3...");

      // ✅ Upload profile picture & get S3 URL
      const imageUrl = await uploadProfilePicture(selectedFile, formData.email);
      console.log("✅ Image uploaded successfully:", imageUrl);

      // ✅ Add student data to Firestore
      await addDoc(collection(db, "students"), {
        email: formData.email,
        password: formData.password,
        subjects: formData.subjects,
        levels: formData.levels,
        location: formData.location,
        photo: imageUrl, // ✅ Store S3 URL in Firestore
        createdAt: new Date(),
      });

      alert("✅ Student registered successfully!");
      navigate("/LoginMain");
    } catch (err) {
      console.error("❌ Firestore error:", err);
      setError("❌ Failed to register. Please try again.");
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
              <label className="input-label">Profile Picture</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="input-group">
              <label className="input-label">Subjects</label>
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

export default StudentSignUp;
