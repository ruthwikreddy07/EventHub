// File: backend/server.js

// --- 1. IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const path = require('path'); 
const helmet = require('helmet'); 
require('dotenv').config({ path: path.join(__dirname, '.env') });

// --- 2. ENVIRONMENT VALIDATION ---
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'STRIPE_SECRET_KEY'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('\x1b[31m%s\x1b[0m', '==================================================');
  console.error('\x1b[31m%s\x1b[0m', '🚨 CRITICAL FAILURE: MISSING REQUIRED CONFIGURATION');
  console.error('\x1b[31m%s\x1b[0m', '==================================================');
  console.error('The server cannot start because the following environment variables are missing:');
  missingEnvVars.forEach(varName => {
    console.error(`  - ${varName}`);
  });
  console.error('\n👉 Please create a \x1b[36mbackend/.env\x1b[0m file (you can copy backend/.env.example as a template) and define them.');
  console.error('\x1b[31m%s\x1b[0m', '==================================================');
  process.exit(1);
}

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