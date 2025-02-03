import React from "react";
import SearchBar from "../components/SearchBar";
import AccountWidget from "../components/AccountWidget";
import NavBar from "../components/NavBar";

const tutors = [
  {
    id: 1,
    photo: "https://i.ibb.co/wrp20vfk/tutor1.jpg",
    name: "John Doe",
    subject: "Mathematics",
    level: "Sec 4",
    rating: 4,
  },
  {
    id: 2,
    photo: "https://i.ibb.co/3qqRx4J/tutor2.jpg",
    name: "Sarah Lee",
    subject: "Chemistry",
    level: "Sec 3",
    rating: 5,
  },
  {
    id: 3,
    photo: "https://i.ibb.co/WWBdH3mf/image.png",
    name: "Michael Tan",
    subject: "Physics",
    level: "Sec 4",
    rating: 4,
  },
  {
    id: 4,
    photo: "https://i.ibb.co/Lz704P1Q/tutor4.webp",
    name: "Priya Sharma",
    subject: "English",
    level: "Sec 2",
    rating: 3,
  },
];

const FindTutor = () => {
  return (
    <div>
      <div
        className="d-flex justify-content-between"
        style={{ backgroundColor: "#BDEDF2" }}
      >
        {/* <SearchBar /> */}
        <h2 className="title" style={{ fontSize: "60px", fontWeight: "bold", marginTop:"5px", marginRight:"120px" }}>TutorGo</h2>
        <img src="/images/logo.png" alt="Picture" className="logo-image pill" />
        <AccountWidget />
      </div>
      <NavBar />
      <div className="container mt-4">
        <h1 className="mb-4">Profiles</h1>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead style={{ backgroundColor: "#BDEDF2" }}>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Level</th>
                <th>Rating</th>
                <th>Full Profile</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((tutor) => (
                <tr
                  key={tutor.id}
                  style={{ backgroundColor: "#7EAAC9", color: "black" }}
                >
                  <td>
                    <img
                      src={tutor.photo}
                      alt={tutor.name}
                      className="rounded"
                      style={{ width: "80px", height: "80px" }}
                    />
                  </td>
                  <td>{tutor.name}</td>
                  <td>{tutor.subject}</td>
                  <td>{tutor.level}</td>
                  <td>
                    {"★".repeat(tutor.rating) + "☆".repeat(5 - tutor.rating)}
                  </td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => alert(`Contacting ${tutor.name}`)}
                    >
                      Contact
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
