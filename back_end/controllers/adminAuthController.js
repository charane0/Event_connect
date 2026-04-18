const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Admin signup (create first admin)
exports.adminSignup = async (req, res) => {
  try {
    const { name, email, password, isSuperAdmin } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin with this email already exists',
      });
    }

    // Create admin
    const admin = new Admin({
      name,
      email: email.toLowerCase(),
      password,
      isSuperAdmin: isSuperAdmin || false,
    });

    await admin.save();

    // Generate token
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET || 'dev_secret_key_change_in_production',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Admin account created successfully',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        isSuperAdmin: admin.isSuperAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating admin account',
      error: error.message,
    });
  }
};

// Admin login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Verify password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET || 'dev_secret_key_change_in_production',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        isSuperAdmin: admin.isSuperAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message,
    });
  }
};

// Get admin profile
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admin profile',
      error: error.message,
    });
  }
};
