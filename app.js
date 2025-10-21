// File: backend/middleware/admin.js

module.exports = function (req, res, next) {
  // This now correctly checks the 'role' property attached by the auth middleware
  if (req.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};