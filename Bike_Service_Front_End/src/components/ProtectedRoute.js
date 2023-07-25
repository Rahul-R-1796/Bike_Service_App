// ProtectedRoute.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ component: Component }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const checkAdminAuthentication = async () => {
      try {
        const adminCredentials = {
          username: 'admin',     // Enter the correct admin username
          password: 'admin123', // Enter the correct admin password
        };

        const response = await axios.get('https://bike-service-app.onrender.com/api/is-admin-authenticated', {
          headers: adminCredentials,
        });

        if (response.status === 200) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          navigate('/admin-login');
        }
      } catch (error) {
        console.error('Error while checking admin authentication:', error);
        setIsAdmin(false);
        navigate('/admin-login');
      }
    };

    checkAdminAuthentication();
  }, [navigate]);

  if (!isAdmin) {
    // You can show a loading spinner or custom message here if needed
    return null;
  }

  return <Component />;
};

export default ProtectedRoute;
