// File: backend/routes/booking.routes.js

const express = require('express');
const router = express.Router();

// --- Middleware ---
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// --- Mongoose Models ---
const Booking = require('../models/booking.model');
const Event = require('../models/event.model');

// ------------------------------------------------------------------

/**
 * @route   POST api/bookings
 * @desc    Create a new booking
 * @access  Private (User must be logged in)
 */
router.post('/', auth, async (req, res) => {
  const { event: eventId } = req.body;

  try {
    // This logic provides all required fields to the Booking model
    const newBooking = new Booking({
      event: eventId,
      user: req.userId,      // This provides the required 'user' field from the auth token
      seatsBooked: 1         // This provides a default value for the required 'seatsBooked' field
    });

    const booking = await newBooking.save(); // This will now pass validation

    res.status(201).json(booking);
  } catch (err)
 {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/bookings/my-bookings
 * @desc    Get all bookings for the currently logged-in user
 * @access  Private (User must be logged in)
 */
router.get('/my-bookings', auth, async (req, res) => {
  try {
    // Find bookings by the user ID from the token
    const bookings = await Booking.find({ user: req.userId })
      .populate('event') // This replaces the event ID with the full event object
      .sort({ date: -1 }); // Sort by newest first

    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/bookings
 * @desc    Get all bookings for all users
 * @access  Private (Admins only)
 */
router.get('/', [auth, admin], async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email') // Populate user with only name and email
      .populate('event', 'title date'); // Populate event with only title and date

    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;