// File: backend/server.js

// --- 1. IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const path = require('path'); 
const helmet = require('helmet'); 
require('dotenv').config();

// --- 2. INITIALIZE APP ---
const app = express();

// =================================================================
// === CRITICAL FIX: STATIC FILE SERVING MUST BE FIRST IN PRODUCTION ===
// =================================================================

// --- 3. SERVE ANGULAR FRONTEND STATIC FILES (Production Only) ---
if (process.env.NODE_ENV === 'production') {
    // 3A. CRITICAL PATH: Where the built Angular files live
    const frontendPath = path.join(__dirname, '../eventhub-ui/dist/eventhub-ui/browser');
    
    // Serve static files (this handles the root files like index.html, JS, CSS)
    app.use(express.static(frontendPath));

    // 3B. Fix for the 404: The catch-all route must be defined after express.static() 
    // but before any other middleware or API routes.
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(frontendPath, 'index.html'));
    });
}
// -----------------------------------------------------------------

// --- 4. GENERAL MIDDLEWARE ---
// Now that static files are served, we can apply security and JSON parsing.

// Using the simple helmet setup (less restrictive security headers)
app.use(helmet()); 
app.use(express.json());
app.use(cors()); 

// --- 5. CONNECT TO MONGODB DATABASE ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// --- 6. DEFINE ALL API ROUTES ---
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/events', require('./routes/event.routes'));
app.use('/api/bookings', require('./routes/booking.routes'));
app.use('/api/analytics', require('./routes/analytics.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/payments', require('./routes/payment.routes'));


// --- 7. FALLBACK CATCH-ALL ROUTE (For Angular's deep links like /login) ---
if (process.env.NODE_ENV === 'production') {
    // This catches routes like /login that weren't matched by the API routes above.
    app.get('*', (req, res) => {
        const frontendPath = path.join(__dirname, '../eventhub-ui/dist/eventhub-ui/browser');
        res.sendFile(path.resolve(frontendPath, 'index.html'));
    });
}


// --- 8. START THE SERVER ---
const PORT = process.env.PORT || 10000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));