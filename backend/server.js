// File: backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// =================================================================
// === STATIC FILE SERVING (ANGULAR FRONTEND) ===
// =================================================================
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../eventhub-ui/dist/eventhub-ui/browser');
  app.use(express.static(frontendPath));
}

// =================================================================
// === SECURITY & MIDDLEWARE ===
// =================================================================

// ✅ Fix CSP to allow Base64 (data:) & blob: images, scripts, and styles
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "blob:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https:"],
        connectSrc: ["'self'", "https://eventhubapi-vpsu.onrender.com"],
        fontSrc: ["'self'", "https:", "data:"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

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
// =================================================================
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/events', require('./routes/event.routes'));
app.use('/api/bookings', require('./routes/booking.routes'));
app.use('/api/analytics', require('./routes/analytics.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/payments', require('./routes/payment.routes'));

// =================================================================
// === ANGULAR FRONTEND FALLBACK (Fixes 404) ===
// =================================================================
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../eventhub-ui/dist/eventhub-ui/browser');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendPath, 'index.html'));
  });
}

// =================================================================
// === START SERVER ===
// =================================================================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
