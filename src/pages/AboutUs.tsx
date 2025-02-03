import React from "react";
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";
import "../components/styles/HeaderSec.css";

const AboutUs = () => {
  return (
    <div className="homepage">
      <div
        className="d-flex justify-content-between"
        style={{ backgroundColor: "#B2D8E9" }}
      >
        <SearchBar />
        <h2 className="title" style={{ fontSize: "60px", fontWeight: "bold", marginTop:"15px" }}>TutorGo</h2>
        <AccountWidget />
      </div>
      <NavBar />
      <div className="container mt-4">
        <div className="cardrow align-items-center">
          <div className="card-title">
            <strong>Our Team/Who We Are</strong>
            <div className="cards">
              <p className="cardtext">Xavier:</p>
              <p className="cardtext">Takumi:</p>
              <p className="cardtext">Skye:</p>
              <p className="cardtext">Frinze:</p>
            </div>
          </div>
          <div className="card-title">
            <strong>Our Mission</strong>
            <div className="cards">
              <p className="cardtext">
                At findTutor, our <strong>mission</strong> is to bridge the gap
                between passionate educators and eager learners by creating a
                trusted, accessible, and effective platform for personalized
                learning. We aim to empower students to achieve their academic
                goals while providing tutors with the tools to share their
                expertise. Together, we strive to foster a culture of growth,
                trust, and excellence in education.
              </p>
            </div>
          </div>
          <div className="card-title">
            <strong>Core Values</strong>
            <div className="cards">
              <p className="cardtext">
                <div>
                  <strong>Trust</strong>: We ensure a secure and transparent
                  environment with identity verification for tutors and reliable
                  reviews from students. Accessibility: Our platform is designed
                  to make quality education accessible by connecting students
                  with nearby tutors.{" "}
                </div>
                <div>
                  <strong>Quality</strong>: We prioritize high standards by
                  enabling students to rate and review tutors, ensuring
                  continuous improvement.{" "}
                </div>
                <div>
                  <strong>Empowerment</strong>: We empower students to achieve
                  their academic goals and tutors to grow their teaching
                  practice.{" "}
                </div>
                <div>
                  <strong>Community</strong>: We foster a supportive network
                  that values growth, learning, and mutual respect.
                </div>
              </p>
            </div>
          </div>
          <div className="card-title">
            <strong>How It Works</strong>
            <div className="cards">
              <p className="cardtext">
                <strong>For Students:</strong>
                <div>
                  <strong>Search for Tutors</strong>: Use our intuitive search
                  feature to find tutors based on subject, level, and location.
                  <div>
                    <strong>View Profiles</strong>: Check detailed tutor
                    profiles, including qualifications, reviews, and ratings.{" "}
                  </div>
                  <div>
                    <strong>Contact Tutors</strong>: Message or email tutors
                    directly through the platform to discuss availability and
                    lessons.{" "}
                  </div>
                  <div>
                    <strong>Leave Feedback</strong>: After lessons, share your
                    experience by leaving a review to help others.
                  </div>
                </div>
                <strong>For Tutors:</strong>
                <div>
                  <strong>Create a Profile</strong>: Sign up, verify your NRIC
                  for security, and create a professional profile showcasing
                  your expertise.
                  <div>
                    <strong>Connect with Students</strong>: Receive inquiries
                    from students nearby and schedule lessons at your
                    convenience.
                  </div>
                  <div>
                    {" "}
                    <strong>Grow Your Reputation</strong>: Build credibility
                    through positive reviews and high ratings from students.{" "}
                  </div>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
