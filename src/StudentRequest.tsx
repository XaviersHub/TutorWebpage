import React from 'react';

interface StudentRequestProps {
  name: string;
  onAccept: () => void;
  onReject: () => void;
}

const StudentRequest: React.FC<StudentRequestProps> = ({ name, onAccept, onReject }) => {
  return (
    <div className="student-request">
      <p>{name} is requesting to be added to your schedule</p>
      <button className="btn btn-success" onClick={onAccept}>Accept</button>
      <button className="btn btn-danger" onClick={onReject}>Reject</button>
    </div>
  );
};

export default StudentRequest;
