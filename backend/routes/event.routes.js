// File: backend/routes/event.routes.js

const express = require('express');
const router = express.Router();
const Event = require('../models/event.model');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// --- PUBLIC ROUTES (No changes needed here) ---
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

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

// --- ADMIN-ONLY ROUTES ---

// CREATE EVENT (Your existing code was already correct)
router.post('/', [auth, admin], async (req, res) => {
    const { title, description, date, location, price, seats, imageUrl, bannerImageUrl } = req.body;
    try {
        const newEvent = new Event({ title, description, date, location, price, seats, imageUrl, bannerImageUrl });
        const event = await newEvent.save();
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// UPDATE AN EVENT (This is the corrected part)
router.put('/:id', [auth, admin], async (req, res) => {
    // CRITICAL FIX: Add bannerImageUrl to the destructuring
    const { title, description, date, location, price, seats, imageUrl, bannerImageUrl } = req.body;
    
    // CRITICAL FIX: Add bannerImageUrl to the fields to be updated
    const eventFields = { title, description, date, location, price, seats, imageUrl, bannerImageUrl };

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

// DELETE AN EVENT (No changes needed)
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        await Event.deleteOne({ _id: req.params.id }); 
        res.json({ msg: 'Event removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;