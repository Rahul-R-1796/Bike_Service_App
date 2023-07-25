// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://rahulrajenderan96:rahulrajenderan96@bikeservicebooking.oph51k5.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose Schema and Model
const bookingSchema = new mongoose.Schema({
  bikeModel: String,
  customerName: String,
  contactNumber: String,
  complainDetails: String,
  date: { type: Date, default: Date.now },
  preferTimeSlot: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

// Hard-coded admin credentials (demo purposes only, in a real app use a secure method)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Middleware for admin authentication
const authenticateAdmin = (req, res, next) => {
  const { username, password } = req.headers;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return next(); // Continue to the next middleware or route handler
  }

  return res.status(401).json({ message: 'Unauthorized.' });
};

app.post('/api/admin-login', (req, res) => {
  const { username, password } = req.body;

  // Check if the entered credentials match the hard-coded admin credentials
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.status(200).json({ message: 'Login successful.' });
  }

  return res.status(401).json({ message: 'Invalid username or password.' });
});

app.get('/', (req, res) => {
  res.send('Welcome to my Node.js application!');
});

// API endpoint for booking a service
app.post('/api/book-service', async (req, res) => {
  try {
    const { fullName, mobileNumber, bookingDate, preferTimeSlot, bikeName, bikeComplaintDetails } = req.body;

    // Check if there is already a booking with the same date and time slot
    const existingBooking = await Booking.findOne({
      date: bookingDate,
      preferTimeSlot,
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Booking slot is already taken for this date and time.' });
    }

    // Create a new booking entry
    const booking = new Booking({
      bikeModel: bikeName,
      customerName: fullName,
      contactNumber: mobileNumber,
      complainDetails: bikeComplaintDetails,
      date: bookingDate,
      preferTimeSlot,
    });

    await booking.save();

    return res.status(201).json({ message: 'Booking successful.' });
  } catch (error) {
    console.error('Error while booking service:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

// API endpoint for viewing all booking history (accessible to authenticated admins only)
app.get('/api/book-service', authenticateAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: -1 });
    return res.status(200).json(bookings);
  } catch (error) {
    console.error('Error while fetching booking history:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});
app.delete('/api/book-service/:bookingId', authenticateAdmin, async (req, res) => {
    try {
      const bookingId = req.params.bookingId;
      // Check if the booking entry exists in the database
      const existingBooking = await Booking.findById(bookingId);
      if (!existingBooking) {
        return res.status(404).json({ message: 'Booking not found.' });
      }
  
      // Delete the booking entry
      await existingBooking.deleteOne(); // Use deleteOne method to remove the document
  
      return res.status(200).json({ message: 'Booking deleted successfully.' });
    } catch (error) {
      console.error('Error while deleting booking:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  });
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
