import React, { useState } from 'react';
import axios from 'axios';
import './Styles/BookingForm.css'; 

const BookingForm = () => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [preferTimeSlot, setPreferTimeSlot] = useState('');
  const [bikeName, setBikeName] = useState('');
  const [bikeComplaintDetails, setBikeComplaintDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookingData = {
        fullName,
        mobileNumber,
        bookingDate,
        preferTimeSlot,
        bikeName,
        bikeComplaintDetails,
      };

      const response = await axios.post('https://bike-service-app.onrender.com/api/book-service', bookingData);

      if (response.status === 201) {
        // Booking successful
        console.log('Booking successful:', response.data);
        alert('Booking successful!');
        // Clear the form fields after successful submission
        setFullName('');
        setMobileNumber('');
        setBookingDate('');
        setPreferTimeSlot('');
        setBikeName('');
        setBikeComplaintDetails('');
      } else if (response.status === 400) {
        // Slot already booked
        console.log('Booking slot not available:', response.data);
        alert('This slot is not available already booked by some other customer!.');
      } else {
        // Other error occurred
        console.error('Error while submitting booking:', response.data);
        alert('This slot is not available already booked by some other customer!!');
      }
    } catch (error) {
      console.error('Error while submitting booking:', error);
      alert('This slot is not available already booked by some other customer!!!');
    }
  };


  return (
    <div>
       <div className="booking-form-container">
      <h2>Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="bookingDate">Booking Date:</label>
          <input
            type="date"
            id="bookingDate"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="preferTimeSlot">Preferred Time Slot:</label>
          <select
            id="preferTimeSlot"
            value={preferTimeSlot}
            onChange={(e) => setPreferTimeSlot(e.target.value)}
            required
          >
            <option value="">Select Time Slot</option>
            <option value="8-10am">8-10am</option>
            <option value="11-1pm">11-1pm</option>
            <option value="2-5pm">2-5pm</option>
          </select>
        </div>
        <div>
          <label htmlFor="bikeName">Bike Name:</label>
          <input
            type="text"
            id="bikeName"
            value={bikeName}
            onChange={(e) => setBikeName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="bikeComplaintDetails">Bike Complaint Details:</label>
          <textarea
            id="bikeComplaintDetails"
            value={bikeComplaintDetails}
            onChange={(e) => setBikeComplaintDetails(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book Now</button>
      </form>
      </div>
    </div>
  );
};

export default BookingForm;
