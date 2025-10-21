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
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  // Use eventId for clarity, it matches what the frontend sends
  const { eventId } = req.body; 

  try {
    // This is the critical fix: use req.user.id from the auth middleware
    const userId = req.user.id; 

    const newBooking = new Booking({
      event: eventId,
      user: userId,
      seatsBooked: 1
    });

    const booking = await newBooking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/bookings/my-bookings
 * @desc    Get all bookings for the currently logged-in user
 * @access  Private
 */
router.get('/my-bookings', auth, async (req, res) => {
  try {
    // This is the second critical fix for the same issue
    const bookings = await Booking.find({ user: req.user.id }) 
      .populate('event')
      .sort({ date: -1 });

    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/bookings
 * @desc    Get all bookings (Admin)
 * @access  Private (Admin)
 */
router.get('/', [auth, admin], async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('event', 'title date');
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;