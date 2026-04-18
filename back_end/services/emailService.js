const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password',
  },
});

// Send vendor verification email
const sendVendorVerificationEmail = async (vendorEmail, vendorName, vendorId) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@eventconnect.com',
    to: vendorEmail,
    subject: 'Event Connect - Vendor Registration Submitted',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Event Connect, ${vendorName}!</h2>
        <p>Thank you for submitting your vendor registration details.</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <h3>What's Next?</h3>
          <p>✓ Your registration has been received and is under review</p>
          <p>✓ An admin will verify your documents and details</p>
          <p>✓ You'll receive an email once your account is approved</p>
          <p style="margin-top: 20px; color: #666;">This process usually takes 24-48 hours.</p>
        </div>
        <p style="margin-top: 30px; color: #999; font-size: 12px;">
          If you have any questions, please contact our support team.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Vendor verification email sent to', vendorEmail);
  } catch (error) {
    console.error('❌ Error sending vendor email:', error);
  }
};

// Send vendor approval email
const sendVendorApprovalEmail = async (vendorEmail, vendorName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@eventconnect.com',
    to: vendorEmail,
    subject: '🎉 Congratulations! Your Vendor Account is Approved',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4CAF50;">🎉 Account Approved!</h2>
        <p>Hi ${vendorName},</p>
        <p>Great news! Your vendor account has been reviewed and <strong>approved</strong>.</p>
        <div style="background-color: #e8f5e9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #2e7d32;">You can now:</h3>
          <ul>
            <li>Log in to your vendor dashboard</li>
            <li>Manage your services and pricing</li>
            <li>View and respond to booking requests</li>
            <li>Track your earnings and performance</li>
          </ul>
        </div>
        <p><strong>Login here:</strong> <a href="http://localhost:3003">Event Connect Portal</a></p>
        <p style="margin-top: 20px; color: #666;">Welcome to the Event Connect family! 🚀</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Vendor approval email sent to', vendorEmail);
  } catch (error) {
    console.error('❌ Error sending approval email:', error);
  }
};

// Send vendor rejection email
const sendVendorRejectionEmail = async (vendorEmail, vendorName, rejectionReason) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@eventconnect.com',
    to: vendorEmail,
    subject: 'Event Connect - Vendor Registration Status',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d32f2f;">Application Status Update</h2>
        <p>Hi ${vendorName},</p>
        <p>Thank you for your interest in joining Event Connect as a vendor.</p>
        <div style="background-color: #ffebee; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #c62828;">Application Status: Not Approved</h3>
          <p><strong>Reason:</strong> ${rejectionReason || 'Your documents or information did not meet our requirements.'}</p>
        </div>
        <p>You can reapply with updated information once you've addressed the concerns.</p>
        <p style="margin-top: 20px; color: #666;">For more information, please contact our support team.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Vendor rejection email sent to', vendorEmail);
  } catch (error) {
    console.error('❌ Error sending rejection email:', error);
  }
};

// Send admin notification email
const sendAdminNotificationEmail = async (adminEmail, vendorName, vendorId) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@eventconnect.com',
    to: adminEmail,
    subject: '📋 New Vendor Registration Pending Review',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1976d2;">New Vendor Registration</h2>
        <p>A new vendor has submitted their registration and is pending your review.</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Vendor Name:</strong> ${vendorName}</p>
          <p><strong>Vendor ID:</strong> ${vendorId}</p>
          <p><strong>Action Required:</strong> Review documents and approve/reject</p>
        </div>
        <p style="margin-top: 20px;">
          <a href="http://localhost:3003/admin" style="background-color: #1976d2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Review in Admin Dashboard
          </a>
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification email sent to', adminEmail);
  } catch (error) {
    console.error('❌ Error sending admin notification:', error);
  }
};

module.exports = {
  sendVendorVerificationEmail,
  sendVendorApprovalEmail,
  sendVendorRejectionEmail,
  sendAdminNotificationEmail,
};
