// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: function() {
      return this.provider !== 'google'; // Only required for non-Google users
    },
    select: false, // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  // OAuth fields
  provider: {
    type: String,
    enum: ['credentials', 'google'],
    default: 'credentials',
  },
  googleId: {
    type: String,
    sparse: true, // Allow multiple null values
  },
  image: {
    type: String,
  },
  // Profile fields
  phone: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  // Preferences
  preferences: {
    newsletter: {
      type: Boolean,
      default: false,
    },
    notifications: {
      type: Boolean,
      default: true,
    },
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  // Password reset
  passwordResetToken: {
    type: String,
  },
  passwordResetExpiry: {
    type: Date,
  },
}, {
  timestamps: true, // Automatically handle createdAt and updatedAt
});


// Pre-save middleware to hash password
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  if (this.password) {
    const bcrypt = require('bcryptjs');
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  const bcrypt = require('bcryptjs');
  return await bcrypt.compare(candidatePassword, this.password);
};

// Prevent model overwrite issue in dev with hot reload
export default mongoose.models.User || mongoose.model('User', UserSchema);