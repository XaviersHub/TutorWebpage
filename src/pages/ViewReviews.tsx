import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import "../components/styles/Reviews.css";

interface Review {
  id: string;
  studentEmail: string;
  rating: number;
  comment: string;
}

const ViewReviews: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tutorEmail = new URLSearchParams(location.search).get("tutorEmail");
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!tutorEmail) return;

      try {
        const reviewsRef = collection(db, "reviews");
        const q = query(reviewsRef, where("tutorEmail", "==", tutorEmail));
        const querySnapshot = await getDocs(q);

        const tutorReviews: Review[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Review[];

        setReviews(tutorReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [tutorEmail]);

  return (
    <div className="review-container">
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
      <h2>Reviews for {tutorEmail}</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review-box">
            <p>
              <strong>{review.studentEmail}</strong>
            </p>
            <p>Rating: {"⭐".repeat(review.rating)}</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ViewReviews;
