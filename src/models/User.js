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
    required: true,
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

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model overwrite issue in dev with hot reload
export default mongoose.models.User || mongoose.model('User', UserSchema);
