import React, { useEffect, useState } from "react";
import { db } from "../database/firebaseConfig"; // Firestore config
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore methods
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import "../components/styles/FindTutor.css";
import Cookies from "js-cookie";

interface Tutor {
  id: string;
  fullName: string;
  subjects: string[];
  levels: string;
  location: string;
  email: string;
}

const FindTutor = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>([]); // **New state for filtered tutors**
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>(""); // **State for subject filter**
  const [levelFilter, setLevelFilter] = useState<string>(""); // **State for level filter**
  const [followingTutors, setFollowingTutors] = useState<string[]>([]); // **State for following tutor emails**
  const navigate = useNavigate();
  const userEmail = Cookies.get("userEmail"); // Get the logged-in student's email

  useEffect(() => {
    // Fetch the list of tutors
    const fetchTutors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tutors"));
        const tutorList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Tutor[];
        setTutors(tutorList);
        setFilteredTutors(tutorList); // Initially show all tutors
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tutors:", error);
        setError("Failed to fetch tutor profiles. Please try again.");
        setLoading(false);
      }
    };

    // Fetch the list of tutors the student is following
    const fetchFollowingTutors = async () => {
      if (!userEmail) return;

      try {
        const studentsRef = collection(db, "students");
        const studentQuery = query(studentsRef, where("email", "==", userEmail));
        const studentSnapshot = await getDocs(studentQuery);

        if (!studentSnapshot.empty) {
          const studentData = studentSnapshot.docs[0].data();
          const followingList: string[] = studentData.following || [];
          setFollowingTutors(followingList); // Store the list of emails the student is following
        } else {
          setFollowingTutors([]);
        }
      } catch (error) {
        console.error("Error fetching following tutors:", error);
      }
    };

    fetchTutors();
    fetchFollowingTutors();
  }, [userEmail]);

  useEffect(() => {
    let filtered = tutors;

 
    filtered = filtered.filter(tutor => !followingTutors.includes(tutor.email));

    if (subjectFilter) {
      filtered = filtered.filter(tutor =>
        tutor.subjects.some(subject => subject.toLowerCase().includes(subjectFilter.toLowerCase()))
      );
    }

    if (levelFilter) {
      filtered = filtered.filter(tutor => tutor.levels.toLowerCase().includes(levelFilter.toLowerCase()));
    }

    setFilteredTutors(filtered);
  }, [subjectFilter, levelFilter, tutors, followingTutors]);

  if (loading) return <p>Loading tutors...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="homepage">
 
      <div className="d-flex justify-content-between" style={{ backgroundColor: "#B2d8e9" }}>
        <h2 className="title" style={{ fontSize: "60px", fontWeight: "bold", marginTop: "5px", marginRight: "120px" }}>TutorGo</h2>
        <img src="/images/logo.png" alt="Logo" className="logo-image pill" />
        <AccountWidget />
      </div>
      <NavBar />

      <div className="container mt-4">
        <h1 className="mb-4" style={{fontFamily:"IBM_Plex_Serif", fontWeight:"900"}}>Find a Tutor</h1>

   
        <div className="d-flex mb-4">
          <div className="me-3">
            <label style={{fontFamily:"IBM_Plex_Serif", fontWeight:"900"}}>Subject:</label>
            <select
              className="form-select"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)} 
            >
              <option value="">All Subjects</option>
              {tutors
                .flatMap(tutor => tutor.subjects)
                .filter((value, index, self) => self.indexOf(value) === index) 
                .map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
            </select>
          </div>

          <div>
            <label style={{fontFamily:"IBM_Plex_Serif", fontWeight:"900"}}>Level:</label>
            <select
              className="form-select"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)} 
            >
              <option value="">All Levels</option>
              {tutors
                .map(tutor => tutor.levels)
                .filter((value, index, self) => self.indexOf(value) === index) 
                .map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
            </select>
          </div>
        </div>


        <div className="table-responsive">
          <table style={{ backgroundColor: "#F8F8F8", fontFamily:"IBM_Plex_Serif", fontWeight:"bold" }}className="table table-bordered">
            <thead style={{  fontFamily:"IBM_Plex_Serif" }}>
              <tr style={{color:"#f8f8f8"}}>
                <th>Name</th>
                <th>Subjects</th>
                <th>Level</th>
                <th>Location</th>
                <th>Email</th>
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
  
              {filteredTutors.map((tutor) => (
                <tr key={tutor.id} style={{ backgroundColor: "#F8F8f8", color: "black" }}>
                  <td>{tutor.fullName}</td>
                  <td>{tutor.subjects.join(", ")}</td>
                  <td>{tutor.levels}</td>
                  <td>{tutor.location}</td>
                  <td>
                    <a href={`mailto:${tutor.email}`}>{tutor.email}</a>
                  </td>
                  <td>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      if (!userEmail) {  
                        alert("You must be signed in to view profiles.");
                        setTimeout(() => navigate("/LoginMain"), 500);
                      } else {
                        navigate(`/tutor-profile/${tutor.id}`);
                      }
                    }}
                  >
                    View Profile
                  </button>
                  </td>
                </tr>

              ))}
                  <tr> 
                  <td> No More Tutors </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FindTutor;
