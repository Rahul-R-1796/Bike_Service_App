// AdminLogin.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Styles/AdminLogin.css'; 

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://bike-service-app.onrender.com/api/admin-login', {
        username,
        password,
      });

      if (response.status === 200) {
        // If login is successful, set isAdmin to true in localStorage
        localStorage.setItem('isAdmin', 'true');
        // Navigate to BookingHistory.js
        navigate('/booking-history');
      } else {
        setError('Invalid username or password. Please try again.');
      }

      // Clear the form fields after login attempt
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error while logging in:', error);
      setError('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div>
         <div className="admin-login-container">
      <h2 style="color: skyblue;">Admin Login</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p>Note </p>
        <p>      UserName: admin </p>
        <p>      Password: admin123</p>
      </form>
      </div>
    </div>
  );
};

export default AdminLogin;
