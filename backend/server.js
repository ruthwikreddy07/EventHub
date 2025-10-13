const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
// File: backend/server.js

const cors = require('cors');
// ... other require statements

const app = express();

// --- THIS IS THE CRITICAL FIX ---
// Define the allowed origin (your frontend URL)
const corsOptions = {
  origin: 'https://eventhub-q7g2.onrender.com' // <-- REPLACE THIS
};

// Use the cors middleware with the specified options
app.use(cors(corsOptions));

// ... rest of your server.js file (app.use(express.json()), routes, etc.)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Example route
app.get('/', (req, res) => {
  res.send('EventHub API is running');
});

// ...existing code...
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);
// ...existing code...
// ...existing code...
const eventRoutes = require('./routes/event.routes');
app.use('/api/events', eventRoutes);
// ...existing code...
const bookingRoutes = require('./routes/booking.routes');
app.use('/api/bookings', bookingRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// In backend/server.js
app.use('/api/analytics', require('./routes/analytics.routes'));
// In backend/server.js, add this with your other routes
app.use('/api/users', require('./routes/user.routes'));
// In backend/server.js
app.use('/api/payments', require('./routes/payment.routes'));