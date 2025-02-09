import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import Cookies from "js-cookie";
import GuestNav from "../components/GuestNav";
import AccountWidget from "../components/AccountWidget";
import "../components/styles/Reviews.css";

const Reviews: React.FC = () => {
  const navigate = useNavigate();
  const userEmail = Cookies.get("userEmail"); 
  const location = useLocation();
  const tutorEmailFromProfile = new URLSearchParams(location.search).get(
    "tutorEmail"
  );

  const [review, setReview] = useState({
    tutorEmail: tutorEmailFromProfile || "",
    rating: 5,
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userEmail) {
      alert("You must be logged in as a student to write a review.");
      return;
    }

    try {
      await addDoc(collection(db, "reviews"), {
        studentEmail: userEmail,
        tutorEmail: review.tutorEmail,
        rating: parseInt(review.rating.toString()),
        comment: review.comment,
        createdAt: new Date(),
      });

      alert("✅ Review submitted successfully!");
      navigate(`/reviews`); 
    } catch (error) {
      console.error("❌ Error submitting review:", error);
    }
  };

  return (
    <div className="homepage">
     
      <div
        className="d-flex justify-content-between"
        style={{ backgroundColor: "#B2d8e9" }}
      >
        <h2
          className="title"
          style={{
            fontSize: "60px",
            fontWeight: "bold",
            marginTop: "5px",
            marginRight: "120px",
          }}
        >
          TutorGo
        </h2>
        <img src="/images/logo.png" alt="Picture" className="logo-image pill" />
        <AccountWidget />
      </div>
      <GuestNav />
      <div className="review-container">
        <h2>Write a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Tutor Email</label>
            <input
              type="email"
              name="tutorEmail"
              value={review.tutorEmail}
              onChange={handleChange}
              required
              disabled={!!tutorEmailFromProfile} 
            />
          </div>

          <div className="input-group">
            <label>Rating</label>
            <input
              type="number"
              name="rating"
              value={review.rating}
              min="1"
              max="5"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Review</label>
            <textarea
              name="comment"
              placeholder="Write your review here..."
              value={review.comment}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
