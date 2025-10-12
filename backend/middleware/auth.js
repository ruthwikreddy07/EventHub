// File: backend/middleware/auth.js

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token') || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // This is the corrected logic. It attaches BOTH the userId and the role.
    req.userId = decoded.userId; 
    req.role = decoded.role; // <-- THIS IS THE CRITICAL FIX

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};