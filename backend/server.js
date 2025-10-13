// File: backend/server.js

// --- 1. IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const path = require('path'); // <--- Ensure this is here
require('dotenv').config();

// --- 2. INITIALIZE APP ---
const app = express();

// --- 3. MIDDLEWARE ---
// **NEW:** Configure Helmet to explicitly allow data URLs for images
app.use(helmet.contentSecurityPolicy({
    directives: {
        // Allow the default sources needed for a modern app (scripts, styles, etc.)
        defaultSrc: ["'self'"], 
        // Allow data: scheme for images (Base64) to fix the image loading error
        imgSrc: ["'self'", 'data:'], 
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Adjust as needed
        styleSrc: ["'self'", "'unsafe-inline'"] // Adjust as needed
    },
}));

app.use(express.json());
app.use(cors());

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

// =================================================================
// === THE CRITICAL DEPLOYMENT FIX IS BELOW THIS LINE ================
// =================================================================

// --- 6. SERVE ANGULAR FRONTEND STATIC FILES (Production Only) ---
// This is required to serve the built HTML, CSS, and JS files.
if (process.env.NODE_ENV === 'production') {
    // CRITICAL PATH: This tells Express where to find the static Angular files.
    const frontendPath = path.join(__dirname, '../eventhub-ui/dist/eventhub-ui/browser');
    
    // Serve static files from the Angular build output folder
    app.use(express.static(frontendPath));

    // --- 7. CATCH-ALL ROUTE (For Angular Routing) ---
    // This handles the root path ('/') and all other non-API requests, 
    // ensuring Angular's router handles the URL (e.g., /login, /events).
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(frontendPath, 'index.html'));
    });
}


// --- 8. START THE SERVER ---
// Using Render's required port (10000) for the live environment
const PORT = process.env.PORT || 10000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Note: I've updated the default PORT to 10000 for Render compatibility.