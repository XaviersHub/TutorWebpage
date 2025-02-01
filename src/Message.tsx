import React, { useState } from 'react';
import "./Message.css"

const Message: React.FC = () => {
  // Dummy list of students
  const [students] = useState([
    { id: 1, name: 'John Tan' },
    { id: 2, name: 'Sarah Lee' },
    { id: 3, name: 'Timothy Khoo' },
    { id: 4, name: 'Rachel Chua' },
    { id: 5, name: 'Samuel Ong' },
  ]);


  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const handleStudentClick = (name: string) => {
    setSelectedStudent(name);
  };

  return (
    <div>
      <h1>Messages</h1>
      <h5>Click on a student's name to start chatting</h5>

      <div className="student-list">
        {students.map((student) => (
          <div
            key={student.id}
            className="student-item"
            onClick={() => handleStudentClick(student.name)}
          >
            <p>{student.name}</p>
          </div>
        ))}
      </div>

      {selectedStudent && (
        <div className="chat-window">
          <h5>Chat with {selectedStudent}</h5>
          {/* This is where you'd add chat functionality, for now it's just a placeholder */}
          <div className="chat-box">
            <p>Welcome to the chat with {selectedStudent}!</p>
            {/* Add chat interface here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
