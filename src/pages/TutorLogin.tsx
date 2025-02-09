import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import Cookies from "js-cookie"; // ✅ Import js-cookie
import "../components/styles/Login.css";
import WelcomeSection from "../components/WelcomeSection";

const TutorLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🚀 Checking Firestore for tutor credentials...");

      const tutorsRef = collection(db, "tutors");
      const q = query(tutorsRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("❌ No account found with this email.");
        return;
      }

      let userFound = false;

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        console.log("✅ Found Tutor Data:", userData);

        if (userData.password === password) {
          console.log("✅ Password matches! Logging in...");
          userFound = true;

          // ✅ Store email in cookies (expires in 1 day)
          Cookies.set("userEmail", userData.email, { expires: 1 });

          alert("✅ Login successful!");
          navigate("/TutorHomepage"); // ✅ Redirect TutorHomepage
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
        <div className="signin-section">
          <h2 className="signin-title">TUTOR SIGN IN</h2>
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

export default TutorLogin;
