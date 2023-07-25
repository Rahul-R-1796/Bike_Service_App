import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import BookingForm from './components/BookingForm';
import BookingHistory from './components/BookingHistory';
import AdminLogin from './components/AdminLogin';
import ChargesDetails from './components/ChargesDetails';
import './Styles/App.css';

function Home() {
  return (
    <div className="container">
      <h2>Welcome to Bike Service Booking System</h2>
      <nav>
        <Link to="/booking">Book Now</Link>
        <Link to="/admin-login">Admin Login</Link>
      </nav>
      <ChargesDetails /> {/* Include the ChargesDetails component */}
      {/* Add the footer */}  
      <footer>
        <div className="social-links">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
}

// Assume you have a function to check admin authentication status
// Replace this with your actual authentication logic
const isAuthenticated = () => {
  // For demonstration purposes, let's use localStorage to check if admin is authenticated
  return localStorage.getItem('isAdmin') === 'true';
};

function ProtectedRoute({ element }) {
  return isAuthenticated() ? element : <Navigate to="/admin-login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/booking-history" element={<ProtectedRoute element={<BookingHistory />} />} />
      </Routes>
    </Router>
  );
}

export default App;
