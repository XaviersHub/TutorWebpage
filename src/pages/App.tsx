import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutUs from "../pages/AboutUs";
import Contact from "./Contact";
import FAQ from "./FAQ";
import Reviews from "./Reviews";
import StudentLogin from "./StudentLogin";
import StudentSignUp from "./StudentSignUp";
import LoginMain from "./LoginMain";
import TutorLogin from "./TutorLogin";
import TutorSignUp from "./TutorSignUp";
import StudentHomepage from "./StudentHomepage";
import TutorHomepage from "./TutorHomepage";
import TutorProfile from "../pages/TutorProfile"; // ✅ Add Tutor Profile Route
import TuteeChatRoom from "./TuteeChatRoom";
import ViewReviews from "./ViewReviews";
import Profile from "./Profile";
import AboutUsTutor from "./AboutUsTutor";
import ContactTutor from "./ContactTutor";
import FAQTutor from "./FAQTutor";
import ViewReviewsTutor from "./ViewReviewsTutor";
import FollowedStudents from "./FollowedStudents";
import FollowedStudentsD from "./FFFFFollowedStudents copy";
const FindATutor = React.lazy(() => import("./FindTutor"));
const BecomeATutor = React.lazy(() => import("./BecomeTutor"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        {" "}
        {/* ✅ Suspense handles lazy loading */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/find-tutor" element={<FindATutor />} />
          <Route path="/become-tutor" element={<BecomeATutor />} />
          <Route path="/loginmain" element={<LoginMain />} />
          <Route path="/studentlogin" element={<StudentLogin />} />
          <Route path="/studentsignup" element={<StudentSignUp />} />
          <Route path="/tutorlogin" element={<TutorLogin />} />
          <Route path="/tutorsignup" element={<TutorSignUp />} />
          <Route path="/studenthomepage" element={<StudentHomepage />} />
          <Route path="/tutorhomepage" element={<TutorHomepage />} />
          <Route path="/write-review" element={<Reviews />} />
          <Route path="/view-reviews" element={<ViewReviews />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/aboutTutor" element={<AboutUsTutor />} />
          <Route path="/contactTutor" element={<ContactTutor />} />
          <Route path="/faqsTutor" element={<FAQTutor />} />
          <Route path="/view-reviewsTutor" element={<ViewReviewsTutor />} />
          <Route path="/followers" element={<FollowedStudents />} />
          <Route path="/followersd" element={<FollowedStudentsD />} />






          <Route
            path="/tutor-profile/:tutorId"
            element={<TutorProfile />}
          />{" "}
          {/* ✅ Tutor Profile Route */}
          <Route path="/chat/:chatroomId" element={<TuteeChatRoom />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
