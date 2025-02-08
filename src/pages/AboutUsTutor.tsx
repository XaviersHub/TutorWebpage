import React from "react";
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";
import "../components/styles/HeaderSec.css";
import NavBarTutor from "../components/NavBarTutor";

const AboutUsTutor = () => {
  return (
    <div className="homepage">
      <div
        className="d-flex justify-content-between"
        style={{ backgroundColor: "#B2D8E9" }}
      >
        {/* <SearchBar /> */}
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
      <NavBarTutor />
      <div className="container mt-4">
        <div className="cardrow align-items-center">
          <div className="card-title">
            <strong>Our Team/Who We Are</strong>
            <div className="cards">
              <p className="whoweare">Xavier:</p>
              <p className="whoweare">Frontend and Backend Development:</p>
              <div className="aboutus">
                <ul>
                  <li>
                    Created Reusable components for the webpage (eg. Navigation
                    bar, Account widget)
                  </li>
                  <li>
                    Focused on backend logic, cloud integration, and real-time
                    data handling
                  </li>
                  <li>
                    Using Firebase Firestore, I implemented secure data storage
                    for user authentication, scheduling, and student-tutor
                    interactions
                  </li>
                  <li>
                    Integrated AWS S3 for seamless image uploads and retrievals
                  </li>
                  <li>
                    Ensured dynamic UI updates, allowing students to follow
                    tutors and access public and private lessons in real time
                    along with development of the review system
                  </li>
                </ul>
              </div>
              <p className="whoweare">Takumi:</p>
              <p className="whoweare">Frontend and Backend Development:</p>
              <div className="aboutus">
                <ul>
                  <li>
                    Focused on backend logic, cloud integration, and real-time
                    data handling
                  </li>
                  <li>
                    Using Firebase Firestore, implemented secure data storage
                    for user authentication
                  </li>
                  <li>
                    Ensured dynamic UI updates, implementated account creation
                    and storage for respective profiles
                  </li>
                  <li>
                    Integrated chatroom features between students and tutors
                  </li>
                </ul>
              </div>
              <p className="whoweare">Skye:</p>
              <p className="whoweare">Frontend and Backend Development:</p>
              <div className="aboutus">
                <ul>
                  <li>
                    Implemented tutor profile with edit functionality, syncing
                    updates to Firebase Firestore
                  </li>
                  <li>
                    Cleaned up UI for tutor side and enabled tutors to view
                    reviews made for them
                  </li>
                  <li>
                    Added a following tab for both students and tutors UI,
                    including a button that directs to the chatroom
                  </li>
                  <li>
                    Added a filter on the student UI to display tutors based on
                    subjects and levels taught
                  </li>
                  <li>
                    Ensured that the "Find Tutor" feature for students excludes
                    tutors the student is already following
                  </li>
                </ul>
              </div>
              <p className="whoweare">Frinze:</p>
              <p className="whoweare">Frontend Development:</p>
              <div className="aboutus">
                <ul>
                  <li>Focused on Frontend logic, Styling and Responsiveness</li>
                  <li>
                    implemented css files and styled the overall ui of the
                    website including logo and various other elements.
                  </li>
                  <li>
                    ⁠implemented google fonts api for quality look of the
                    webpage
                  </li>
                </ul>
              </div>
              <p className="whoweare">Backend Development:</p>
              <div className="aboutus">
                <ul>
                  <li>
                    created an unfollow/remove function on the backend which
                    updates the firebase to remove a student follower.
                  </li>
                </ul>
              </div>
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

export default AboutUsTutor;
