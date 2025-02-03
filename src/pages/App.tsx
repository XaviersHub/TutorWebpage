import React from "react";
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
const FindATutor = React.lazy(() => import("./FindTutor"));
const BecomeATutor = React.lazy(() => import("./BecomeTutor"));

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Define the route for the homepage */}
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
      </Routes>
    </Router>
  );
};

export default App;
