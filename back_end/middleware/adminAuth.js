const jwt = require('jsonwebtoken');

// Middleware to authenticate admin token
const authenticateAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided. Please login first.',
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'dev_secret_key_change_in_production'
    );
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};

// Middleware to authorize based on admin role
const authorizeAdminRole = (...roles) => {
  return (req, res, next) => {
    // This would need to be enhanced to check actual role in database
    // For now, we'll assume any authenticated admin is authorized
    next();
  };
};

module.exports = {
  authenticateAdminToken,
  authorizeAdminRole,
};
