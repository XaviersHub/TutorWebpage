import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import { uploadProfilePicture } from "../utils/s3Upload"; 
import "../components/styles/Login.css";
import WelcomeSection from "../components/WelcomeSection";

const StudentSignUp: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    subjects: string[];
    levels: string;
    location: string;
  }>({
    name:"",
    email: "",
    password: "",
    subjects: [],
    levels: "",
    location: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null); 
  const [error, setError] = useState("");

  
  const isValidName = (name: string) => {
      return /^[A-Za-z\s]+$/.test(name); 
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      subjects: checked
        ? [...prevData.subjects, value]
        : prevData.subjects.filter((subject) => subject !== value),
    }));
  };

 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };


  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!selectedFile) {
      alert("❌ Please upload a profile picture.");
      return;
    }

    try {
      console.log("🚀 Uploading profile picture to S3...");


      const imageUrl = await uploadProfilePicture(selectedFile, formData.email);
      console.log("✅ Image uploaded successfully:", imageUrl);


      await addDoc(collection(db, "students"), {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        subjects: formData.subjects,
        levels: formData.levels,
        location: formData.location,
        photo: imageUrl, 
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
              <label className="input-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input-field"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  pattern="[A-Za-z\s]+" 
                  title="Only letters and spaces are allowed"
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
            <button
              className="btn btn-secondary back-button"
              onClick={() => navigate(-1)}
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ⬅ Back
            </button>

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
