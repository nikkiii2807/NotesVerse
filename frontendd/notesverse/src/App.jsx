import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa'; // Import a notebook icon
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';

const LandingPage = () => {
  const handleNavigateToLogin = () => {
    window.location.href = '/login'; // Redirect to the login page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      {/* Icon */}
      <div className="flex items-center justify-center bg-white rounded-full w-24 h-24 shadow-lg mb-6">
        <FaBookOpen className="text-6xl text-blue-500" />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-center drop-shadow-md">
        Welcome to <span className="text-yellow-300">NotesVerse</span>!
      </h1>

      {/* Subtitle */}
      <p className="text-lg mb-8 text-center max-w-md">
        Your ultimate platform to organize and manage your notes with ease. Sign in and start adding, updating, and searching notes today!
      </p>

      {/* Button */}
      <button
        className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 hover:text-gray-800 transition-all duration-300 shadow-md"
        onClick={handleNavigateToLogin}
      >
        Go to Login
      </button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
