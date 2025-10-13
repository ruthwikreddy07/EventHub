// File: backend/server.js

// --- 1. IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // <-- Make sure this is here
const path = require('path');
require('dotenv').config();

// --- 2. INITIALIZE APP ---
const app = express();

// --- 3. MIDDLEWARE ---

// THIS IS THE CRITICAL FIX: Use the cors middleware
// This tells your server to add the necessary headers to allow requests from other origins.
app.use(cors()); 

// This allows the server to understand JSON from request bodies
app.use(express.json());

// --- 4. CONNECT TO MONGODB DATABASE ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// --- 5. DEFINE ALL API ROUTES ---
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/events', require('./routes/event.routes'));
app.use('/api/bookings', require('./routes/booking.routes'));
app.use('/api/analytics', require('./routes/analytics.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/payments', require('./routes/payment.routes'));

// --- 6. START THE SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));