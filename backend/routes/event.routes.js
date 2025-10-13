// File: backend/routes/event.routes.js

// --- 1. IMPORTS ---
const express = require('express');
const router = express.Router();
const Event = require('../models/event.model');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// ------------------------------------------------------------------

// --- 2. PUBLIC ROUTES (for all users) ---

// GET ALL EVENTS (Public)
// Endpoint: GET /api/events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// REMOVED: The '/upcoming' route has been removed to eliminate the routing conflict.

// GET SINGLE EVENT BY ID (Public)
// Endpoint: GET /api/events/:id
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
            // This catches the 'Cast to ObjectId failed' error for an invalid ID format
            return res.status(404).json({ msg: 'Event not found (Invalid ID)' });
        }
        res.status(500).send('Server Error');
    }
});

// --- 3. ADMIN-ONLY ROUTES (protected by middleware) ---

// CREATE EVENT (Admin Only)
// Endpoint: POST /api/events
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

// UPDATE AN EVENT (Admin Only)
// Endpoint: PUT /api/events/:id
router.put('/:id', [auth, admin], async (req, res) => {
    const { title, description, date, location, price, seats, imageUrl } = req.body;
    const eventFields = { title, description, date, location, price, seats, imageUrl };
    try {
        let event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        event = await Event.findByIdAndUpdate(
            req.params.id,
            { $set: eventFields },
            { new: true }
        );
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE AN EVENT (Admin Only)
// Endpoint: DELETE /api/events/:id
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        // Use deleteOne for Mongoose
        await Event.deleteOne({ _id: req.params.id }); 
        res.json({ msg: 'Event removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// --- 4. EXPORT ROUTER ---
module.exports = router;