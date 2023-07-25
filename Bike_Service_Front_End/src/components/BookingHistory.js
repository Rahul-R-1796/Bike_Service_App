// BookingHistory.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Styles/BookingHistory.css'; 

const BookingHistory = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        // Assuming you have a proper authentication mechanism in your app to check if the user is an admin
        // For this example, we'll assume admin is hardcoded in the component, but in a real app, use a secure method
        const adminCredentials = {
          username: 'admin', // Enter the correct admin username
          password: 'admin123', // Enter the correct admin password
        };

        const response = await axios.get('https://bike-service-app.onrender.com/api/book-service', {
          headers: adminCredentials,
        });

        setBookingHistory(response.data);
        setIsAdmin(true);
      } catch (error) {
        console.error('Error while fetching booking history:', error);
        setIsAdmin(false);
      }
    };

    fetchBookingHistory();
  }, []);

  const handleDeleteBooking = async (bookingId) => {
    try {
      const adminCredentials = {
        username: 'admin', // Enter the correct admin username
        password: 'admin123', // Enter the correct admin password
      };

      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for deleting a booking entry on the server.
      await axios.delete(`https://bike-service-app.onrender.com/api/book-service/${bookingId}`, {
        headers: adminCredentials,
      });

      // Update the booking history after successful deletion
      setBookingHistory((prevHistory) => prevHistory.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error('Error while deleting booking:', error);
    }
  };

  if (!isAdmin) {
    return <div>Unauthorized. Only admins can view booking history.</div>;
  }

  return (
    <div className="booking-history-container">
      <h2>Booking History</h2>
      <table>
        <thead>
          <tr>
            <th>Bike Model</th>
            <th>Customer Name</th>
            <th>Contact Number</th>
            <th>Complain Details</th>
            <th>Date</th>
            <th>Preferred Time Slot</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookingHistory.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.bikeModel}</td>
              <td>{booking.customerName}</td>
              <td>{booking.contactNumber}</td>
              <td>{booking.complainDetails}</td>
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>{booking.preferTimeSlot}</td>
              <td>
                <button onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingHistory;
