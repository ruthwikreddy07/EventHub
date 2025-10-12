// File: backend/routes/user.routes.js

const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// GET api/users
router.get('/', [auth, admin], async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ name: 1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT api/users/:id/role
router.put('/:id/role', [auth, admin], async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) { return res.status(404).json({ msg: 'User not found' }); }
        user.role = req.body.role;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE api/users/:id
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) { return res.status(404).json({ msg: 'User not found' }); }
        await user.deleteOne();
        res.json({ msg: 'User removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;