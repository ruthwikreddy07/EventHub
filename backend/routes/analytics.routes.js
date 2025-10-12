// File: backend/routes/analytics.routes.js

const express = require('express');
const router = express.Router();
const Booking = require('../models/booking.model');
const Event = require('../models/event.model');
const User = require('../models/user.model');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET api/analytics/summary
// @desc    Get a summary of application analytics
// @access  Private (Admin)
router.get('/summary', [auth, admin], async (req, res) => {
  try {
    // 1. Get total number of events
    const totalEvents = await Event.countDocuments();

    // 2. Get total number of users
    const totalUsers = await User.countDocuments();

    // 3. Get all bookings and populate event details to calculate revenue
    const allBookings = await Booking.find().populate('event');
    const totalBookings = allBookings.length;

    // 4. Calculate total revenue by summing the price of each booked event
    const totalRevenue = allBookings.reduce((acc, booking) => {
      // Add event price to accumulator, default to 0 if event is not populated
      return acc + (booking.event ? booking.event.price : 0);
    }, 0);

    // 5. Get the 5 most recent bookings
    const recentBookings = await Booking.find()
        .sort({ date: -1 })
        .limit(5)
        .populate('user', 'name')
        .populate('event', 'title');

    // 6. Send all data as a single JSON object
    res.json({
      totalEvents,
      totalUsers,
      totalBookings,
      totalRevenue,
      recentBookings
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;