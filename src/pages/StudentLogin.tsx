import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import for navigation
import { collection, query, where, getDocs } from "firebase/firestore"; // ✅ Firestore queries
import { db } from "../database/firebaseConfig"; // ✅ Import Firebase config
import "../components/styles/Login.css";
import WelcomeSection from "../components/WelcomeSection";

const StudentLogin = () => {
  const navigate = useNavigate(); // ✅ Navigation for redirect

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🚀 Checking Firestore for user...");

      // ✅ Query Firestore for student by email
      const studentsRef = collection(db, "students");
      const q = query(studentsRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("❌ No account found with this email.");
        return;
      }

      let userFound = false;

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        console.log("✅ Found User Data:", userData);

        if (userData.password === password) {
          console.log("✅ Password matches! Logging in...");
          userFound = true;
          navigate("/Homepage"); // ✅ Redirect to Homepage
        }
      });

      if (!userFound) {
        setError("❌ Incorrect password.");
      }
    } catch (err: any) {
      setError("❌ Login failed. Try again.");
      console.error("❌ Firestore error:", err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Sign-in Section */}
        <div className="signin-section">
          <h2 className="signin-title">STUDENT SIGN IN</h2>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input
                type="email"
                className="input-field"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">
              LOGIN
            </button>
          </form>
        </div>

        {/* Welcome Section */}
        <WelcomeSection />
      </div>
    </div>
  );
};

export default StudentLogin;
