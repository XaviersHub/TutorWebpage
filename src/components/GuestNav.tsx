import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { db } from "../database/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./styles/Navbar.scss";

const NavBar: React.FC = () => {
  const [homeLink, setHomeLink] = useState<string>("/");
  const userEmail = Cookies.get("userEmail");

  useEffect(() => {
    const fetchUserType = async () => {
      if (!userEmail) return;

      try {
   
        const studentQuery = query(
          collection(db, "students"),
          where("email", "==", userEmail)
        );
        const studentSnapshot = await getDocs(studentQuery);
        if (!studentSnapshot.empty) {
          setHomeLink("/StudentHomepage"); 
          return;
        }

        const tutorQuery = query(
          collection(db, "tutors"),
          where("email", "==", userEmail)
        );
        const tutorSnapshot = await getDocs(tutorQuery);
        if (!tutorSnapshot.empty) {
          setHomeLink("/TutorHomepage");
          return;
        }
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };

    fetchUserType();
  }, [userEmail]);

  return (
    <nav
      className="navbar navbar-expand-lg bar-alignment"
      style={{ backgroundColor: "#B2D8E9" }}
    >
      <div className="container-fluid navbarSize">

        <div className="d-flex align-items-center">
          <a
            href="mailto:tutorapp533@gmail.com"
            className="nav-link active text-fade"
          >
            📧 Email
          </a>
        </div>


        <div className="navbar-nav mx-auto">
          <Link to={homeLink} className="nav-link active text-fade">
            HOME
          </Link>
      

          <Link to="/about" className="nav-link active text-fade">
            ABOUT US
          </Link>
          <Link to="/contact" className="nav-link active text-fade">
            CONTACT
          </Link>
          <Link to="/faqs" className="nav-link active text-fade">
            FAQS
          </Link>
          <Link to="/reviews" className="nav-link active text-fade">
            REVIEWS
          </Link>
        </div>

        <div className="d-flex">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link active socialMed"
          >
            <img src="/images/meta.png" className="widget-size" alt="Meta" />
          </a>
          <a
            href="https://www.instagram.com/findtutor_gg?igsh=Y2ZoeG1nM2lmNjR1&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link active socialMed"
          >
            <img src="/images/IG.png" className="widget-size" alt="Instagram" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;