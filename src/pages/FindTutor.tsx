import React, { useEffect, useState } from "react";
import { db } from "../database/firebaseConfig"; // Firestore config
import { collection, getDocs } from "firebase/firestore"; // Firestore methods
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tutors"));
        const tutorList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Tutor[];
        setTutors(tutorList);
        setFilteredTutors(tutorList); // **Initially show all tutors**
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tutors:", error);
        setError("Failed to fetch tutor profiles. Please try again.");
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  // **Filtering logic based on selected subject and level**
  useEffect(() => {
    let filtered = tutors;

    if (subjectFilter) {
      filtered = filtered.filter(tutor =>
        tutor.subjects.some(subject => subject.toLowerCase().includes(subjectFilter.toLowerCase()))
      );
    }

    if (levelFilter) {
      filtered = filtered.filter(tutor => tutor.levels.toLowerCase().includes(levelFilter.toLowerCase()));
    }

    setFilteredTutors(filtered);
  }, [subjectFilter, levelFilter, tutors]);

  if (loading) return <p>Loading tutors...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      {/* Header Section */}
      <div className="d-flex justify-content-between" style={{ backgroundColor: "#BDEDF2" }}>
        <h2 className="title" style={{ fontSize: "60px", fontWeight: "bold", marginTop: "5px", marginRight: "120px" }}>TutorGo</h2>
        <img src="/images/logo.png" alt="Logo" className="logo-image pill" />
        <AccountWidget />
      </div>
      <NavBar />

      {/* Main Content */}
      <div className="container mt-4">
        <h1 className="mb-4">Find a Tutor</h1>

        {/* **Filter Section** */}
        <div className="d-flex mb-4">
          <div className="me-3">
            <label>Subject:</label>
            <select
              className="form-select"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)} // **Updating subject filter**
            >
              <option value="">All Subjects</option>
              {tutors
                .flatMap(tutor => tutor.subjects)
                .filter((value, index, self) => self.indexOf(value) === index) // **Get unique subjects**
                .map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
            </select>
          </div>

          <div>
            <label>Level:</label>
            <select
              className="form-select"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)} // **Updating level filter**
            >
              <option value="">All Levels</option>
              {tutors
                .map(tutor => tutor.levels)
                .filter((value, index, self) => self.indexOf(value) === index) // **Get unique levels**
                .map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
            </select>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead style={{ backgroundColor: "#BDEDF2" }}>
              <tr>
                <th>Name</th>
                <th>Subjects</th>
                <th>Level</th>
                <th>Location</th>
                <th>Email</th>
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
              {/* **Rendering filtered tutors** */}
              {filteredTutors.map((tutor) => (
                <tr key={tutor.id} style={{ backgroundColor: "#7EAAC9", color: "black" }}>
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
                      onClick={() => navigate(`/tutor-profile/${tutor.id}`)}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FindTutor;
