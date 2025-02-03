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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tutors:", error);
        setError("Failed to fetch tutor profiles. Please try again.");
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) return <p>Loading tutors...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      {/* Header Section */}
      <div
        className="d-flex justify-content-between"
        style={{ backgroundColor: "#BDEDF2" }}
      >
        <SearchBar />
        <AccountWidget />
      </div>
      <NavBar />

      {/* Main Content */}
      <div className="container mt-4">
        <h1 className="mb-4">Find a Tutor</h1>

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
              {tutors.map((tutor) => (
                <tr
                  key={tutor.id}
                  style={{ backgroundColor: "#7EAAC9", color: "black" }}
                >
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
