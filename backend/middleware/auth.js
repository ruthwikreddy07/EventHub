// File: backend/middleware/auth.js

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header (supports both 'x-auth-token' and 'Bearer' token)
  const token = req.header('x-auth-token') || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // THIS IS THE CRITICAL FIX:
    // We create a 'req.user' object and attach the decoded payload to it.
    // Now, 'req.user.id' will exist, which is what your booking.routes.js file expects.
    req.user = decoded; 
    
    // In your JWT payload, the ID is named 'userId', so we'll also ensure req.user.id is set correctly.
    if (decoded.userId) {
        req.user.id = decoded.userId;
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};