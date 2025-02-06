import React, { useEffect, useState } from "react";
import { db } from "../database/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import Cookies from "js-cookie";
import AccountWidget from "../components/AccountWidget";
import NavBarTutor from "../components/NavBarTutor";
import "../components/styles/Reviews.css"; // Add your custom styles

// Define the Review type
interface Review {
  id: string;
  studentEmail: string;
  rating: number;
  comment: string;
}

const ViewReviewsTutor = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const email = Cookies.get("userEmail"); // Get the email from cookies

      if (!email) {
        setError("❌ No user logged in.");
        setLoading(false);
        return;
      }

      try {
        // Query Firestore for reviews based on the tutor's email
        const reviewsRef = collection(db, "reviews");
        const q = query(reviewsRef, where("tutorEmail", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("❌ No reviews found.");
        } else {
          // Extract review data and set the state
          const fetchedReviews: Review[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            studentEmail: doc.data().studentEmail,
            rating: Number(doc.data().rating), // Ensure rating is a number
            comment: doc.data().comment,
          }));

          setReviews(fetchedReviews);
        }
      } catch (error) {
        setError("❌ Error fetching reviews.");
        console.error("❌ Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews(); // Fetch reviews on component mount
  }, []); // Empty dependency array ensures this runs only once when the component mounts

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
        <h2 className="title" style={{ fontSize: "60px", fontWeight: "bold", marginTop: "5px", marginRight: "120px" }}>TutorGo</h2>
        <img src="/images/logo.png" alt="Logo" className="logo-image pill" />
        <AccountWidget />
      </div>
      <NavBarTutor />
      <div className="reviews-container">
        <h2>Your Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-box">
              <p><strong>{review.studentEmail}</strong></p>
              <p>Rating: {"⭐".repeat(review.rating)}</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ViewReviewsTutor;
