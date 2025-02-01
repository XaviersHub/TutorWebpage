import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profile from './Profile'; // Ensure the correct import paths
import MySchedule from './MySchedule';
import Message from './Message';
import StudentRequest from './StudentRequest';
import HomePage from './HomePage';


const App: React.FC = () => {
  return (
    <>
    <StudentRequest/>
    </>
  );
}

export default App;
