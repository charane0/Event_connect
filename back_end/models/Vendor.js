const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userEmail: {
    type: String,
  },

  // ===== STEP 1: BUSINESS INFORMATION =====
  businessName: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
  },
  category: {
    type: String,
    enum: [
      'Catering',
      'Decoration',
      'Photography',
      'Videography',
      'Venues',
      'DJ & Music',
      'Makeup & Beauty',
      'Wedding Planning',
      'Transportation',
      'Entertainment',
    ],
  },
  yearsExperience: {
    type: Number,
  },
  description: {
    type: String,
  },

  // ===== STEP 2: CONTACT INFORMATION =====
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  },

  // ===== STEP 3: LEGAL DOCUMENTS =====
  gstin: {
    type: String,
  },
  businessLicense: {
    type: String, // Base64 encoded
  },

  // ===== STEP 4: PORTFOLIO & SERVICES =====
  portfolioImages: [String], // Array of base64 encoded images
  servicesOffered: [String], // Array of service names

  // ===== STEP 5: TERMS & CONDITIONS =====
  termsAccepted: {
    type: Boolean,
    default: false,
  },

  // ===== LEGACY FIELDS (kept for compatibility) =====
  businessType: {
    type: String,
  },
  businessDescription: {
    type: String,
  },
  businessAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  businessPhone: String,
  businessEmail: String,
  website: String,
  ownerPhone: String,
  ownerIdPhoto: String,
  ownerIdType: String,
  ownerIdNumber: String,
  businessLicenseNumber: String,
  registrationCertificate: String,
  taxIdNumber: String,
  businessRegistrationNumber: String,
  services: [{
    serviceName: String,
    description: String,
    basePrice: Number,
    currency: String,
  }],
  bankAccount: {
    accountHolderName: String,
    accountNumber: String,
    routingNumber: String,
    bankName: String,
    accountType: String,
  },
  profileImage: String,
  coverImage: String,

  // ===== VERIFICATION STATUS =====
  verificationStep: {
    type: Number,
    default: 0, // 0-5, 0 = not started, 5 = completed
  },
  isVerificationComplete: {
    type: Boolean,
    default: false,
  },
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  approvalReason: String,
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  approvedAt: Date,
  rejectionReason: String,

  // ===== PERFORMANCE METRICS =====
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  totalEarnings: {
    type: Number,
    default: 0,
  },
  completedBookings: {
    type: Number,
    default: 0,
  },
  responseTime: {
    type: Number, // in hours
    default: 24,
  },
  availability: {
    type: String,
    enum: ['available', 'busy', 'unavailable'],
    default: 'available',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Vendor', vendorSchema);
