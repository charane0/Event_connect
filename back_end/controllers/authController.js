const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Vendor = require('../models/Vendor');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'your_secret_key',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, phone, businessName, businessType } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      role,
      phone,
    });

    await user.save();

    // If vendor, create vendor profile
    let vendorData = null;
    if (role === 'vendor' && businessName && businessType) {
      const vendor = new Vendor({
        userId: user._id,
        userEmail: email, // Store email in vendor record
        businessName,
        businessType,
        approvalStatus: 'pending',
      });
      await vendor.save();
      vendorData = vendor;
    }

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...(vendorData && { vendor: vendorData }),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    // If vendor, fetch vendor data
    let vendorData = null;
    if (user.role === 'vendor') {
      vendorData = await Vendor.findOne({ userId: user._id }).select('_id verificationStep isVerificationComplete approvalStatus');
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...(vendorData && { vendor: vendorData }),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, address, city, state, zipCode, profileImage } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, address, city, state, zipCode, profileImage, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
