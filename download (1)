const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  const token = req.headers['x-admin-token'] || req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorised — no token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gg-secret-change-me');
    req.admin = decoded;
    next();
  } catch (e) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
