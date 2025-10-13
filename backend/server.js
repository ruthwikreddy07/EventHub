// File: backend/server.js

// --- 1. IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const path = require('path'); 
const helmet = require('helmet'); 
require('dotenv').config();

const app = express();

// =================================================================
// === GENERAL MIDDLEWARE ===
// =================================================================

// Using the default helmet setup for general security headers
app.use(helmet()); 
app.use(express.json());
app.use(cors());

// =================================================================
// === DATABASE CONNECTION ===
// =================================================================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// =================================================================
// === API ROUTES ===
// This server now only handles requests that start with /api
// =================================================================
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/events', require('./routes/event.routes'));
app.use('/api/bookings', require('./routes/booking.routes'));
app.use('/api/analytics', require('./routes/analytics.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/payments', require('./routes/payment.routes'));

// =================================================================
// === START SERVER ===
// =================================================================
const PORT = process.env.PORT || 10000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));