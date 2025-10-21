// File: backend/middleware/admin.js

module.exports = function (req, res, next) {
  // THIS IS THE CRITICAL FIX:
  // Check req.user.role, which is where the auth middleware places the user's role.
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};