import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import FAQ from "../pages/FAQ";
import Reviews from "../pages/Reviews";
import StudentLogin from "../pages/StudentLogin";
import StudentSignUp from "../pages/StudentSignUp";
import LoginMain from "../pages/LoginMain";
import TutorLogin from "../pages/TutorLogin";
import TutorSignUp from "../pages/TutorSignUp";
import TutorProfile from "../pages/TutorProfile"; // ✅ Add Tutor Profile Route

// Lazy load pages
const FindATutor = React.lazy(() => import("../pages/FindTutor"));
const BecomeATutor = React.lazy(() => import("../pages/BecomeTutor"));

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
          <Route
            path="/tutor-profile/:tutorId"
            element={<TutorProfile />}
          />{" "}
          {/* ✅ Tutor Profile Route */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
