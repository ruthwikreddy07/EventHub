// File: backend/routes/event.routes.js

const express = require('express');
const router = express.Router();
const Event = require('../models/event.model');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// GET ALL EVENTS (Public)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET SINGLE EVENT BY ID (Public)
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found (Invalid ID)' });
    }
    res.status(500).send('Server Error');
  }
});

// CREATE EVENT (Admin Only)
router.post('/', [auth, admin], async (req, res) => {
  const { title, description, date, location, price, seats, imageUrl } = req.body;
  try {
    const newEvent = new Event({ title, description, date, location, price, seats, imageUrl });
    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- ADD THIS NEW ROUTE ---
// DELETE AN EVENT (Admin Only)
// @route   DELETE api/events/:id
// @desc    Delete an event by its ID
// @access  Private (Admin)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    await event.deleteOne(); // Mongoose v6+ uses deleteOne()

    res.json({ msg: 'Event removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// File: backend/routes/event.routes.js
// ... after your DELETE route ...

// --- ADD THIS NEW ROUTE ---
// UPDATE AN EVENT (Admin Only)
// @route   PUT api/events/:id
// @desc    Update an event by its ID
// @access  Private (Admin)
router.put('/:id', [auth, admin], async (req, res) => {
  // Destructure the fields from the request body
  const { title, description, date, location, price, seats, imageUrl } = req.body;
  const eventFields = { title, description, date, location, price, seats, imageUrl };

  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Use findByIdAndUpdate to update the document
    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: eventFields },
      { new: true } // This option returns the document after it has been updated
    );

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

