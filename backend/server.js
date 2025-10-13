// File: backend/server.js

// --- 1. IMPORTS (Declared only ONCE at the top) ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// --- 2. INITIALIZE APP (Declared only ONCE) ---
const app = express();

// --- 3. MIDDLEWARE ---

// Configure CORS to trust your live frontend URL
const corsOptions = {
  origin: 'https://eventhub-q7g2.onrender.com' // Your specific Render URL
};
app.use(cors(corsOptions));

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

// --- 6. SERVE THE ANGULAR FRONTEND ---
// This tells Express where to find the built Angular files
app.use(express.static(path.join(__dirname, '../eventhub-ui/dist/eventhub-ui/browser')));

// The "Catch-All" Route: For any request that doesn't match an API route,
// send back the main index.html file from the Angular app.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../eventhub-ui/dist/eventhub-ui/browser', 'index.html'));
});

// --- 7. START THE SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));